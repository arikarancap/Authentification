import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React from 'react'
import { COLORS } from '../const'
import { ScrollView } from 'react-native-gesture-handler'
import { Input, Button, Loader } from '../components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegistrationScreen = () => {
    const navigation = useNavigation();
    const [input, setInput] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
    })
    const [errors, setError] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const validate = () => {
        console.log("Enter to validate...")
        // console.log(input.email)
        let isValid = true;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        Keyboard.dismiss();
        if (!input.email) {
            handleError("please enter a valid email", 'email')
            isValid = false;
        }
        // console.log(input.email.match(/\S+@\S+\.\S+/))
        else if (!input.email.match(reg)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }
        if (!input.fullname) {
            handleError('please enter a full name', 'fullname');
            isValid = false;

        }
        if (!input.phone) {
            handleError('please enter a phone number', 'phone');
            isValid = false;

        }
        if (!input.password) {
            handleError('please enter a password', 'password');
            isValid = false;
        } else if (input.password.length < 5) {
            handleError('Mininimum Password must be at least 5 characters', 'password');
            isValid = false;

        }
        if (isValid) {
            console.log('isValid: ', isValid);
            register();
        }
    }

    const register = async () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            console.log(input);

            try {
                await AsyncStorage.setItem('userData', JSON.stringify(input));
                navigation.navigate('LoginScreen')
            }
            catch (error) {
                Alert.alert('Error', 'Something Went Wrong...')
            }

        }, 1000)
    };
    const handleOnChange = (text, input) => {
        setInput(prevState => ({ ...prevState, [input]: text }))
    }
    const handleError = (error, input) => {
        setError((prevState) => ({ ...prevState, [input]: error }))

    }
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }} >
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
                // alignItems: 'center'
            }} >
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }} >
                    Register
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10, textAlign: 'center', fontSize: 16 }}>Enter Your Details to Register</Text>
                <View style={{ marginVertical: 20 }} ></View>
                <Input label="Email" iconName='email-outline'
                    placeHolder="Enter YournEmail Address"
                    onChangeText={text => handleOnChange(text, 'email')}
                    error={errors.email}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                />
                {/* <Text >hello: {input.email}</Text> */}
                <Input label="Full Name" iconName='account-outline'
                    placeHolder="Enter Your fullname"
                    onChangeText={text => handleOnChange(text, 'fullname')}
                    error={errors.fullname}
                    onFocus={() => {
                        handleError(null, 'fullname')
                    }}
                />
                <Input label="Phone Number"
                    iconName='phone-outline'
                    keyBoardType='numeric'
                    placeHolder="Enter Your Phonenumber"
                    onChangeText={text => handleOnChange(text, 'phone')}
                    error={errors.phone}
                    onFocus={() => {
                        handleError(null, 'phone')
                    }}
                />
                <Input label="Password" iconName='lock-outline'
                    placeHolder="Enter Your Password"
                    password
                    onChangeText={text => handleOnChange(text, 'password')}
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}
                />
                <Button
                    title={'Register'}
                    onPress={validate}
                />
                <Text
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={{
                        color: COLORS.black,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>
                    Already have account ?Login
                </Text>
                {/* <TouchableOpacity style={{ backgroundColor: 'red', width: 200, height: 40 }} >
                    <Text>sdnfjkdnsn</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegistrationScreen;

const styles = StyleSheet.create({})