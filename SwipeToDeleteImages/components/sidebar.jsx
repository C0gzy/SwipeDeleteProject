import React, { useState } from 'react';
import { IconSymbol } from './ui/IconSymbol';

import {StyleSheet, Button, View, Platform , TouchableOpacity , Text, Dimensions} from 'react-native';
import { DeleteImage } from '@/components/ImageComp'


export default function Sidebar(props){
    return (
        <View style={styles.sidebarContainer}>
            <TouchableOpacity>
                <IconSymbol name="magnifyingglass" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {DeleteImage(props.ListOfToDeleteImages , props.totalPhotosDeleted )}}>
                <IconSymbol name="trash" size={40} color="white">
                      
                </IconSymbol>
                {props.AmountToDelete == 0 ? null : <Text style={styles.binbadge}>{props.AmountToDelete}</Text>}
            </TouchableOpacity>
            <TouchableOpacity>
                <IconSymbol name="info" size={40} color="white"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    sidebarContainer: {
        flexDirection: 'row',
        gap: 40,
        alignItems: 'space-between',
        justifyContent: 'center',
        
        marginBottom: 90,
        

        
        padding: 5,
        width: Dimensions.get('window').width ,
        

        zIndex: 10,

        backgroundColor: 'rgba(0,0,0,0.5)'
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
    }
});