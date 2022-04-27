import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { storeData, getData } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { MyButton } from '../../components';

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
export default function ({ navigation, route }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getDataBarang();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getDataBarang();
    }, []);


    const updateStatusAsset = (x, y) => {
        // alert(x + ' ' + y);
        axios.post('https://absen.zavalabs.com/api/absen_asset_update.php', {
            id_asset: x,
            status_asset: y,
        }).then(res => {
            getDataBarang();
        })

    }

    const confirmAsset = (x, y) => {
        Alert.alert(
            "Apakah asset ini milik Anda ?",
            y,
            [

                {
                    text: "TIDAK",
                    onPress: () => updateStatusAsset(x, 'TIDAK'),

                },
                {
                    text: "YA", onPress: () => updateStatusAsset(x, 'YA')

                }
            ]
        );
    }

    const getDataBarang = () => {
        getData('user').then(res => {
            axios
                .post('https://absen.zavalabs.com/api/absen_asset.php', {
                    id_user: res.id,
                })
                .then(x => {
                    console.log(x.data);
                    setData(x.data);
                });
        });
    };

    const renderItem = ({ item }) => (
        <View
            style={{
                padding: 10,
                margin: 10,
                backgroundColor: 'white',
                elevation: 1,
            }}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text
                    style={{
                        flex: 1,
                        fontSize: windowWidth / 30,
                        color: colors.primary,
                        fontFamily: fonts.secondary[600],
                    }}>
                    {item.nama_asset}
                </Text>
                <Text
                    style={{
                        fontSize: windowWidth / 30,
                        color: colors.black,
                        fontFamily: fonts.secondary[600],
                    }}>
                    {item.harga_asset}
                </Text>
            </View>

            <View
                style={{

                    padding: 10,
                    borderTopWidth: 1,
                    borderTopColor: colors.tertiary,
                }}>

                <Image source={{ uri: item.image }} style={{
                    width: '100%', height: 250, resizeMode: 'contain'
                }} />
            </View>
            <View style={{ flexDirection: 'row' }}>

                {item.status_asset == "YA" && (
                    <Text style={{ flex: 1, backgroundColor: colors.success, padding: 10, margin: 10, textAlign: 'center', color: colors.white }}>ASSET SAYA</Text>
                )}

                {item.status_asset == "TIDAK" && (
                    <Text style={{ flex: 1, backgroundColor: colors.danger, padding: 10, margin: 10, textAlign: 'center', color: colors.white }}>BUKAN ASSET SAYA</Text>
                )}


                <TouchableOpacity style={{
                    flex: 1, backgroundColor: colors.primary, padding: 10, margin: 10,
                }} onPress={() => confirmAsset(item.id, `${item.nama_asset} Rp. ${item.harga_asset}`)}
                >
                    <Text style={{ textAlign: 'center', color: colors.white }}>KONFIRMASI</Text>
                </TouchableOpacity>

            </View>
        </View>
    );

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.primary]}
                />
            }
            style={{
                padding: 10,
            }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
