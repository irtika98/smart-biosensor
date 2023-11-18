
# hCG concentration prediction using deep learning and computer vision

Welcome! I am working on a project, our goal is to predict the HCG concentration from images of pregnancy test kits. We've curated a dataset of different pregancy test kit images for  different HCG concentrations, both newly collected data by our group and previously gathered in the lab. We used Roboflow for object detection to identify the distinct regions corresponding to the C and T strips in the kit. Subsequently, We used OpenCV for image processing, to calculate the T_strip/C_strip intensity ratio. This ratio plays a pivotal role in hCG kits, forming a linear relationship when plotted against concentration of hCG hormone.



# Methodology

## Object detection using Roboflow


We employed Roboflow's object detection for identifying the T strip and C strip indicators on the pregnancy test kit. Our approach involved annotating both the T and C strips under the same class during training, as the model didn't distinguish them when annotated separately under `T` and `C` classes. Additionally, we annotated the letter `T` on the test kit under a distinct `T` class.

 To differentiate between the T strip and C strip during inference, we calculated the distances between the bounding boxes of the 'T' letter and the other two bounding boxes predicted by the object detection model. The bounding box that was closer to the 'T' letter became identified as the `T_strip`, while the other one was designated as the `C_strip.` This strategy enabled us to effectively categorize and analyze the different components of the pregnancy test kit.

After sufficient preprocessing image data we custom trained the model using `YOLOV8`. Our dataset for object dection model training consisted of `840 training images`, `77 validation images` and `39 test images`

**metrics**
![metrics](https://i.ibb.co/N7cz4wn/image.png)
![metrics](https://i.ibb.co/YL1Ghkm/results.png)

**test**
![test](https://i.ibb.co/SK5GxDz/image.png)




## Image Processing using OpenCV

### Reading and Predicting:

- The image is read using OpenCV (cv2.imread).
- pre-trained object detection model is used to predict the positions of elements in the image, specifying confidence and overlap parameters.
- The predictions are printed for inspection.

### Segregating Strips:

- A function distance calculates the Euclidean distance between two predicted points.
- The T and C  strips are determined by comparing their distances from the predicted T_class bounding box. Box at shorter distance `T_strip` and other is `C_strip`.


### Result Evaluation:

- If the number of color strips detected is less than 2, the result is considered negative; otherwise, it is positive.
- An error is raised if the number of color strips or T strips is not as expected.


### ROI Processing:

- The process function extracts the region of interest (ROI) based on the predicted strip's coordinates and dimensions.


- The crop function returns a list containing two ROIs: the first corresponds to the C strip, and the second to the T strip.

- The cropped images of the C and T strips are resized using the resize function. The resized images are negated using cv2.bitwise_not.

- A median blur is applied to the negatively adjusted images (filtered_image_C and filtered_image_T) using cv2.medianBlur with a kernel size of 63 to filter out any anomalous pixels.

- The mean intensity of the filtered images is calculated using the m_intensity function, with a threshold value of 50. The thresholding is used as an `Image Segmentation` to eliminate any unwanted background.

- A ratio of mean intensities of T and C strips (T/C) is stored and plotted


### Visualizing Results:

Colored dots (red for T letter, green for C_strip and blue for T_strip) are added to the image at the detected strip positions.
# Results and Conclusions

The object detection model successfully detects the regions of interest.

**28 IU/ml, Postive result and all elements successfully detected**
![28 iu/ml](https://i.ibb.co/JB9nVCK/image.png)


**33 IU/ml, Postive result and all elements successfully detected**
![33 iu/ml](https://i.ibb.co/w6vGTGP/image.png)

**40 IU/ml, Postive result and all elements successfully detected**
![40 iu/ml](https://i.ibb.co/DRW09cJ/image.png)

**45 IU/ml, Postive result and all elements successfully detected**
![45 iu/ml](https://i.ibb.co/ftr9s98/image.png)

**50 IU/ml, Postive result and all elements successfully detected**
![50 iu/ml](https://i.ibb.co/37GBVz1/image.png)


The image processing of ROI also gives pretty satisfying results. The T_strip/C_strip intensity ratio shows an increasing trend with increasing concentrations, which is a desired out come. Plotting the `concentration vs T/C ratio  plot` plot we get a nearly linear relation.

**T/C intensity ratio**
![50 iu/ml](https://i.ibb.co/SVGnxH4/image.png)

**concentration vs T/C intensity ratio plot**
![50 iu/ml](https://i.ibb.co/CB90g60/image.png)

# What next:

The project isongoing and our next goal is to build a neural network, train it on the T/C intensity ratio vs concentration data and make it predict the concentration from T/C intensity ratio(obtained above) of the input image. Deploy the model to an app and make it do realtime predictions.
