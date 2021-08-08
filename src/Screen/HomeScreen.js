import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import firebase from '@react-native-firebase/app';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch;
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [titleMessage, setTitleMessage] = useState('')
    const [dataIndo, setDataIndo] = useState({})
    const [positifGlobal, setPositifGlobal] = useState('')
    const [sembuhGlobal, setSembuhGlobal] = useState('')
    const [meninggalGlobal, setMeninggalGlobal] = useState('')

    const userLogin = firebase.auth().currentUser;

    useEffect(() => {
        getDataIndonesia()
        getDataGlobalPositif()
        getDataGlobalSembuh()
        getDataGlobalMeninggal()
    }, [])

    const getDataGlobalPositif = () => {
        axios.get('https://api.kawalcorona.com/positif')
            .then((response) => {
                setPositifGlobal(response.data.value)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const getDataGlobalSembuh = () => {
        axios.get('https://api.kawalcorona.com/sembuh')
            .then((response) => {
                console.log(response.data.value)
                setSembuhGlobal("132,558,386")
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const getDataGlobalMeninggal = () => {
        axios.get('https://api.kawalcorona.com/meninggal')
            .then((response) => {
                setMeninggalGlobal(response.data.value)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const getDataIndonesia = () => {
        axios.get('https://api.kawalcorona.com/indonesia/')
            .then((response) => {
                setDataIndo(response.data[0])
            })
            .catch((error) => {
                setShowAlert(true)
                setErrorMessage(error.message)
                console.log(error);
            });
    }

    return (
        <View style={{
            backgroundColor: '#FFEED2',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        }}>
            <View style={{ marginTop: 10, backgroundColor: '#FBFBFB', margin: 5, width: '95%', borderRadius: 1, padding: 10, borderWidth: 0.1 }}>
                <Text style={{ color: '#ff401f', fontSize: 35, fontWeight: "bold", textAlign: 'center', padding: 6, }}>Statistik Kasus Covid19 Seluruh Dunia </Text>
            </View>
            <View style={{ marginTop: 10, backgroundColor: '#ba0000', margin: 5, width: '95%', borderRadius: 1, padding: 10 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }}>Total Positif</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'white' }}>{positifGlobal}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ backgroundColor: '#2c9412', margin: 5, width: '46%', borderRadius: 1, padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }}>Total Sembuh</Text>
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'white' }}>{sembuhGlobal}</Text>
                </View>
                <View style={{ backgroundColor: '#060073', margin: 5, width: '46%', borderRadius: 1, padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }}>Total Meninggal</Text>
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'white' }}>{meninggalGlobal}</Text>
                </View>
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#ff7f4d', margin: 5, width: '95%', borderRadius: 1 }}>
                <Text style={{ backgroundColor: '#ff401f', marginTop: 10, color: 'white', fontSize: 20, fontWeight: "bold", textAlign: 'center', padding: 6, }}>{dataIndo.name}</Text>
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10, margin: 5, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.itemView}>
                        <Text style={styles.itemText1}>Positif</Text>
                        <Text style={styles.itemText}>{dataIndo.positif}</Text>
                        {/* </View>
                    <View style={styles.itemView}> */}
                        <Text style={styles.itemText1}>Sembuh</Text>
                        <Text style={styles.itemText}>{dataIndo.sembuh}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemText1}>Dirawat</Text>
                        <Text style={styles.itemText}>{dataIndo.dirawat}</Text>
                        {/* </View>
                    <View style={styles.itemView}> */}
                        <Text style={styles.itemText1}>Meninggal</Text>
                        <Text style={styles.itemText}>{dataIndo.meninggal}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Provinsi Screen")} style={{ marginTop: 10, backgroundColor: '#ff2216', margin: 5, width: '80%', borderRadius: 10 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold", textAlign: 'center', padding: 6, }}>{"Lihat Kasus Covid19 Provinsi    >>>>"}</Text>
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
                onConfirmPressed={() => setShowAlert(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        margin: 15,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    itemText1: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    }

})
