from django.urls import path

from datasets.views import SampleData, TrainDeep, train_conv

urlpatterns = [
    path('sample_data/', SampleData.as_view()),
    path('train_deep/', TrainDeep.as_view()),
    path('train_conv/', train_conv)
]