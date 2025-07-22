import React, { useState, useEffect } from 'react';
import { IconSymbol } from './ui/IconSymbol';

import {StyleSheet, Button, View, Platform , TouchableOpacity , Text, Dimensions} from 'react-native';
import { DeleteImage } from '@/components/ImageComp'
import YearCalender from '@/components/Calender';
import ImageInfo from '@/components/ImageInfo'
import { useRouter } from 'expo-router';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring,
    runOnJS,
    withTiming
  } from 'react-native-reanimated';


export default function Sidebar(props){
    const router = useRouter();
    const [seeCalender, setCalenderVisible] = useState(Boolean);
    const [seeInfo, setInfoVisible] = useState(Boolean);
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const left = useSharedValue(200);
    const opacity = useSharedValue(0);
    const rotate = useSharedValue(0);
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        left: left.value,
        opacity: opacity.value
      };
    });

    const rollanimatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ rotate: `${rotate.value}deg` }],
        };
      });   

    // Function to handle when animation is complete
    const onAnimationComplete = (isOpening) => {
        setIsAnimating(false);
        if (!isOpening) {
            setIsOpen(false);
        }
    };


    const handleOpen = () => {
        console.log('Current left value:', left.value);
        
        if (isAnimating) return; // Prevent multiple clicks during animation
        rotate.value = withSpring(rotate.value - 90, {
            damping: 15,
            stiffness: 100
        })
        
        if (!isOpen) {
            // Opening the sidebar
            setIsOpen(true); // Show immediately when opening
            setIsAnimating(true);
            left.value = withSpring(0, {
                damping: 25,
                stiffness: 100
            }, (finished) => {
                if (finished) {
                    runOnJS(onAnimationComplete)(true);
                }
            });
        } else {
            // Closing the sidebar
            setIsAnimating(true);
            left.value = withSpring(100, {
                damping: 50,
                stiffness: 100
            }, (finished) => {
                if (finished) {
                    runOnJS(onAnimationComplete)(false);
                }
            });
        }
        opacity.value = withTiming(isOpen ? 0 : 1, {
            duration: 300
        });


    };




    return (
        <>
        <YearCalender seeCalender={seeCalender} setCalenderVisible={setCalenderVisible} setcurrentYear={props.setcurrentYear} setCalenderVisible={setCalenderVisible}/>
        <ImageInfo seeInfo={seeInfo} setInfoVisible={setInfoVisible} photo={props.currnetphoto}/>
        <View style={styles.sidebarContainer}>


 


        <TouchableOpacity style={styles.ExpandButton} onPress={() => {DeleteImage(props.ListOfToDeleteImages , props.totalPhotosDeleted )}}>
                <IconSymbol name="trash" size={40} color="black">
                      
                </IconSymbol>
                {props.AmountToDelete == 0 ? null : <Text style={styles.binbadge}>{props.AmountToDelete}</Text>}
        </TouchableOpacity>
        { isOpen &&
        <Animated.View style={[styles.pulloutbar, animatedStyle]}>
            {props.currnetphoto &&
            <>
            <TouchableOpacity onPress={() => {setCalenderVisible(!seeCalender)}}>
                <IconSymbol name="magnifyingglass" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setInfoVisible(!seeInfo)}>
                <IconSymbol name="info" size={40} color="white"/>
            </TouchableOpacity>
            </>
         }
            <TouchableOpacity onPress={() => router.push('/settings')}>
                <IconSymbol name="gear" size={40} color="white"/>
            </TouchableOpacity>

        </Animated.View>

        }

        <AnimatedTouchable style={[styles.ExpandButton, rollanimatedStyle]} onPress={handleOpen}>
            <IconSymbol name="text.justify" size={40} color="black"/>
        </AnimatedTouchable>
        </View>
        </>
    )
}

const styles = StyleSheet.create({

    ExpandButton: {
        padding: 10,
        borderRadius: 33,
        backgroundColor: '#FFFFFF',
        zIndex: 1001,
    },
    sidebarContainer: {
        flexDirection: 'row',
       
       
        
        justifyContent: 'space-between',
        
        marginBottom: '5%',
        
        padding: 5,
        zIndex: 10,

    },

    pulloutbar: {
       
        top: 0,
        left: 0,
       
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
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