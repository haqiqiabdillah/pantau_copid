import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoginScreen from './src/Screen/LoginScreen'
import firebase from '@react-native-firebase/app';
import Router from './src/Router/index'
import { Provider } from "react-redux";
import { store } from './src/redux/store'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDMgjtGeFfzsgBabCnQT_x2w7MyKv-8oSE",
  authDomain: "pantaucopid.firebaseapp.com",
  projectId: "pantaucopid",
  storageBucket: "pantaucopid.appspot.com",
  messagingSenderId: "134946736951",
  appId: "1:134946736951:web:16e3b4dd08c8269f2ea8b2",
  measurementId: "G-80RTCGPR0H"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

const styles = StyleSheet.create({})
