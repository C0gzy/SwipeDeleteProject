import {StyleSheet, Button, View, Platform, TouchableOpacity ,Dimensions, Text, Modal, Pressable} from 'react-native';
import dayjs from 'dayjs';
import { IconSymbol } from './ui/IconSymbol';

export default function ImageInfo(props){
    if (props.seeInfo == false){
        return null;
    }
    
    var date = TurnDateToLocalTime(props.photo.creationTime);
    var ModifiedDate = TurnDateToLocalTime(props.photo.modificationTime);
    console.log('ImageInfo:', props.photo);
    return (
        <Modal 
            visible={props.seeInfo}
            animationType="slide"
            transparent={true}
            onRequestClose={() => props.setInfoVisible(false)}
        >
            <Pressable 
                style={styles.modalOverlay} 
                onPress={() => props.setInfoVisible(false)}
            >
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
                    <InfoText text='Modified Date:' PhotoDetail={ModifiedDate}/>
                </View>
            </Pressable>
        </Modal>
    )
}

function TurnDateToLocalTime(date){
    return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

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