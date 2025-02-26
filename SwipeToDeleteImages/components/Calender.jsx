import {StyleSheet, Button, View, Platform , Pressable , TouchableOpacity  , Text, Dimensions, ScrollView} from 'react-native';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import { IconSymbol } from './ui/IconSymbol';
var Year = dayjs().year();

export default function YearCalender(props){
    

    return (
        <Pressable onPress={() => props.setCalenderVisible(false)}>
        <Modal isVisible={props.seeCalender}>
        <View style={styles.CalendarContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <Text style={styles.Title}>Select A Year</Text>
        <TouchableOpacity onPress={() => props.setCalenderVisible(false)}>
            <IconSymbol name="xmark" size={30} color="white" />
        </TouchableOpacity>
        </View>
        <ScrollView style={{width: '90%'}}>
            <TouchableOpacity style={styles.Yearbutton} onPress={() => {
            props.setcurrentYear(null);
            props.setCalenderVisible(false);
            }}>
            <Text style={styles.YeatText}>Entire CameraRoll</Text>
            </TouchableOpacity>
            <CreateYearList setcurrentYear={props.setcurrentYear} setCalenderVisible={props.setCalenderVisible}/>
        </ScrollView>
        </View>
        </Modal>
        </Pressable>
        
    )
}

function CreateYearList(props){
    var YearList = [];
    for (let i = 0; i < 10; i++) {
        YearList.push(<YearButton key={Year - i} setcurrentYear={props.setcurrentYear} setCalenderVisible={props.setCalenderVisible} year={Year - i}/>)
    }
    return YearList;
}

function YearButton(props){
    return (
        <TouchableOpacity style={styles.Yearbutton} onPress={() => {
            props.setcurrentYear(props.year);
            props.setCalenderVisible(false);
        }}>
            <Text style={styles.YeatText}>{props.year}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
       
    },

    CalendarContainer: {

       
       
            
        alignSelf: 'center',
        alignItems: 'center',
        
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 200,
        borderRadius: 20,
        padding: 10,
        borderColor: '#FFFFFF',
        marginBottom: 70,
        marginTop: 70,
        borderWidth: 3,
        
        bottom: 0,
        backgroundColor: '#151718',
        zIndex: 1000,

    },

    Yearbutton: {
        color: 'white',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#FF5733',
        borderRadius: 5,
        
    },

    YeatText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});