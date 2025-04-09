import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useState('eve.holt@reqres.in'); // Sample email
  const [password, setPassword] = useState('cityslicka'); // Sample password
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const {login} = useContext(AuthContext); // ✅ Get login function

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      await login({email: username, password});
      Alert.alert('Success', 'Login successful');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/LoginTop.png')}
              style={styles.backgroundImage}
            />
            <Image
              source={require('../../assets/images/loginTopLogoTitle.png')}
              style={styles.logoImage}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Welcome to Smart Collect!</Text>

            <View style={styles.totalContainerAllInputs}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.inputField}
                  value={username}
                  onChangeText={text => {
                    setUsername(text);
                  }}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.inputField}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  secureTextEntry={true}
                  textContentType="password"
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                style={styles.forgotTextContainer}
                onPress={() => navigation.navigate('OtpVerification')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, {opacity: loading ? 0.6 : 1}]}
              disabled={loading}
              onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Image
              source={require('../../assets/images/LoginBottom.png')}
              style={styles.footerImage}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#fff'},
  flexContainer: {flex: 1},
  scrollContainer: {flexGrow: 1, justifyContent: 'center'},
  imageContainer: {
    width: '100%',
    height: height * 0.25,
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  logoImage: {
    height: height * 0.12,
    marginTop: height * 0.08,
    resizeMode: 'contain',
  },
  container: {flex: 1, alignItems: 'center', padding: width * 0.05},
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F2050',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#0F2050',
    // marginBottom: height * 0.09,
    marginTop: height * 0.02,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginTop: height * 0.03,
    // marginBottom: height * 0.02,
    backgroundColor: '#fff',
    position: 'relative',
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F2050',
  },
  inputField: {
    height: height * 0.06,
    width: '100%',
    paddingHorizontal: 15,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  forgotTextContainer: {alignSelf: 'flex-end'},
  forgotPassword: {
    color: '#0F2050',
    marginTop: height * 0.01,
  },
  button: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#0F2050',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: height * 0.09,
  },
  buttonText: {color: '#fff', fontSize: width * 0.04, fontWeight: 'bold'},
  footer: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  footerImage: {
    width: width * 0.8,
    height: height * 0.067,
    resizeMode: 'contain',
  },
  totalContainerAllInputs: {
    // borderWidth: 1, // Adds border
    // borderColor: '#000', // Border color (black)
    borderRadius: 10, // Rounded corners
    // padding: 10,
    height: height * 0.19,
    width: '100%',
    justifyContent: 'center',
    marginTop: height * 0.06,
  },
});

export default LoginScreen;
