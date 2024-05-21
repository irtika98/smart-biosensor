import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

// navigation

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
const GeneralInfo = ({ navigation }) => {
  return (
    <View>
      <Text>GeneralInfo</Text>
    </View>
  )
}

export default GeneralInfo

const styles = StyleSheet.create({})