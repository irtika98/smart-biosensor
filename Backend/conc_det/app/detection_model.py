import math
import cv2
import numpy as np
import app.constants
from app.robo_model import MODEL


def distance(predT, predStrip):
    xT = predT["x"]
    yT = predT["y"]

    xStrip = predStrip["x"]
    yStrip = predStrip["y"]

    return math.sqrt((xT - xStrip) ** 2 + (yT - yStrip) ** 2)


def process(pred, gray_image):
    roi_x = int(pred["x"] - pred["width"] / 2)
    roi_y = int(pred["y"] - pred["height"] / 2)
    roi_width = int(pred["width"])
    roi_height = int(pred["height"])
    roi = gray_image[roi_y : roi_y + roi_height, roi_x : roi_x + roi_width]

    return roi


def crop(path):
    image = cv2.imread(path)
    prediction = MODEL.predict(path, confidence=10, overlap=30).json()
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    T = []
    color_strips = []
    C_strip = {}
    T_strip = {}

    # segregate T and C color strips
    for pred in prediction["predictions"]:
        if pred["class"] == "T":
            T.append(pred)
        else:
            color_strips.append(pred)

    # If the number of strips detected is not 2 or number of T labels are not 1, the model didn't work properly
    if len(color_strips) != 2 or len(T) != 1:
        print(len(color_strips), len(T))
        raise Exception("An error occured, model did not work correctly")

    # Check the distance with character T
    if distance(T[0], color_strips[0]) < distance(T[0], color_strips[1]):
        T_strip = color_strips[0]
        C_strip = color_strips[1]
    else:
        T_strip = color_strips[1]
        C_strip = color_strips[0]

    # Extract the mid point pixel intensity
    neg_image = cv2.bitwise_not(gray_image)

    m_x = (T_strip["x"] + C_strip["x"]) / 2
    m_y = (T_strip["y"] + C_strip["y"]) / 2
    ref_intensity = neg_image[int(m_y)][int(m_x)]

    result = [process(C_strip, gray_image), process(T_strip, gray_image)]
    return (
        {
            "resultant_tensors": result,  # first one is C_strip, second is T_strip
            "ref_intensity": ref_intensity,
        },
        C_strip,
        T_strip,
    )


def resize(img):
    new_width = app.constants.IMG_WIDTH
    new_height = app.constants.IMG_HEIGHT

    # Resize the image to the new dimensions
    resized_image = cv2.resize(img, (new_width, new_height))
    return resized_image


def m_intensity(img, threshold):

    # Create a mask for pixels above the threshold
    mask = (img > threshold).astype(np.uint8)

    # Calculate the mean intensity for the masked pixels
    mean_intensity = cv2.mean(img, mask=mask)

    # Extract the mean intensity value (since cv2.mean returns a tuple)
    mean_intensity_value = mean_intensity[0]
    return mean_intensity_value


def extract_ratio(path):
    result, C_strip, T_strip = crop(path)
    image_tensors = result["resultant_tensors"]

    resized1 = resize(image_tensors[0])  # C Strip
    resized2 = resize(image_tensors[1])  # T Strip

    negative_image1 = cv2.bitwise_not(resized1)
    negative_image2 = cv2.bitwise_not(resized2)

    mean_intensity1 = (
        m_intensity(negative_image1, app.constants.THRESHOLD) - result["ref_intensity"]
    )
    mean_intensity2 = (
        m_intensity(negative_image2, app.constants.THRESHOLD) - result["ref_intensity"]
    )

    return mean_intensity2 / mean_intensity1, C_strip, T_strip


def predict_concentration(ratio):
    return (ratio - app.constants.C) / app.constants.M
