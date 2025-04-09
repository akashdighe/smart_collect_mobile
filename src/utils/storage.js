import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing key "${key}":`, error);
  }
};
export const getData = async key => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeData = async key => {
  await AsyncStorage.removeItem(key);
};
// const clearStorage = async () => {
//   await AsyncStorage.clear();
//   console.log('Storage cleared!');
// };

// clearStorage();
