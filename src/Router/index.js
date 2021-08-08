import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from '../Screen/HomeScreen'
import LoginScreen from '../Screen/LoginScreen'
import RegisterScreen from '../Screen/RegisterScreen'
import FormUser from '../Screen/FormUser'
import ProfileScreen from '../Screen/ProfileScreen'
import firebase from '@react-native-firebase/app';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProvinsiScreen from '../Screen/ProvinsiScreen'

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const userLogin = firebase.auth().currentUser;

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userLogin ?
                    <>
                        <Stack.Screen options={{ headerShown: false }} name="Main App" component={MainApp} />
                        <Stack.Screen name="Provinsi Screen" component={ProvinsiScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="Home Screen" component={HomeScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="Complete Your Profile" component={FormUser} />
                        <Stack.Screen options={{ headerShown: false }} name="Login Screen" component={LoginScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
                    </>
                    :
                    <>

                        <Stack.Screen options={{ headerShown: false }} name="Login Screen" component={LoginScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Provinsi Screen" component={ProvinsiScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="Complete Your Profile" component={FormUser} />
                        <Stack.Screen options={{ headerShown: false }} name="Main App" component={MainApp} />
                        <Stack.Screen options={{ headerShown: false }} name="Home Screen" component={HomeScreen} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainApp = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        barStyle={{ backgroundColor: 'tomato' }}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
)

// const MyDrawwer = () => (
//     <Drawwer.Navigator>
//         <Drawwer.Screen name="App" component={MainApp}/>
//         <Drawwer.Screen name="About Screen" component={AboutScreen}/>
//     </Drawwer.Navigator>
// )

const styles = StyleSheet.create({})
