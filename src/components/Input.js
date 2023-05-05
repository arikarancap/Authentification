import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../const';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Input = ({ label, iconName, password, onFocus = () => { }, placeHolder, error, keyBoardType, onChangeText, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePasswords, setHidePasswords] = useState(password);
  return (
    <View style={{ marginBottom: 20 }} >
      <Text style={styles.label} >{label}</Text>
      <View style={[styles.inputContainer,
      {
        borderColor: error ?
          COLORS.red
          : isFocused
            ? COLORS.darkBlue
            : COLORS.light,
      }
      ]}>
        <Icon name={iconName} size={22} color={COLORS.darkBlue} style={{ marginRight: 10 }} />
        <TextInput
          onChangeText={onChangeText}
          keyboardType={keyBoardType}
          secureTextEntry={hidePasswords}
          autoCorrect={false}
          placeholder={placeHolder}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ color: COLORS.darkBlue, flex: 1 }}
        />

        {password && <Icon
          onPress={() => setHidePasswords(!hidePasswords)}
          name={hidePasswords ? 'eye-outline' : 'eye-off-outline'} size={22} color={COLORS.darkBlue} style={{ marginLeft: 10 }} />}
      </View>
      <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }} >{error}</Text>
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
  label: {
    marginVertical: 2,
    fontSize: 14,
    color: COLORS.grey
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: "row",
    borderWidth: 0.5,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: '100%'
  }
})