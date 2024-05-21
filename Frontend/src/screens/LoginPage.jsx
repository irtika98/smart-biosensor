import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../App'
import AsyncStorage from "@react-native-async-storage/async-storage"
const App = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bool, setBool] = useState(false)
  useEffect(() => {
    // Check if user details exist in AsyncStorage
    AsyncStorage.getItem("userDetails")
      .then((userDetailsString) => {
        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          setName(userDetails.name);
          setAge(userDetails.age);
          console.log(userDetails)
          navigation.replace('HomePage', userDetails);

        }
        setIsLoading(false);

      })
      .catch((error) => {
        console.error("Error retrieving user details: ", error);
        setIsLoading(false);
      });
  }, []);

  const handleStore = () => {
    const userDetails = {
      name: name,
      age: age
    }
    AsyncStorage.setItem("userDetails", JSON.stringify(userDetails))
      .then(() => {
        // Navigate to the Home Page
        navigation.replace('HomePage', userDetails);
      })
      .catch((error) => {
        console.error("Error storing user details: ", error);
      });


  }

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bool ? (
        <>
          <View style={styles.main}>
            <Text style={styles.hcgText}>Hello {name}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.main}>
            <Text style={styles.hcgText}>HCG Meter</Text>
          </View>
        </>
      )}
      {/* <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View> */}
      <View style={styles.bottomContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="Enter your Name"
          textAlign="center"
          placeholderTextColor="darkgray"
          // selectionColor={'black'}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Enter Your Age"
          textAlign="center"
          keyboardType='numeric'
          placeholderTextColor="darkgray"
          // selectionColor={'green'}
          onChangeText={(text) => setAge(text)}
          onFocus={()=>setBool(true)}
        />
        <Button style={{ width: "10%" }} title="Enter" onPress={handleStore} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#51D1C6",
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#51D1C6",
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hcgText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nameText: {
    fontSize: 18,
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    textAlign: 'center', // Centering the text inside TextInput
    width: '100%', // Take full width
    borderWidth: 1,
    borderColor: '#ddd', // Adjust border color to a lighter shade
    color: "black",
    placeholderTextColor: "red",
    borderRadius: 20, // Adjust the border radius as needed
    fontSize: 20,
  },
});

export default App;
