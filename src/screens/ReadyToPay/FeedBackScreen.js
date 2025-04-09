import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import FeedBackModal from '../../components/Modal/FeedBack/FeedBackModal';
import Svg, {Polygon} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

const FeedBackScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/images/BackIcon.png')}
          />
          <Text style={styles.backIconText}>Ready to Pay</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <View style={styles.headerleftContainer}>
              <View>
                <Image
                  source={require('../../assets/images/feedbackScreen/Profile.png')}
                  style={styles.Profile}
                />
              </View>
              <View>
                <Text style={styles.customerName}>Sunita Datta Gaikwad</Text>
                <Text style={styles.customerID}>Customer ID: 234000033</Text>
              </View>
            </View>
            <View style={styles.headerRightContainer}>
              <Image
                source={require('../../assets/images/feedbackScreen/call.png')}
                style={styles.Profile}
              />
              <Image
                source={require('../../assets/images/feedbackScreen/Msg.png')}
                style={styles.Profile}
              />
            </View>
          </View>
          <View style={styles.NumberOfAttemptContainer}>
            <View style={styles.attemptsContainer}>
              <Text style={styles.attemptsLabel}>No. of Attempts: </Text>
              <Text style={styles.attemptsValue}>2</Text>
            </View>
            <View styles={styles.statusTotalContainer}>
              <View style={styles.statusContainerOfDot}>
                <View style={[styles.statusDot, styles.green]} />
                <View style={[styles.statusDot, styles.green]} />
                <View style={[styles.statusDot, styles.red]} />
                <View style={[styles.statusDot, styles.gray]} />
                <View style={[styles.statusDot, styles.gray]} />
              </View>
              <View style={styles.statusContainer}>
                <Image
                  source={require('../../assets/images/feedbackScreen/Whatsapp.png')}
                  style={styles.headerRightImage}
                />
                <Image
                  source={require('../../assets/images/feedbackScreen/CallColor.png')}
                  style={styles.headerRightImage}
                />
                <Image
                  source={require('../../assets/images/feedbackScreen/Headset.png')}
                  style={styles.headerRightImage}
                />
                <Image
                  source={require('../../assets/images/feedbackScreen/HeadsetWithPhone.png')}
                  style={styles.headerRightImage}
                />
                <View style={[styles.statusDot, styles.white]} />
              </View>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailsSubContainer}>
              <View style={styles.distributionTextContainer}>
                <Image
                  source={require('../../assets/images/feedbackScreen/DisbursementID.png')}
                  style={styles.detailContainerImage}
                />
                <Text style={styles.detailLabel}>Disbursement ID:</Text>
              </View>
              <Text style={styles.detailValue}>042-090909090</Text>
            </View>
            <View style={styles.detailsSubContainer}>
              <View style={styles.distributionTextContainer}>
                <Image
                  source={require('../../assets/images/feedbackScreen/DisbursementID.png')}
                  style={styles.detailContainerImage}
                />
                <Text style={styles.detailLabel}>Branch Name:</Text>
              </View>
              <Text style={styles.detailValue}>SSK Gandhi Nagar</Text>
            </View>
            <View style={styles.detailsSubContainer}>
              <View style={styles.distributionTextContainer}>
                <Image
                  source={require('../../assets/images/feedbackScreen/DisbursementID.png')}
                  style={styles.detailContainerImage}
                />
                <Text style={styles.detailLabel}>Loan Type:</Text>
              </View>
              <Text style={styles.detailValue}>Pavanraje Renewal 18k</Text>
            </View>
          </View>

          <View style={styles.horizontalLine} />
          <View>
            <View style={styles.dpdSubContainer}>
              <Text style={styles.dpdLabel}>DPD</Text>
              <Text style={styles.dpdValue}>192</Text>
            </View>
            <View style={styles.dpdSubContainer}>
              <Text style={styles.overdueLabel}>Overdue Amount</Text>
              <Text style={styles.overdueValue}>Rs.23,000</Text>
            </View>
            <View style={styles.dpdSubContainer}>
              <Text style={styles.promiseLabel}>Promise Amount</Text>
              <Text style={styles.promiseValue}>Rs.23,000</Text>
            </View>
          </View>
          <View style={styles.horizontalLine} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailsSubContainer}>
              <View style={styles.distributionTextContainer}>
                <Image
                  source={require('../../assets/images/feedbackScreen/PromiseDate.png')}
                  style={styles.detailContainerImage}
                />
                <Text style={styles.promiseDateLabel}>Promise Date:</Text>
              </View>
              <Text style={styles.promiseDateValue}>09-01-2025</Text>
            </View>
            <View style={styles.detailsSubContainer}>
              <View style={styles.distributionTextContainer}>
                <Image
                  source={require('../../assets/images/feedbackScreen/PromiseDate.png')}
                  style={styles.detailContainerImage}
                />
                <Text style={styles.promiseDateLabel}>
                  Latest BM Feedback Date:
                </Text>
              </View>
              <Text style={styles.promiseDateValue}>02-01-2025</Text>
            </View>
          </View>
          <View>
            <Text style={styles.viewText}>View</Text>
          </View>

          <View style={styles.FeedbackContainer}>
            <Svg width="250" height="50">
              {/* Rotated Polygon Shape */}
              <Polygon
                points="0,50 250,50 230,10 20,10"
                fill="white"
                stroke="#E0E0E0"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </Svg>

            {/* Text inside Polygon */}
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.text}>Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FeedBackModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Avoid content getting cut off
  },
  container: {
    flex: 1,
    padding: 10,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {height: 22, width: 22},
  backIconText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#407BFF',
    marginLeft: 8,
  },

  card: {
    backgroundColor: 'rgba(8, 188, 228, 0.14)', // Correct transparency format
    padding: width * 0.034,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: height * 0.02,
  },

  headerContainer: {
    backgroundColor: '#112D64',
    padding: 10,
    borderRadius: 100,
    marginTop: -35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Profile: {
    width: width * 0.043,
    height: height * 0.02,
  },
  headerleftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.03,
    paddingLeft: width * 0.01,
  },
  customerName: {
    color: '#fff', // Ensure visibility
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerID: {
    color: '#fff', // Ensure visibility
    fontSize: 12,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.03,
    paddingRight: width * 0.01,
  },
  headerRightImage: {
    width: width * 0.03,
    height: height * 0.0153,
  },
  NumberOfAttemptContainer: {
    padding: width * 0.012,
    marginTop: height * 0.03,
    marginBottom: height * 0.017,
    borderWidth: 1, // Border thickness
    borderColor: '#AAA8A8', // Border color
    borderRadius: 15, // Optional: rounded corners
    backgroundColor: 'white', // Optional: background color
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attemptsContainer: {
    flexDirection: 'row',
    paddingLeft: width * 0.04,
  },
  attemptsLabel: {
    color: '#2979FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  attemptsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  statusTotalContainer: {
    flexDirection: 'row',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: width * 0.017,
    justifyContent: 'center',
  },
  statusContainerOfDot: {
    flexDirection: 'row',
    gap: width * 0.017,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0F2050',
    borderRadius: 5,
    padding: 5,
    marginBottom: height * 0.007,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // marginRight: 5,
  },
  green: {
    backgroundColor: 'green',
  },
  red: {
    backgroundColor: '#EC3939',
  },
  gray: {
    backgroundColor: '#CACDCA',
  },
  white: {
    backgroundColor: '#ffffff',
  },
  detailsContainer: {
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
  },
  detailsSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  distributionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
  },
  detailContainerImage: {
    width: width * 0.045,
    height: height * 0.025,
  },
  horizontalLine: {
    height: 1, // Thin line
    backgroundColor: '#ACC5FC', // Light gray color
    marginVertical: width * 0.05, // Space above and below
  },
  dpdSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  dpdLabel: {
    color: 'black',
    fontWeight: 400,
    fontSize: 18,
  },
  dpdValue: {
    color: 'black',
    fontFamily: 'karla',
    fontSize: 20,
    fontWeight: 800,
  },
  overdueLabel: {
    color: '#1551D7',
    fontWeight: 500,
    fontSize: 18,
    fontFamily: 'karla',
    textDecorationLine: 'underline',
  },
  overdueValue: {
    color: '#EC3939',
    fontWeight: 800,
    fontFamily: 'karla',
    fontSize: 20,
  },
  promiseLabel: {
    color: 'black',
    fontWeight: 400,
    fontSize: 18,
  },
  promiseValue: {
    color: '#087B1A',
    fontWeight: 800,
    fontFamily: 'karla',
    fontSize: 20,
  },
  promiseDateLabel: {
    color: 'black',
    fontFamily: 'karla',
    fontWeight: 400,
    fontSize: 18,
  },
  promiseDateValue: {
    color: '#0F2050',
    fontWeight: 700,
    fontFamily: 'karla',
    fontSize: 16,
  },
  viewText: {
    color: '#1651D7',
    fontWeight: 400,
    fontFamily: 'karla',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: height * 0.014,
  },

  FeedbackContainer: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: '-13',
  },
  textContainer: {
    position: 'absolute',
    top: 16, // Position text in the polygon
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default FeedBackScreen;
