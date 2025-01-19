import React, { useState , useEffect } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
import {StyleSheet, Button, View, Platform , Text , TouchableOpacity , Linking} from 'react-native';
import {getData} from '@/components/DataStore';


export default function Settings() {

    const [totalPhotosDeleted, setTotalPhotosDeleted] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
            try {
                const data = await getData('totalPhotosDeleted');
                console.log('data:', data);
                setTotalPhotosDeleted(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
        
            fetchData();
        }, [])
    )


    return (
        <View style={styles.container}>
            <Text style={styles.titleContainer}>Settings</Text>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Donate</Text>
              <View style={styles.infocontainer}>
                <TouchableOpacity style={styles.logoutbutton} onPress={() => Linking.openURL('https://www.buymeacoffee.com/tomcogzellq')}>
                <Text style={styles.infotext}>
                Wanna Help Out Donate
                </Text>
                </TouchableOpacity>
                <View></View>
  
              </View>
            </View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Infomation</Text>
              <View style={styles.infocontainer}>
                <Text style={styles.infotext}>You've Deleted {totalPhotosDeleted} Photos with picflick</Text>
                
                <View></View>
              </View>
              <View style={styles.infocontainer}>
                <Text style={styles.infotext}>You've Saved {totalPhotosDeleted * 6} MB with picflick</Text>
                <View></View>
              </View>
            </View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>About</Text>
              <View style={styles.infocontainer}>
                <Text style={styles.infotext}>Delevoped by Tom Cogzell a simple app where you can delete photots by swipping with no ads and extremely performative</Text>
              </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151718',
      alignItems: 'center',
    },
    subheader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#FFFFFF',
        marginTop: 20,
      },
    titleContainer: {
      flexDirection: 'row',
      marginTop: 60,
        fontSize: 50,
      alignItems: 'center',
      color: 'white',
    },
    subcontainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
      },

      infocontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
      },

      infotext: {
        fontSize: 16,
        textAlign: 'left',
        color: '#FFFFFF',
      },

      logoutbutton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
      },

      logouttext: {
        color: '#FFFFFF',
      },
  });