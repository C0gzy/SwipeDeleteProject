import {StyleSheet, Button, View, Platform , TouchableOpacity , Text, Dimensions, ScrollView} from 'react-native';
import dayjs from 'dayjs';

var Year = dayjs().year();

export default function YearCalender(props){
    

    return (
        <ScrollView style={styles.CalendarContainer}>
            <TouchableOpacity style={styles.Yearbutton} onPress={() => {
            props.setcurrentYear(null);
            props.setCalenderVisible(false);
            }}>
            <Text style={styles.YeatText}>Entire CameraRoll</Text>
            </TouchableOpacity>
            <CreateYearList setcurrentYear={props.setcurrentYear} setCalenderVisible={props.setCalenderVisible}/>
        </ScrollView>
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
    CalendarContainer: {

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

    Yearbutton: {
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },

    YeatText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});