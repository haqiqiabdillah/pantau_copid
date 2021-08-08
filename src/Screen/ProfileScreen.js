import React, { useState, useEffect } from 'react'
import { SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen({ navigation }) {
    let profile ={ uri: 'https://i.imgur.com/FV939a8.png'};

    const isLogin = () => {
        if (firebase.auth().currentUser != null) {
            setUserLogin(firebase.auth().currentUser)
        }
    }

    useEffect(() => {
        isLogin()
    }, [])

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch;
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [titleMessage, setTitleMessage] = useState('')
    const [userLogin, setUserLogin] = useState('')

    const Logout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('berhasil logout')
                setShowAlert(true)
                setTitleMessage('Success')
                setErrorMessage('Successfully Log Out')
                console.log(userLogin.displayName)
            }).catch((error) => {
                setTitleMessage('Error')
                setShowAlert(true)
                setErrorMessage(error.message)
                console.log(error)
            });
    }

    const navigateLogout = () => {
        navigation.navigate("Login Screen")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ height: '70%', width: '100%', backgroundColor: '#FFB200', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, margin: 24, color: 'white' }}>Profile Screen</Text>
                </View>
            </View>
            <View style={{
                marginTop: -350,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View>
                    <Image
                        style={styles.logo}
                        source={require('../assets/person.png')}
                    />
                    <Text style={styles.title}>{userLogin.displayName}</Text>
                    <Text style={styles.subTitle}>{userLogin.email}</Text>
                </View>

            </View>

            <TouchableOpacity style={styles.loginButton} onPress={Logout}>
                <Text style={styles.loginButtonText}>Log Out</Text>
                {/* <Button color='red' title="Login" onPress={handleSubmit} disabled={!isValid} /> */}
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={titleMessage}
                message={errorMessage}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Tutup"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => navigateLogout()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logobox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: -100,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: 'white',
        width: 200,
        height: 200
    },
    title: {
        color: 'tomato',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    subTitle: {
        color: 'tomato',
        textAlign: 'center',
        fontSize: 24,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '70%',
        margin: 12,
        borderWidth: 1,
        color: 'black',
        borderRadius: 20,
        paddingLeft: 40
    },
    loginButton: {
        backgroundColor: '#e40b00',
        padding: 10
    },
    loginButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
