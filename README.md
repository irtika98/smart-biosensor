
# hCG concentration prediction using deep learning and computer vision (not updated)


[Model notebook link](https://colab.research.google.com/drive/1f5Pt4IbzCRCrD8QIA5-YvNCn05UAD8s2?usp=sharing)

We are build a prototype aimed at predicting the concentration of analytes from images of test kits. We developed our project for hCG test kits because they are comparatively cheaper and less hazardous to handle. Our dataset comprises images of various test kits with different hCG concentrations, including newly collected data and previously gathered samples from our lab. We performed object detection to identify the distinct regions corresponding to the C and T strips on the kits. We then utilized OpenCV for image processing to calculate the T_strip/C_strip intensity ratio, which is crucial for hCG kits, as it forms a linear relationship when plotted against the concentration of the hCG hormone for concentrations under 50 IU/ml.



# Methodology

## Object detection using Roboflow


We employed Roboflow's object detection to identify the T-strip and C-strip indicators on the pregnancy test kit. Our approach involved annotating both the T and C strips under the same class during training, as the model didn't distinguish them when annotated separately under the `T` and `C` classes. Additionally, we annotated the letter `T` on the test kit under a distinct `T` class.

 To differentiate between the T strip and C strip during inference, we calculated the distances between the bounding boxes of the 'T' letter and the other two bounding boxes predicted by the object detection model. The bounding box that was closer to the 'T' letter became identified as the `T_strip`, while the other one was designated as the `C_strip.` This strategy enabled us to effectively categorize and analyze the different components of the pregnancy test kit.

After sufficient preprocessing of image data, we custom-trained the model using `YOLOV8`. Our object detection model training dataset consisted of `840 training images`, `77 validation images` and `39 test images`.

**metrics**
![metrics](https://i.ibb.co/N7cz4wn/image.png)
![metrics](https://i.ibb.co/YL1Ghkm/results.png)

**test**
![test](https://i.ibb.co/SK5GxDz/image.png)




## Image Processing using OpenCV

### Reading and Predicting:

- The image is read using OpenCV (cv2.imread).
- A pre-trained object detection model is used to predict the positions of elements in the image, specifying confidence and overlap parameters.
- The predictions are printed for inspection.

### Segregating Strips:

- A function distance calculates the Euclidean distance between two predicted points.
- The T and C  strips are determined by comparing their distances from the predicted T_class bounding box. Box at shorter distances is `T_strip`, and the other is `C_strip`.

### Result Evaluation:

- If the number of colour strips detected is less than 2, the result is considered negative; otherwise, it is positive.
- An error is raised if the number of colour or T strips is not as expected.


### ROI Processing:

- The process function extracts the region of interest (ROI) based on the predicted strip's coordinates and dimensions.


- The crop function returns a list containing two ROIs: the first corresponds to the C strip, and the second to the T strip.

- The cropped images of the C and T strips are resized using the resize function. The resized images are negated using cv2.bitwise_not.

- A median blur is applied to the negatively adjusted images (filtered_image_C and filtered_image_T) using cv2.medianBlur with a kernel size of 63 to filter out anomalous pixels.

- The mean intensity of the filtered images is calculated using the m_intensity function, with a threshold value of 50. The thresholding is used as an `Image Segmentation` to eliminate unwanted background.

- A ratio of mean intensities of T and C strips (T/C) is stored and plotted


### Visualizing Results:

Coloured boxes (red for the T letter, green for the C_strip and blue for the T_strip) are added to the image at the detected strip positions.
# Results and Conclusions

The object detection model successfully detects the regions of interest.

**13 IU/ml, Positive result, and all elements successfully detected**
![test kit 13](https://github.com/irtika98/smart-biosensor/assets/73699304/26e46d4f-e040-4e89-8ea3-fe2a39380fb2)

**30 IU/ml, Positive result, and all elements successfully detected**
![test kit 30](https://github.com/irtika98/smart-biosensor/assets/73699304/12fde499-14a0-4c60-b809-492b0f44087b)

**45 IU/ml, Positive result, and all elements successfully detected**
![test kit 45](https://github.com/irtika98/smart-biosensor/assets/73699304/21a8eafa-23f3-43ee-b057-d590c670e9ac)


The image processing of ROI also gives pretty satisfying results. The T_strip/C_strip intensity ratio shows an increasing trend with increasing concentrations, which is a desired outcome. The concentration vs T/C ratio plot plot shows a nearly linear relation.

### **T/C intensity ratio**

![50 iu/ml](https://i.ibb.co/SVGnxH4/image.png)

### **concentration vs T/C intensity ratio plot**

![50 iu/ml](https://i.ibb.co/CB90g60/image.png)

# What next:

The project is ongoing, and our next goal is to build a neural network, train it on the T/C intensity ratio vs concentration data and make it predict the concentration from the T/C intensity ratio(obtained above) of the input image. Deploy the model to an app and make it make real-time predictions.

### Steps to run the backend (For Linux/Mac OS).
- Create a virtual environment to install the necessary Python packages.
- Install `venv` to create a virtual environment using the command:- `pip install virtualenv`
- cd into a directory of your choice to create the virtual environment(Desktop in this example):- `cd ~/Desktop`
- To create a new virtual environment, use the command:- `virtualenv dip --python=python3.10`. Here `dip` is the name of your environment. You can use any name instead.
*NOTE*: The above steps were a one-time process, so you must activate the environment every time you use those packages.
- Activate the environment using the command:- `source dip/bin/activate`. Make sure that you are in the same directory (`~/Desktop`)
We need to install all the Python packages required to run our project.
- Firstly, cd into the target directory using the command:- `cd smart-biosensor/Backend`
- Install the Python packages from the requirements.txt file using the command:- `pip install -r requirements.txt`
After installing all the packages, follow the steps to run the backend.
- cd to the necessary directory using the command:- `cd conc_det`
- run the backend server using the command:- `python manage.py runserver 0.0.0.0:8000`
This activates all the necessary API endpoints to access backend functions.
- To test the backend, open a new terminal window to run the test script.
- Activate the virtual environment using the above-mentioned command (make sure you are in the `~/Desktop` directory)
- cd into the main directory:- `cd ~Desktop/smart-biosensor/Backend`
- To run the Python script, run the command:- `python test-script.py`
