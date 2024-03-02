import requests
import json

url = "http://127.0.0.1:8000/app/get-concentration"
files = {'image': open("./test_set/1.png", 'rb')}

resp = requests.post(url, files=files).json()

print(resp)
