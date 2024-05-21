import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, Image, TouchableOpacity, Alert, Button, StyleSheet,ActivityIndicator } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { FaImages } from "react-icons/fa";
import { CgEnter } from 'react-icons/cg';
import ImagePicker from 'react-native-image-crop-picker';
// navigation

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

// type HomePageProps = NativeStackScreenProps<RootStackParamList, 'HomePage'>
// let {height, width} = Dimensions.get('window');
export default function App({ navigation }) {
    useEffect(() => {
        const quickGuideStep3 = () => {
            Alert.alert('Quick Guide (Step-2)', 'Wait for a process to finish. You will get your concentration on your Screen, If there is any issue with the image it will notify you.', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Ask me later pressed'),

                },
                { text: 'Next' },
            ]);
        }
        const quickGuideStep2 = () => {
            Alert.alert('Quick Guide (Step-1)', 'You will see Camera button on Home Screen, Click it to choose your image', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Ask me later pressed'),

                },
                { text: 'Next', onPress: () => quickGuideStep3() },
            ]);
        }
        const quickGuideStep1 = () => {
            Alert.alert('Quick Guide', 'This is Quick Guide on How to use App.', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Ask me later pressed'),
                },
                { text: 'Next', onPress: () => { quickGuideStep2() } },
            ]);
        }
        quickGuideStep1();
    }, [])
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [concentration, setConcentration] = useState(null);
    // const [ip, setIp] = useState("0.0.0.0")
    const [ip, setIp] = useState("172.25.238.138")
    const [bool, setBool] = useState(false)
    // const {userName} = route.params
    // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    // const apiUrl = "http://127.0.0.1:8000/app/get-concentration";
    let apiUrl = `http://${ip}:8000/app/get-concentration`;

    const apiCall = async (imageInfo) => {
        try {
            console.log("imageInfo", imageInfo)
            setLoading(true);
            console.log(apiUrl);
            const formData = new FormData();
            formData.append('image', {
                uri: imageInfo["path"],
                name: imageInfo["path"], // Assuming the image has a filename property
                type: imageInfo['mime'], // Assuming the image has a type property
            });

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);

            // Set concentration only if the response data is valid
            if (response.data) {
                console.log(response.data)
                setConcentration(response.data);
            } else {
                console.error('Invalid response data:', response.data);
                Alert.alert('Error', 'Invalid response data. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while fetching concentration. Please try again.');
        } finally {
            setLoading(false); // Set loading to false after the API call finishes
        }
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image selection');
            } else if (response.error) {
                console.error('ImagePicker error:', response.error);
                Alert.alert('Error', 'An error occurred while selecting image.');
            } else {
                setSelectedImage(response.assets[0].uri);
                console.log(response.assets[0])
                // apiCall(response.assets[0]);
            }
        });
    };
    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                setFilePath(response);
                setFileData(response.data);
                setFileUri(response.uri);
            }
        });

    }
    const choosePhotoFromCamera = () => {
        console.warn("Take photo")
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            const image_path = image["path"]
            console.log("image_path", image_path)
            setSelectedImage(image_path)
            apiCall(image);
        });
    }
    const choosePhotoFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            const image_path = image["path"]
            console.log("image_path", image_path)
            setSelectedImage(image_path)
            apiCall(image);
        });
    }
    const handleIP = () => {
        setBool(!bool);

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#51D1C6", }}>
            <View style={{ height: '40%', width: '100%' }}>
                {selectedImage ? (
                    <>
                        <View
                            style={{
                                width: '60%',
                                height: '90%',
                                marginLeft: '20%',
                                backgroundColor: 'skyblue',
                                marginTop: 25,
                            }}
                        >
                            <Image style={{ height: '100%', width: '100%' }} source={{ uri: selectedImage }} />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={{ paddingTop: 25, flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 25, color: "white" }}>No image selected</Text>
                        </View>
                    </>
                )}
            </View>
            <TouchableOpacity
                onPress={choosePhotoFromCamera}
                style={{
                    marginTop: 20,
                    height: 50,
                    width: '60%',
                    backgroundColor: '#0962EA',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}
            >
                <Text style={{ fontSize: 20, color: "white" }}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={choosePhotoFromGallery}
                // onPress={pickImage}
                style={{
                    marginTop: 20,
                    height: 50,
                    width: '60%',
                    backgroundColor: '#0962EA',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}
            >
                <Text style={{ fontSize: 20, color: "white" }}>Gallery</Text>

            </TouchableOpacity>

            {bool ? (
                <TextInput
                    style={{ height: 45, width: 200, fontSize: 20, marginTop: 25, textAlign: 'center', color: "white",alignSelf: 'center' }}
                    placeholder="Type IP address"
                    onChangeText={newip => { setIp(newip); console.log(newip) }}
                    defaultValue={ip}
                    selectionColor={'black'}
                />
            ) : (
                <Text
                    style={{ height: 45, fontSize: 20, marginTop: 25, textAlign: 'center', color: "white" }}
                />)
            }

            {loading ? (
                <View style={{ display: "flex", justifyContent: "center", alignSelf: 'center' }}>
                    {/* <Text style={{ textAlign: "center" }}>Loading...</Text> */}
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : concentration ? (
                <>
                    {concentration.Status != "Error" ? (
                        <>
                            <View
                                style={{
                                    borderWidth: 2,
                                    borderColor: "black",
                                    borderRadius: 10,
                                    width: "80%",
                                    alignSelf: 'center'
                                }}>
                                <Text style={{ textAlign: "center", fontSize: 30, color: "green", marginBottom: 10 }}>Concentration: {concentration.Concentation.toFixed(2)}</Text>
                            </View>
                            <Text>
                                {/* Status: {concentration.Status} */}
                            </Text>
                            {console.log(typeof concentration.Concentation)}
                        </>
                    )
                        :
                        <>
                            <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>Oops! Something went wrong</Text>
                        </>
                    }
                </>
            ) : null}

            <View style={styles.fixToText}>
                <Button
                    color="skyblue"
                    title="custom IP"
                    onPress={handleIP}
                    
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'row',
        // justifyContent: 'space-between',

    },
    customIP: {
        backgroundColor: "red"
    }
})