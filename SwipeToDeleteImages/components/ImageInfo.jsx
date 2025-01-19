import {StyleSheet, Button, View, Platform, Dimensions, Text} from 'react-native';

import dayjs from 'dayjs';

export default function ImageInfo(props){

    
    var date = dayjs(props.photo.creationTime).format('DD/MM/YYYY HH:mm:ss');
    console.log('ImageInfo:', date);

    return (
        <View style={styles.ImageInfoContainer}>
            <Text style={styles.InfoTitle}>Image Info</Text>
            <InfoText text='Photo Name:' PhotoDetail={props.photo.filename}/>
            <InfoText text='Date:' PhotoDetail={date}/>
        </View>
    )
}


function InfoText(props){
    return (
        <View style={styles.InfoContainer}>
            <Text style={styles.InfoTextTitle}>{props.text}</Text>
            <Text style={styles.InfoText}>{props.PhotoDetail}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ImageInfoContainer: {
        flex: 1,
        position: 'absolute',
            
        alignSelf: 'center',
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 200,
        borderRadius: 20,
        padding: 20,
        borderColor: '#000000',
        marginBottom: 50,
        borderWidth: 3,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 1000,
    },
    InfoContainer: {
        gap : 10,
    },

    InfoTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    InfoText: {
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'column'
    },

    InfoTextTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        flexDirection: 'column'        
    }

});