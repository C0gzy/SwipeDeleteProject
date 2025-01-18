import {Image} from 'expo-image'
import { GestureHandlerRootView , PanGestureHandler} from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import React, { useState } from 'react';
import {StyleSheet, Button, View, Platform, Dimensions, Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

var ListOfToDeleteImages = [];

export default function SwipeableImage(props) {
    const [imageUri, setImageUri] = useState('');
    const [imageAsset, setImageAsset] = useState(null);
    const [translateX, settranslateX] = useState(0);
    const [rotateZ, setrotateZ] = useState(0);

    const [CurrentImageIndex, setCurrentImageIndex] = useState(0);
    
    const [IsStartButtonVisible, setIsStartButtonVisible] = useState(true);
    

    const [DirText, setDirText] = useState('');
  
    const onGestureEvent = (event) => {
      settranslateX(event.nativeEvent.translationX);
      setrotateZ(translateX / 10); // Adjust the divisor to control the rotation sensitivity

      if (event.nativeEvent.translationX > 0) {
        setDirText('Keep');
      }else if (event.nativeEvent.translationX < 0) {
        setDirText('Delete');
        
      }

      console.log(`onGestureEvent: translateX=${translateX}, rotateZ=${rotateZ.value}`);
    };
  
    const onHandlerStateChange = (event) => {
      if (event.nativeEvent.state === 5) { // 5 corresponds to State.END
        settranslateX(event.nativeEvent.translationX);
        if (event.nativeEvent.translationX > 50) {
          pickRandomImage();
        } else if (event.nativeEvent.translationX < -50) {
            ListOfToDeleteImages.push(imageAsset);
          pickRandomImage();

        }
        setDirText('');
        settranslateX(0);
        setrotateZ(0);
        //settranslateX(withSpring(0));
        //rotateZ.value = withSpring(0);
      }
    };
  
    const pickRandomImage = async () => {
        setIsStartButtonVisible(false);
        setCurrentImageIndex(CurrentImageIndex + 1);
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
  
        let media = [];
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
  
        if (media.length > 0) {
          const randomImage = media[CurrentImageIndex].uri;
            setImageAsset(media[CurrentImageIndex]);
          setImageUri(randomImage);
        }
      } catch (error) {
        console.error('Error picking random image:', error);
      }
    };
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
            { translateX: translateX },
          { rotateZ: `${rotateZ}deg` },
        ],
      };
    });
  
    return (
      <GestureHandlerRootView style={styles.MainImageDector}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <Text style={styles.DirText}>{DirText}</Text>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          </Animated.View>
        </PanGestureHandler>
        {IsStartButtonVisible ? <Button title="Start Deleting" onPress={pickRandomImage} /> : null}
        <Button title={"Delete Selected Images: " + ListOfToDeleteImages.length} onPress={() => DeleteImage(ListOfToDeleteImages)} />
      </GestureHandlerRootView>
    );
}


const DeleteImage = async (imageasset) => {
    try {
        console.log('Deleting image:', imageasset.uri);
        ListOfToDeleteImages = [];
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
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 300,
      borderWidth: 2,
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
    DirText: {
      color: 'white',
      fontSize: 50,
        textAlign: 'center',
      zIndex: 1
    },
  });