import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import {windowWidth, fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {MyButton, MyGap} from '../../components';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

export default function Account({navigation, route}) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');

  const getWa = () => {
    axios.get('https://zavalabs.com/niagabusana/api/company.php').then(res => {
      setCom(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(user);
      });
      getWa();
    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('Login');
  };

  const kirimWa = x => {
    Linking.openURL(
      'https://api.whatsapp.com/send?phone=' +
        x +
        '&text=Halo%20NIAGA%20BUSANA',
    );
  };

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.black,
            }}>
            {user.nama_lengkap}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: colors.black,
            }}>
            {user.nip}
          </Text>
        </View>
        {/* data detail */}
        <View style={{padding: 10}}>
          <MyButton
            onPress={() => navigation.navigate('EditProfile', user)}
            title="Edit Profile"
            colorText={colors.white}
            iconColor={colors.white}
            warna={colors.secondary}
            Icons="create-outline"
          />

          <MyGap jarak={10} />
          <View>
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                E-mail
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.email}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Telepon / Whatsapp
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.telepon}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Divisi
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.divisi}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Jabatan
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.jabatan}
              </Text>
            </View>
          </View>
        </View>

        {/* button */}
        <View style={{padding: 10}}>
          <MyButton
            onPress={btnKeluar}
            title="Keluar"
            colorText={colors.white}
            iconColor={colors.white}
            warna={colors.primary}
            Icons="log-out-outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
