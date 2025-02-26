import {StyleSheet, Button, View, Platform, TouchableOpacity ,Dimensions, Text} from 'react-native';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import { IconSymbol } from './ui/IconSymbol';

export default function ImageInfo(props){
    if (props.seeInfo == false){
        return null;
    }
    
    var date = dayjs(props.photo.creationTime).format('DD/MM/YYYY HH:mm:ss');
    console.log('ImageInfo:', date);
    return (
        <Modal isVisible={props.seeInfo}>
        <View style={styles.ImageInfoContainer}>
        <View style={{borderBottomWidth: 5, borderBottomColor: 'white',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Text style={styles.InfoTitle}>Image Info</Text>
            <TouchableOpacity onPress={() => props.setInfoVisible(false)}>
                <IconSymbol name="xmark" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <InfoText text='Photo Name:' PhotoDetail={props.photo.filename}/>
            <InfoText text='Date:' PhotoDetail={date}/>
            <InfoText text='Width:' PhotoDetail={props.photo.width}/>
            <InfoText text='Height:' PhotoDetail={props.photo.height}/>
        </View>
        </Modal>
    )
}


function InfoText(props){
    if (props.text == null){
        return null;
    }
    return (
        <View style={styles.InfoContainer}>
            <Text style={styles.InfoTextTitle}>{props.text}</Text>
            <Text style={styles.InfoText}>{props.PhotoDetail}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ImageInfoContainer: {
            
        alignSelf: 'center',
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 200,
        borderRadius: 20,
        padding: 20,
        borderColor: '#FFFFFF',
        marginBottom: 70,
        borderWidth: 3,
        
        bottom: 0,
        backgroundColor: '#151718',
        zIndex: 1000,
    },
    InfoContainer: {
        color: 'white',
        gap : 10,
        marginBottom: 10,
    },

    InfoTitle: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    InfoText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'column'
    },

    InfoTextTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        flexDirection: 'column'        
    }

});