import React, { useState } from 'react';
import { IconSymbol } from './ui/IconSymbol';

import {StyleSheet, Button, View, Platform , TouchableOpacity , Text, Dimensions} from 'react-native';
import { DeleteImage } from '@/components/ImageComp'
import YearCalender from '@/components/Calender';
import ImageInfo from '@/components/ImageInfo'
import { useRouter } from 'expo-router';

export default function Sidebar(props){
    const router = useRouter();
    const [seeCalender, setCalenderVisible] = useState(Boolean);
    const [seeInfo, setInfoVisible] = useState(Boolean);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View style={styles.sidebarContainer}>

        {isOpen &&
        <View style={styles.pulloutbar}>
            <TouchableOpacity onPress={() => {setCalenderVisible(!seeCalender)}}>
                <IconSymbol name="magnifyingglass" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {DeleteImage(props.ListOfToDeleteImages , props.totalPhotosDeleted )}}>
                <IconSymbol name="trash" size={40} color="white">
                      
                </IconSymbol>
                {props.AmountToDelete == 0 ? null : <Text style={styles.binbadge}>{props.AmountToDelete}</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setInfoVisible(!seeInfo)}>
                <IconSymbol name="info" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings')}>
                <IconSymbol name="gear" size={40} color="white"/>
            </TouchableOpacity>
            {seeCalender && 
                <YearCalender setcurrentYear={props.setcurrentYear} setCalenderVisible={setCalenderVisible}/>
            }
            {seeInfo &&
                <ImageInfo photo={props.currnetphoto}/>
            }
        </View>
        }

        <TouchableOpacity style={styles.ExpandButton} onPress={() => {setIsOpen(!isOpen)}}>
            <IconSymbol name="text.justify" size={40} color="black"/>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    ExpandButton: {
        padding: 10,
        borderRadius: 33,
        backgroundColor: '#FFFFFF',
        
        right: 10,
        
      
        zIndex: 1001,
    },
    sidebarContainer: {
        flexDirection: 'row',
        gap: 40,
        
        justifyContent: 'flex-end',
        
        marginBottom: '5%',
        
        padding: 5,
        width: Dimensions.get('window').width ,
        

        zIndex: 10,

        
    },

    pulloutbar: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        gap: 10,
        
        padding: 10,
        borderRadius: 33,
    },
    binbadge: {
        color: 'white',
        verticalAlign: 'middle',
        textAlign: 'center',

        position: 'absolute',
        left: 30,
        lineHeight: 30,
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 33,
        
    },
    CalendarContainer: {
        position: 'absolute',
        
        alignSelf: 'center',
        width: (Dimensions.get('window').width - 50),
        borderColor: '#000000',
        marginBottom: 50,
        borderWidth: 3,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 1000,
      },
});