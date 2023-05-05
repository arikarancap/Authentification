import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../const'
const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // activeOpacity={0.7}

      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
      }} >
      <Text style={{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18,
      }} >{title} </Text>
    </TouchableOpacity >
  )
}

export default Button;

const styles = StyleSheet.create({})