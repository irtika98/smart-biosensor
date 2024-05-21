import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../App'
import userImage from "../userImage.png"
import { useRoute } from "@react-navigation/native"
import UserAvatar from 'react-native-user-avatar';
const HomePage = ({ navigation }) => {
  const route = useRoute();
  const name = route.params?.name
  const age = route.params?.age
  return (
    <View style={styles.container}>
      <View style={styles.userProfile}>
        <View style={styles.profilePictureContainer}>
          {/* <Image
            source={userImage}
            style={styles.profilePicture}
          /> */}
          <UserAvatar size={100} name={name} bgColor="lightgray" textColor="black" />
        </View>
        {/* <Text style={[styles.heading, styles.whiteText]}>User Profile</Text> */}
        <View style={styles.profileItem}>
          <Text style={[styles.label, styles.whiteText]}>Name:</Text>
          <Text style={[styles.value, styles.whiteText]}>{name}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={[styles.label, styles.whiteText]}>Age:</Text>
          <Text style={[styles.value, styles.whiteText]}>{age}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Measure HCG"
            onPress={() => navigation.navigate("MeasureHCG")}
          />
          {/* <Button
            title="General Information"
            onPress={() => navigation.navigate("GeneralInfo")}
          /> */}
        </View>
      </View>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#51D1C6",
  },
  userProfile: {
    alignItems: 'center',
    backgroundColor: 'teal',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 300,
  },
  profilePictureContainer: {
    width: 96,
    height: 96,
    borderRadius: 48, // half of width and height to make it circular
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40, // half of width and height to make it circular
  },
  heading: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: 80,
    color: 'white',
    fontSize: 20,
  },
  value: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
    fontSize: 22,

  },
  buttonsContainer: {
    flexDirection: 'col',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
})
