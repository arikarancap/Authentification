import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../const';
import { Button } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [userDetails, setUserDetails] = React.useState();
    React.useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    };

    const logout = () => {
        AsyncStorage.setItem(
            'userData',
            JSON.stringify({ ...userDetails, loggedIn: false }),
        );
        navigation.navigate('LoginScreen');
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 40,
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Welcome {userDetails?.fullname}
            </Text>
            <Button title="Logout" onPress={logout} />
        </View>
    )
}

export default HomeScreen;

// const styles = StyleSheet.create({})