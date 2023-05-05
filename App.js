import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, LoginScreen, RegistrationScreen } from './src/screen';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loader } from './src/screen'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('RegistrationScreen');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, [initialRouteName]);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      console.log('userData: ', userData)
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
    console.log('RouteName', initialRouteName);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;

