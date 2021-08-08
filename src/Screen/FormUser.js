import React, { useState, useEffect } from 'react'
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import firebase from '@react-native-firebase/app';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addUser } from '../redux/UserSlice'

export default function FormUser({ route, navigation }) {
    let BackgroundImage ={ uri: 'https://i.imgur.com/ozZ4EW1.png'};
    let icon ={ uri: 'https://i.imgur.com/tMTTEbY.png'};
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch;
    const userLogin = firebase.auth().currentUser;
    // const email = route.params.email
    // const password = route.params.passwordEncrypted

    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [titleMessage, setTitleMessage] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        console.log('user ', userLogin)
        console.log(route.params)
    }, [])

    const submit = () => {
        console.log(phoneNumber)
        userLogin.updateProfile({
            phoneNumber: phoneNumber,
            displayName: displayName,   
        }).then(() => {
            // dispatch(addUser({ email, password, displayName, phoneNumber }));
            navigation.navigate("Main App", {
                screen: 'Home'
            })
        }).catch((error) => {
            setShowAlert(true)
            setErrorMessage(error.message)
        });
    }

    const navigateLogout = () => {
        setShowAlert(false)
    }
    return (
        <ImageBackground
            style={{
                flex: 1, width: "100%", height: "100%", resizeMode: 'contain',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            source={require('../assets/graha.png')}>

            <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 50, color: 'white' }}>Complete Your Profile</Text>
            <Icon
                style={styles.inputIcon}
                name="users"
                size={200}
                color="#fff"
            />

            <View style={{ width: '80%', margin: 10 }}>
                <Text style={styles.textLabel}>Email</Text>
                <View style={styles.inputView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            style={styles.inputIcon}
                            name="envelope"
                            size={17}
                            color="#000"
                            type='font-awesome'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor='grey'
                            editable={false}
                            value={route.params.email}
                        />
                    </View>
                </View>

                <Text style={styles.textLabel}>Full Name</Text>
                <View style={styles.inputView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            style={styles.inputIcon}
                            name="user"
                            size={18}
                            color="#000"
                            type='font-awesome'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Input your fullname'
                            placeholderTextColor='grey'
                            value={displayName}
                            onChangeText={(value) => { setDisplayName(value) }}
                        />
                    </View>
                </View>

                <Text style={styles.textLabel}>Phone Number</Text>
                <View style={styles.inputView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            style={styles.inputIcon}
                            name="phone"
                            size={19}
                            color="#000"
                            type='font-awesome'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Input your phone number'
                            placeholderTextColor='grey'
                            onChangeText={(value) => { setPhoneNumber(value) }}
                            value={phoneNumber}
                        />
                    </View>
                </View>
            </View>


            <TouchableOpacity style={styles.loginButton} onPress={submit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title='error'
                message={errorMessage}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Tutup"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => navigateLogout()}
            />
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 150,
        width: "80%"
    },
    buttonText: {
        color: '#ff6400',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textLabel: {
        color: 'white',
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
        margin: 10
    },
    inputView: {
        backgroundColor: 'white',
        opacity: 0.7,
        height: 40,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputIcon: {
        marginLeft: 8,
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        flex: 1,
        fontSize: 16,
        color: 'black',
    },
})
