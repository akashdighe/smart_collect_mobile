import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import CapturingPhotoModal from '../../components/Modal/CapturingPhotoModal';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const {logout} = useContext(AuthContext); // ✅ Get logout function from context
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoImageContainer}>
          <Image
            style={styles.logoImage}
            source={require('../../assets/images/loginTopLogoTitle.png')}></Image>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/ProfileScreen/ProfileSample.png')}></Image>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.cameraIconContainer}>
              <Image
                style={styles.cameraIconProfile}
                source={require('../../assets/images/ProfileScreen/ProfileCamera.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.infoContainer}>
        <ProfileInfo
          label="Username:"
          value="dnyandeviwagh"
          icon={require('../../assets/images/ProfileScreen/username.png')}
        />
        <ProfileInfo
          label="Name:"
          value="Dnyandevi Wagh"
          icon={require('../../assets/images/ProfileScreen/name.png')}
        />
        <ProfileInfo
          label="Designation:"
          value="Head Officer"
          icon={require('../../assets/images/ProfileScreen/designation.png')}
        />
        <ProfileInfo
          label="Mobile Number:"
          value="+91 9989800986"
          isBold
          icon={require('../../assets/images/ProfileScreen/MobileNumber.png')}
        />
      </View>

      {/* Actions */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionItem}>
          <Image
            source={require('../../assets/images/ProfileScreen/ChangePassword.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.actionText}> Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Image
            source={require('../../assets/images/ProfileScreen/Logout.png')}
            style={styles.infoIcon}
          />
          <Text style={[styles.actionText]} onPress={logout}>
            {' '}
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <CapturingPhotoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

// Reusable Profile Info Component
const ProfileInfo = ({label, value, isBold, icon}) => (
  <View style={styles.infoRow}>
    <View style={styles.labelIconContainer}>
      <View>{icon && <Image source={icon} style={styles.infoIcon} />}</View>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
    </View>
    <View style={styles.valueContainer}>
      <Text style={[styles.infoValue, isBold && styles.boldText]}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerContainer: {
    backgroundColor: '#0F2050',
    height: height * 0.16,
    borderRadius: 10,
  },
  logoImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  logoImage: {
    width: width * 0.68,
    height: height * 0.067,
    resizeMode: 'contain',
    marginRight: 15,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 7,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: 'relative',
    bottom: 23, // Moves the icon towards the bottom of the profile image
    right: -35,
    borderRadius: 20, // Circular shape for the icon background
  },
  cameraIconProfile: {
    width: 25, // Adjust the icon size
    height: 25,
  },
  infoContainer: {
    backgroundColor: '#F2F6FF',
    padding: 20,
    borderRadius: 10,
    marginTop: 100,
    margin: 10,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoLabel: {
    fontSize: 14,
    color: '#0F2050',
    marginLeft: 5,
  },
  infoValue: {
    fontSize: 14,
    color: '#0F2050',
    fontWeight: 'bold',
  },
  infoIcon: {
    width: 12,
    height: 12,
  },
  valueContainer: {
    borderBottomWidth: 1, // Adds a bottom border
    borderBottomColor: '#CAD8FF', // Light gray color for the border
    paddingBottom: 5, // Adds some space between text and border
    width: 120,
    alignItems: 'center',
  },

  actionContainer: {
    backgroundColor: '#F2F6FF',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  // new

  headers: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  boldText: {
    fontWeight: 'bold',
  },

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#5a67d8',
  },

  //new now
});

export default ProfileScreen;
