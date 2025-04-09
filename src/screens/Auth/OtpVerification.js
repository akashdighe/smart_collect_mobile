import React, {useState} from 'react';
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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const OtpVerification = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          {/* Top Image Section */}
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

          {/* OTP Verification Screens */}
          <View style={styles.container}>
            <Text style={styles.title}>OTP Verification</Text>
            {step === 1 && (
              <Text style={styles.subtitle}>
                We will send you a one-time password to your Email-ID
              </Text>
            )}
            {step === 1 && (
              <>
                <View style={styles.totalContainerAllInputs}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                      style={styles.inputField}
                      value={username}
                      onChangeText={text => {
                        setUsername(text);
                        setErrors({...errors, username: null});
                      }}
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.inputField}
                      value={email}
                      onChangeText={text => {
                        setEmail(text);
                      }}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setStep(2)}>
                  <Text style={styles.buttonText}>Verify Email</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <Text style={styles.subtitle}>
                Enter the OTP sent to{' '}
                <Text style={styles.boldText}>{email}</Text>
              </Text>
            )}
            {step === 2 && (
              <>
                <View style={styles.otpContainer}>
                  {otp.map((value, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpBox}
                      value={value}
                      onChangeText={text => handleOtpChange(index, text)}
                      keyboardType="numeric"
                      maxLength={1}
                    />
                  ))}
                </View>

                <TouchableOpacity>
                  <Text style={styles.resendText}>
                    Didn’t receive the OTP?{' '}
                    <Text style={styles.resendLink}>Resend OTP</Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.buttonText}>Verify Email</Text>
                </TouchableOpacity>
              </>
            )}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
  container: {
    flex: 1,
    alignItems: 'center',
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F2050',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#0000005C',
    // marginBottom: height * 0.02,
    marginTop: height * 0.02,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginTop: height * 0.03,
    // marginBottom: height * 0.02,
    backgroundColor: '#fff',
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
  button: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#0F2050',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: height * 0.09,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    height: height * 0.19,
    width: '100%',
    justifyContent: 'center',
    marginTop: height * 0.06,

    paddingTop: height * 0.08,
  },
  otpBox: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },

  resendText: {
    fontSize: 14,
    color: '#0000005C',
  },
  resendLink: {
    fontWeight: 'bold',
    color: '#407BFF',
  },
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
    height: height * 0.19,
    width: '100%',
    marginTop: height * 0.06,
  },
});

export default OtpVerification;
