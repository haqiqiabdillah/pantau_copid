import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Keyboard,
} from 'react-native';
// import BackgroundImage from '../assets/graha.png';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { addUser } from '../redux/UserSlice'

export default function RegisterScreen({ navigation }) {
    let BackgroundImage ={ uri: 'https://i.imgur.com/ozZ4EW1.png'};
    let icon ={ uri: 'https://i.imgur.com/tMTTEbY.png'};
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecured, setPasswordSecured] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const Register = () => {
        if (email == '' || password == '') {
            setShowAlert(true)
            setErrorMessage("Email atau password harus diisi")
        } else {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                    let passwordEncrypted = userCredential.user.uid
                    setPassword(userCredential.user.uid)
                    dispatch(addUser({ email, password }));
                    navigation.navigate("Complete Your Profile", { email, passwordEncrypted })
                })
                .catch((error) => {
                    setShowAlert(true)
                    setErrorMessage(error.message)
                })
        }
    }
    useEffect(() => {
        setPassword('')
        setEmail('')
    }, [])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image
                        style={{ flex: 1, resizeMode: 'stretch' }}
                        source={require('../assets/graha.png')}
                    />
                    <Animatable.Image source={require('../assets/pantaucopid_ico.png')}
                        style={{ width: 300, height: 150, position: 'absolute', marginTop: 250 }} animation='zoomInDown' delay={1000}>
                    </Animatable.Image>
                </View>

                <View style={{ flex: 0.1, position: 'absolute', margin: 30, marginTop: 100 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 35, color: 'white' }}>Create</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 35, color: 'white' }}>Account</Text>
                </View>
                <View style={styles.bottomView}>
                    <Text style={{ fontSize: 30, color: 'grey', fontWeight: 'bold' }}>Register</Text>

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
                                onChangeText={(value) => { setEmail(value) }}
                                value={email}
                            />
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                            <Icon
                                style={styles.inputIcon}
                                name='lock'
                                size={20}
                                type='ionicons'
                                color='#000'
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Password'
                                placeholderTextColor='grey'
                                secureTextEntry={passwordSecured}
                                onChangeText={(value) => { setPassword(value) }}
                                value={password}
                            />
                            <TouchableOpacity onPress={() => { setPasswordSecured(!passwordSecured) }}>
                                <Icon name='eye' type='font-awesome-5' size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={Register}>
                        <Text style={styles.loginButtonText}>Register</Text>
                        {/* <Button color='red' title="Login" onPress={handleSubmit} disabled={!isValid} /> */}
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View
                            style={{
                                flex: 4,
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Text style={{ flex: 1, color: 'grey', textAlign: 'center', alignItems: 'center' }}>or</Text>
                        <View
                            style={{
                                flex: 4,
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>


                    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login Screen')}>
                        <Text style={styles.registerButtonText} >Log In</Text>
                    </TouchableOpacity>

                </View>

                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Error"
                    message={errorMessage}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    // cancelText="No, cancel"
                    confirmText="Tutup"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => setShowAlert(false)}
                />
            </View>
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.1,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    bottomView: {
        // justifyContent: 'center',
        height: '45%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    loginText: {
        fontSize: 24,
        marginTop: 12,
        marginBottom: 4,
    },
    inputView: {
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    inputIcon: {
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#ff6400',
        borderColor: '#ff6400',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 3
    },
    loginButtonText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    registerButtonText: {
        color: 'grey',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    registerButton: {
        borderWidth: 3,
        borderColor: 'grey',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    fpText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontSize: 16,
        color: '#5352ed',
    },

});
