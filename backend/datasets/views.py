# Create your views here.
import h5py
import numpy as np
import tensorflow as tf
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from tensorflow import keras
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Flatten, Dense, Conv2D, MaxPooling2D


def load_happy():
    train = h5py.File('imgs/train_happy.h5', 'r')
    x_train = train['train_set_x']
    y_train = train['train_set_y']

    test = h5py.File('imgs/test_happy.h5', 'r')
    x_test = test['test_set_x']
    y_test = test['test_set_y']
    return (x_train, y_train), (x_test, y_test)


class SampleData(ListAPIView):

    def list(self, request, *args, **kwargs):
        sample_size = ('sample_size' in self.request.GET and int(self.request.GET['sample_size'])) or 100
        dataset = ('dataset' in self.request.GET and self.request.GET['dataset']) or 'mnist'

        if dataset == 'mnist':
            (x_train, y_train), (_, _) = keras.datasets.mnist.load_data()
            batch_images = [x.flatten() / 255 for x in x_train[:sample_size]]
            batch_images = [x.repeat(4) for x in batch_images]
            image_shape = 28
        elif dataset == 'fashion_mnist':
            (x_train, y_train), (_, _) = keras.datasets.fashion_mnist.load_data()
            batch_images = [x.flatten() / 255 for x in x_train[:sample_size]]
            batch_images = [list(x.repeat(4)) for x in batch_images]
            image_shape = 28
        elif dataset == 'happy':
            (x_train, y_train), (_, _) = load_happy()
            batch_images = [x.flatten() / 255 for x in list(x_train[:sample_size])]
            batch_images = [x.reshape(64, 64, 3) for x in batch_images]
            batch_images = [np.insert(x, 3, 1, axis=-1) for x in batch_images]
            batch_images = [list(x.flatten()) for x in batch_images]
            image_shape = 64
        else:
            raise Exception()

        batch_labels = [x for x in list(y_train[:sample_size])]
        return Response({'batch_images': batch_images, 'batch_labels': batch_labels, 'image_shape': image_shape})


class TrainDeep(ListAPIView):

    def list(self, request, *args, **kwargs):

        epochs = ('epochs' in self.request.GET and int(self.request.GET['epochs'])) or 5
        layers = ('num_hidden_layers' in self.request.GET and int(self.request.GET['layers'])) or 1
        dataset = ('dataset' in self.request.GET and self.request.GET['dataset']) or 'mnist'

        if dataset == 'mnist':
            (x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
            shape = 28
        elif dataset == 'fashion_mnist':
            (x_train, y_train), (x_test, y_test) = keras.datasets.fashion_mnist.load_data()
            shape = 28
        elif dataset == 'happy':
            (x_train, y_train), (x_test, y_test) = load_happy()
            x_train = np.dot(x_train[..., :3], [0.299, 0.587, 0.114])
            x_test = np.dot(x_test[..., :3], [0.299, 0.587, 0.114])
            shape = 64
        else:
            raise Exception

        x_train = x_train / 255
        x_test = x_test / 255

        model = keras.Sequential()
        model.add(keras.layers.Flatten(input_shape=(shape, shape)))
        for i in range(layers):
            model.add(keras.layers.Dense(128, activation=tf.nn.relu))
        model.add(keras.layers.Dense(10, activation=tf.nn.softmax))

        model.compile(optimizer=tf.train.AdamOptimizer(),
                      loss='sparse_categorical_crossentropy',
                      metrics=['accuracy'])
        history = model.fit(x_train, y_train, epochs=epochs)
        test_loss, test_acc = model.evaluate(x_test, y_test)
        return Response({
            'params': history.params,
            'history': history.history,
            'test': {'test_loss': test_loss, 'test_acc': test_acc}
        })


@api_view()
def train_conv(request):
    (x_train, y_train), (x_test, y_test) = load_happy()
    x_train = list(x_train)
    y_train = list(y_train)
    x_test = list(x_test)
    y_test = list(y_test)
    model = Sequential()
    # TODO: Why doesn't this work?
    model.add(keras.layers.ZeroPadding2D((3, 3)))
    model.add(Conv2D(32, kernel_size=(7, 7), strides=(1, 1),
                     activation='relu',
                     input_shape=(64, 64, 3)))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Conv2D(64, (11, 11), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Flatten())
    model.add(Dense(1000, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(loss=keras.losses.binary_crossentropy,
                  optimizer=keras.optimizers.SGD(lr=0.01),
                  metrics=['accuracy'])
    history = model.fit(x_train, y_train,
                        batch_size=5,
                        epochs=2,
                        verbose=1,
                        shuffle='batch',
                        validation_data=(x_test, y_test))

    test_loss, test_acc = model.evaluate(x_test, y_test)

    return Response({
        'params': history.params,
        'history': history.history,
        'test': {'test_loss': test_loss, 'test_acc': test_acc}
    })
