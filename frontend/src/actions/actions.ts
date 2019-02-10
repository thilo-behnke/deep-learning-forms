import { times as _times, constant as _constant } from 'lodash';
import { TrainMode } from '../components/TrainModeSelectContainer';

export enum DatasetEnum {
    MNIST = 'mnist',
    FASHION_MNIST = 'fashion_mnist'
}

export const SET_DATASET = 'SET_DATASET'

export const setDataset = (dataset: DatasetEnum) => ({type: 'SET_DATASET', payload: dataset})

export const SET_TRAIN_MODE = 'SET_TRAIN_MODE'

export const setTrainMode = (trainMode: TrainMode) => ({type: 'SET_TRAIN_MODE', payload: trainMode})

export const LOADING_STARTED = 'LOADING_STARTED'
export const LOADING_SUCCESS = 'LOADING_SUCCESS'

export const loadDataStarted = () => ({type: LOADING_STARTED})
export const loadDataSuccess = (data: any) => ({type: LOADING_SUCCESS, payload: data})

export const loadData = (sampleSize: number) => {
    return async (dispatch: any, getState: any) => {
        const {dataset} = getState()
        dispatch(loadDataStarted())
        await fetch(`http://127.0.0.1:8000/datasets/sample_data/?format=json${sampleSize ? `&sample_size=${sampleSize}` : ''}${dataset ? `&dataset=${dataset}` : ''}`)
            .then(res => res.json())
            .then(({batch_images: images, batch_labels: labels, image_shape: shape}) => {

                const imageData = images
                    .map((x: number[]) => x.map(y => y * 255))
                    .map((x: number[]) => new ImageData(new Uint8ClampedArray(x), shape, shape))

                dispatch(loadDataSuccess({sampleImages: imageData, sampleLabels: labels, shape}))
            })
    }
}

export const TRAINING_STARTED = 'START_TRAINING'
export const TRAINING_SUCCESS = 'TRAINING_SUCCESS'

export const trainingStarted = () => ({type: TRAINING_STARTED})
export const trainingSuccess = (data: {history: number, params: number}) => ({type: TRAINING_SUCCESS, payload: data})

export const startTraining = (trainMode: TrainMode, dataset: DatasetEnum, layers: number, epochs: number) => {
    return async (dispatch: any) => {
        dispatch(trainingStarted())
        await fetch(`http://127.0.0.1:8000/datasets/train_${trainMode}/?format=json&dataset=${dataset}&layers=${layers}&${epochs}=epochs`)
            .then(res => res.json())
            .then(({history, params}) => dispatch(trainingSuccess({history, params})))
    }
}

export const UPDATE_FORM = 'UPDATE_FORM'

export const updateForm = (form: string, value: any) => ({type: UPDATE_FORM, payload: {form, value}})