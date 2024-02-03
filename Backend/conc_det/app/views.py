from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.detection_model import extract_ratio, predict_concentration


@api_view(["POST"])
def getConcentration(request):
    try:
        if "image" in request.FILES:

            uploaded_image = request.FILES["image"]

            IMAGE_PATH = "./temp_images/image.jpg"
            with open(IMAGE_PATH, "wb") as f:
                for chunk in uploaded_image.chunks():
                    f.write(chunk)

            ratio, C_strip, T_strip = extract_ratio(IMAGE_PATH)
            concentration = predict_concentration(ratio)

            return Response(
                {
                    "Concentation": concentration,
                    "C Strip": C_strip,
                    "T Strip": T_strip,
                    "Status": "Success",
                }
            )
        else:
            return Response({"Status": "Error", "Error Text": "No Image provided"})

    except Exception as e:
        return Response({"Status": "Error", "Error Text": e})
