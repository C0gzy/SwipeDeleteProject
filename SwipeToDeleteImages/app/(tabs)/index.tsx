import React, { useState } from 'react';


import {StyleSheet, Button, View, Platform} from 'react-native';


import  SwipeableImage  from '@/components/ImageComp'


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {


  return (
    <ThemedView style={styles.container}>
        <SwipeableImage  />
        
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    flexDirection: 'column',
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
