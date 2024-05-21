import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
export default function FlatCards() {
    const colors=['red','green','blue']
  return (
    <View >
        <Text style={styles().headingText}>FlatCards</Text>
      <View style={styles().Container}>
        {colors.map((color)=>(
            <View style={styles(color).Card}>
                <Text>{color}</Text>
            </View>
        ))}
      </View>
    </View>
  )
}
const styles = (props?: any)=>StyleSheet.create({
    headingText :{
        fontSize: 30,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    Container:{
        flex: 1,
        flexDirection: 'row',
        padding: 8
    },
    Card:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        width: 100,
        height: 100,
        borderRadius: 15,
        margin: 5,
        backgroundColor: props
    },
})
