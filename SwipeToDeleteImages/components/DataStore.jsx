import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key.toString(), value.toString());
    } catch (e) {
        console.log('Error saving data:', e);
      // saving error
    }
};


export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
        // value previously stored
      }
      return 0;
    } catch (e) {
        console.log('Error reading data:', e);
        return 0;
      // error reading value
    }
};