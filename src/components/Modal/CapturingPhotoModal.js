import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

const CapturingPhotoModal = ({visible, onClose}) => {
  const [fileUris, setFileUris] = useState([]); // Store multiple images

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take pictures',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openCamera = async () => {
    const cameraGranted = await requestCameraPermission();
    if (!cameraGranted) {
      Alert.alert(
        'Permission Denied',
        'Camera access is required to take pictures.',
      );
      return;
    }

    const options = {mediaType: 'photo', quality: 1, saveToPhotos: true};
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newImageUri = response.assets[0].uri;
        setFileUris([newImageUri]); // Store only the latest image
      }
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/CaptureImageModal/Profile.png')}
              style={styles.captureImageHeader}
            />
            <Text style={styles.headerText}> Capturing New Photo</Text>
          </View>

          {/* Camera or Photo Preview */}
          <View style={styles.captureArea}>
            {fileUris.length > 0 ? (
              <Image source={{uri: fileUris[0]}} style={styles.capturedImage} />
            ) : (
              <Image
                style={styles.capturedImageBefore}
                source={require('../../assets/images/CaptureImageModal/CaptureCamera.png')}
              />
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {fileUris.length === 0 ? (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={openCamera}>
                <Text style={styles.buttonText}>Capture</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.button} onPress={openCamera}>
                  <Image
                    style={styles.buttonIcon}
                    source={require('../../assets/images/CaptureImageModal/Recapture.png')}
                  />
                  <Text style={styles.buttonText}>Recapture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0F2050',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureImageHeader: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
  captureArea: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  capturedImageBefore: {
    width: '60%',
    height: '60%',
    borderRadius: 10,
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    marginTop: 10,
  },
  captureButton: {
    backgroundColor: '#0F2050',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  button: {
    backgroundColor: '#0F2050',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CapturingPhotoModal;
