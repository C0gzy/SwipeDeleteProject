import {Image} from 'expo-image'
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  useAnimatedGestureHandler 
} from 'react-native-reanimated';
import React, { useState, useEffect, render } from 'react';
import { StyleSheet, Button, View, Platform, Dimensions, Text } from 'react-native';

import {getData, storeData} from '@/components/DataStore';

import Sidebar from '@/components/sidebar'

import dayjs from 'dayjs';
import * as MediaLibrary from 'expo-media-library';

var ListOfToDeleteImages = [];
var media = [];

const UpdateDeletedImages = async(CurrentCount) =>{
    try {
        await storeData('totalPhotosDeleted', CurrentCount);
    } catch (error) {
        console.error('Error updating deleted images:', error);
    }
}

export function FetchListOfToDeleteImages(){
    return ListOfToDeleteImages;
}


export default function SwipeableImage(props) {
    const [imageAsset, setImageAsset] = useState(null);
    const [CurrentImageIndex, setCurrentImageIndex] = useState(0);
    
    const [IsStartButtonVisible, setIsStartButtonVisible] = useState(true);
    const [DirText, setDirText] = useState('');

    const [totalPhotosDeleted, setTotalPhotosDeleted] = useState(0);

    const [currentYear, setcurrentYear] = useState(null);
    
    // Use shared values for animations
    const translateX = useSharedValue(0);
    const rotateZ = useSharedValue(0);
    
    // Helper function to update direction text
    const updateDirectionText = (translationX) => {
      if (translationX > 25) {
        setDirText('Keep');
      } else if (translationX < -25) {
        setDirText('Delete');
      } else {
        setDirText('');
      }
    };

    // Function to handle keeping an image
    const handleKeepImage = () => {
      GetNextImage();
      // Reset animations after a short delay
      setTimeout(() => {
        translateX.value = 0;
        rotateZ.value = 0;
        setDirText('');
      }, 100);
    };

    // Function to handle deleting an image
    const handleDeleteImage = () => {
      ListOfToDeleteImages.push(imageAsset);
      setTotalPhotosDeleted(totalPhotosDeleted + 1);
      GetNextImage();
      // Reset animations after a short delay
      setTimeout(() => {
        translateX.value = 0;
        rotateZ.value = 0;
        setDirText('');
      }, 100);
    };
      
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getData('totalPhotosDeleted');
          console.log('data:', data);
          setTotalPhotosDeleted(Number(data));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      pickRandomImage();
      fetchData();
    }, [currentYear]);
  
    // Basic gesture handler for pan gestures
    const onGestureEvent = (event) => {
      const translationX = event.nativeEvent.translationX;
      translateX.value = translationX;
      rotateZ.value = translationX / 10; // Adjust the divisor to control the rotation sensitivity

      updateDirectionText(translationX);
    };

    const onHandlerStateChange = (event) => {
      if (event.nativeEvent.state === 5) { // 5 corresponds to State.END
        const translationX = event.nativeEvent.translationX;
        
        if (translationX > 50) {
          // Handle keep image
          handleKeepImage();
        } else if (translationX < -50) {
          // Handle delete image
          handleDeleteImage();
        } else {
          // Spring back to center
          translateX.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
          });
          rotateZ.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
          });
          setDirText('');
        }
      }
    };

    const filterAssetsByYear = (assets, year) => {
        var filtered = media.filter(asset => dayjs(asset.creationTime).year() === year)
        if (!assets) {
          return [];
        }else if (year === null) {
            return media;
        }else if (filtered.length === 0) {
            return media;
        }
        return filtered;
    }
    
    const pickRandomImage = async () => {
        setIsStartButtonVisible(false);
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
  
        let hasNextPage = true;
        let after = null;
    
        while (hasNextPage) {
          const result = await MediaLibrary.getAssetsAsync({
            mediaType: 'photo',
            first: 100, // Fetch 100 assets at a time
            after: after,
          });
    
          media = media.concat(result.assets);
          hasNextPage = result.hasNextPage;
          after = result.endCursor;
        }
          
        GetNextImage();
      } catch (error) {
        console.error('Error picking random image:', error);
      }
    };

    function GetNextImage() {
        setCurrentImageIndex(CurrentImageIndex + 1);
        let filterList = filterAssetsByYear(media, currentYear);
        
        if (filterList.length > 0) {
            setImageAsset(filterList[CurrentImageIndex]);
        }
    }
  
    // Animated style using proper animation values
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { rotateZ: `${rotateZ.value}deg` },
        ],
      };
    });
  
    return (
        <View>
      <GestureHandlerRootView style={styles.MainImageDector}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <Text style={styles.DirText(DirText)}>{DirText}</Text>
            <View style={styles.image}>
            {imageAsset && <Image source={{ uri: imageAsset.uri }} style={styles.image} />}
            </View>
          </Animated.View>
        </PanGestureHandler>
        
        
        {/*
        {IsStartButtonVisible ? null : <Button title={"Delete Selected Images: " + ListOfToDeleteImages.length} onPress={() => DeleteImage(ListOfToDeleteImages,totalPhotosDeleted)} />}
        */}
        </GestureHandlerRootView>
        {!IsStartButtonVisible ? <Sidebar setcurrentYear={setcurrentYear} currnetphoto={imageAsset} AmountToDelete={ListOfToDeleteImages.length} totalPhotosDeleted={totalPhotosDeleted} ListOfToDeleteImages={ListOfToDeleteImages} /> : null}
        </View>
      
    );
}


export const DeleteImage = async (imageasset, totalPhotosDeleted) => {
    try {
        console.log('Deleting image:', imageasset);
        ListOfToDeleteImages = [];
        UpdateDeletedImages(totalPhotosDeleted);
        await MediaLibrary.deleteAssetsAsync(imageasset);

    }catch (error) {
        console.error('Error deleting image:', error);
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      resizeMode: 'cover',
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 200,
      borderWidth: 0,
      borderColor: 'white',
    },
    MainImageDector: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {

        alignContent: 'center',
        justifyContent: 'center',
    },
    DirText: (color) => {
        if (color === 'Delete') {
            return{
                fontWeight: 'bold',
                color: 'red',
                fontSize: 50,
                textAlign: 'center',
                zIndex: 1
            }
        }
        return{
            color: '#66ff66',
            fontSize: 60,
            fontWeight: 'bold',
            textAlign: 'center',
            zIndex: 1
        }
    },
  });