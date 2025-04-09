import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

const TopNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image
            source={require('../../assets/images/DrawerIcon.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/loginTopLogoTitle.png')}
          style={styles.Applogo}
        />
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/SearchIcon.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/NotificationIcon.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F2050',
    height: 55,
    paddingHorizontal: 15,
    elevation: 5,
    margin: 5,
    borderRadius: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  Applogo: {
    width: 150,
    height: 45,
    resizeMode: 'contain',
  },
  logo: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

export default TopNav;
