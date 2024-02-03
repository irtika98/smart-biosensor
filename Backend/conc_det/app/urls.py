from django.urls import path
from roboflow import Roboflow
from app.views import getConcentration


urlpatterns = [
    path("get-concentration", getConcentration)
]