import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

export default function ProvinsiScreen() {
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [Data, setData] = useState([])
    const COLORS = ["#A8D3B7", "#91b383", "#A09CF3", "#F3CAA8", "#EEA4A7", "#AC90A9", "#A09CF3", "836853"];

    useEffect(() => {
        getDataProvinsi()
    }, [])

    const getDataProvinsi = () => {
        axios.get('https://api.kawalcorona.com/indonesia/provinsi/')
            .then((response) => {
                console.log(response.data[0]);
                setData(response.data)
            })
            .catch((error) => {
                setShowAlert(true)
                setErrorMessage(error.message)
                console.log(error);
            });
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
                    width: '100%', marginBottom: 0.5
                }}>
                    <Text style={{ backgroundColor: "#504E6D", padding: 5, color: 'white', fontSize: 25, fontWeight: "bold", textAlign: 'center' }}>{item.attributes.Provinsi}</Text>
                    <View style={{ flexDirection: 'row', width: '100%', margin: 5, justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText1}>Positif</Text>
                            <Text style={styles.itemText}>{item.attributes.Kasus_Posi}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText1}>Sembuh</Text>
                            <Text style={styles.itemText}>{item.attributes.Kasus_Semb}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText1}>Meninggal</Text>
                            <Text style={styles.itemText}>{item.attributes.Kasus_Meni}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.attributes.Kode_Provi}
            />
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={"Error"}
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
        margin: 15,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    itemText1: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    }
})
