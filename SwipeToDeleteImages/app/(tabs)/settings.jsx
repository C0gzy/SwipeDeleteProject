import React, { useState } from 'react';

import { ThemedView } from '@/components/ThemedView';
import {StyleSheet, Button, View, Platform , Text} from 'react-native';

export default function Settings() {


    return (
        <ThemedView style={styles.container}>
            <Text style={styles.titleContainer}>Settings</Text>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      alignItems: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      top: 50,
        fontSize: 50,
      alignItems: 'center',
      color: 'white',
    },
  });