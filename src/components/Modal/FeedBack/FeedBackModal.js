import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  Switch,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import CollectionTab from './Collection/Collection';
import ReadyToPay from './ReadyToPay/ReadyToPay';
import RefusedToPayForm from './RefusedToPay/RefusedToPay';
import Other from './Other/Other';
const {width, height} = Dimensions.get('window');

const FeedBackModal = ({visible, onClose}) => {
  const [selectedTab, setSelectedTab] = useState('Collection');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Online');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <Image
                source={require('../../../assets/images/feedbackModal/feedback.png')}
                style={styles.feedbackImage}
              />
              <Text style={styles.headerText}>Feedback </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image
                style={styles.CrossImage}
                source={require('../../../assets/images/feedbackModal/cross.png')}
              />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabWrapper}>
            <View style={styles.tabContainer}>
              {['Collection', 'Ready to Pay', 'Refused to Pay', 'Other'].map(
                tab => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tabButton,
                      selectedTab === tab && styles.activeTab,
                    ]}
                    onPress={() => setSelectedTab(tab)}>
                    <Text
                      style={[
                        styles.tabText,
                        selectedTab === tab && styles.activeTabText,
                      ]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>

          {/* Render Forms Based on Selected Tab */}
          <View style={styles.formContainer}>
            {selectedTab === 'Collection' && (
              <CollectionTab
                selectedPaymentMode={selectedPaymentMode}
                setSelectedPaymentMode={setSelectedPaymentMode}
              />
            )}
            {selectedTab === 'Ready to Pay' && <ReadyToPay />}
            {selectedTab === 'Refused to Pay' && <RefusedToPayForm />}
            {selectedTab === 'Other' && <Other />}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// const CollectionTab = ({overdueAmount = 23000}) => {
//   // State for main date fields
//   const [date, setDate] = useState(null);
//   const [promiseDate, setPromiseDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showPromiseDatePicker, setShowPromiseDatePicker] = useState(false);

//   // Payment and amount states
//   const [paymentMode, setPaymentMode] = useState('Online');
//   const [amount, setAmount] = useState('');

//   // Calculate remaining amount
//   const enteredAmount = parseFloat(amount) || 0;
//   const remainingAmount = overdueAmount - enteredAmount;
//   const showPromiseFields = enteredAmount > 0 && enteredAmount < overdueAmount;

//   const formatDate = date => {
//     if (!date) return 'dd/mm/yy';
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <View style={styles.collectionContainer}>
//       {/* Date Field */}
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>Date :</Text>
//         <TouchableOpacity
//           style={styles.inputDatePicker}
//           onPress={() => setShowDatePicker(true)}>
//           <Text style={styles.dateText}>{formatDate(date)}</Text>
//           <Image
//             source={require('../../../assets/images/feedbackModal/calender.png')}
//             style={{
//               width: width * 0.04,
//               height: height * 0.03,
//               right: 10,
//             }}
//           />
//         </TouchableOpacity>

//         <DatePicker
//           modal
//           open={showDatePicker}
//           date={date || new Date()}
//           mode="date"
//           onConfirm={date => {
//             setShowDatePicker(false);
//             setDate(date);
//           }}
//           onCancel={() => setShowDatePicker(false)}
//         />
//       </View>

//       {/* Amount Field */}
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>Amount :</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           value={amount}
//           onChangeText={setAmount}
//           placeholder="Enter amount"
//           placeholderTextColor="#0F20504A"
//         />
//       </View>

//       {/* Conditional Promise Fields */}
//       {showPromiseFields && (
//         <>
//           <View style={styles.collectionSubContainer}>
//             <Text style={styles.label}>Promise Date :</Text>
//             <TouchableOpacity
//               style={styles.inputDatePicker}
//               onPress={() => setShowPromiseDatePicker(true)}>
//               <Text style={styles.dateText}>{formatDate(promiseDate)}</Text>
//               <Image
//                 source={require('../../../assets/images/feedbackModal/calender.png')}
//                 style={{
//                   width: width * 0.04,
//                   height: height * 0.03,
//                   right: 10,
//                 }}
//               />
//             </TouchableOpacity>

//             <DatePicker
//               modal
//               open={showPromiseDatePicker}
//               date={promiseDate || new Date()}
//               mode="date"
//               onConfirm={date => {
//                 setShowPromiseDatePicker(false);
//                 setPromiseDate(date);
//               }}
//               onCancel={() => setShowPromiseDatePicker(false)}
//             />
//           </View>

//           <View style={styles.collectionSubContainer}>
//             <Text style={styles.label}>Promise Amount :</Text>
//             <Text style={styles.input}>{remainingAmount.toFixed(2)}</Text>
//           </View>
//         </>
//       )}

//       {/* Payment Mode */}
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>Mode of payment :</Text>
//         <View style={styles.paymentModeContainer}>
//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMode === 'Online' && styles.activePaymentOption,
//             ]}
//             onPress={() => setPaymentMode('Online')}>
//             <Text
//               style={[
//                 styles.paymentText,
//                 paymentMode === 'Online' && styles.activePaymentText,
//               ]}>
//               Online
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMode === 'Offline' && styles.activePaymentOption,
//             ]}
//             onPress={() => setPaymentMode('Offline')}>
//             <Text
//               style={[
//                 styles.paymentText,
//                 paymentMode === 'Offline' && styles.activePaymentText,
//               ]}>
//               Offline
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Conditional Button */}
//       <TouchableOpacity style={styles.createPromiseButton}>
//         <Text style={styles.createPromiseText}>
//           {showPromiseFields ? 'Create Promise' : 'Submit'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const ReadyToPay = () => {
//   const [date, setDate] = useState(null); // State to store selected date
//   const [showDatePicker, setShowDatePicker] = useState(false); // Controls modal visibility
//   const [paymentMode, setPaymentMode] = useState('Online');

//   const formatDate = date => {
//     console.log(promiseDate);
//     if (!date) return '';
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <View style={styles.collectionContainer}>
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>Date :</Text>

//         {/* Date Input with Touchable */}
//         <TouchableOpacity
//           style={styles.inputDatePicker}
//           onPress={() => setShowDatePicker(true)}>
//           <Text style={styles.dateText}>
//             {date ? formatDate(date) : 'dd/mm/yy'}
//           </Text>

//           {/* Calendar Icon */}
//           <Image
//             source={require('../../../assets/images/feedbackModal/calender.png')}
//             style={{
//               width: width * 0.04,
//               height: height * 0.03,
//               right: 10,
//             }}
//           />
//         </TouchableOpacity>

//         {/* Date Picker Component */}
//         <DatePicker
//           modal
//           open={showDatePicker}
//           date={date || new Date()}
//           mode="date"
//           onConfirm={selectedDate => {
//             setShowDatePicker(false);
//             setDate(selectedDate);
//           }}
//           onCancel={() => setShowDatePicker(false)}
//         />
//       </View>
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>Amount :</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter amount"
//           placeholderTextColor="#0F20504A"></TextInput>
//       </View>

//       {/* Mode of Payment */}
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>Mode of payment :</Text>
//         <View style={styles.paymentModeContainer}>
//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMode === 'Online' && styles.activePaymentOption,
//             ]}
//             onPress={() => setPaymentMode('Online')}>
//             <Text
//               style={[
//                 styles.paymentText,
//                 paymentMode === 'Online' && styles.activePaymentText,
//               ]}>
//               Online
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMode === 'Offline' && styles.activePaymentOption,
//             ]}
//             onPress={() => setPaymentMode('Offline')}>
//             <Text
//               style={[
//                 styles.paymentText,
//                 paymentMode === 'Offline' && styles.activePaymentText,
//               ]}>
//               Offline
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Create Submit Button */}
//       <TouchableOpacity style={styles.createPromiseButton}>
//         <Text style={styles.createPromiseText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const RefusedToPayForm = () => {
//   const reasonOptions = [
//     {label: 'None', value: null},
//     {label: 'Customer is on holiday', value: 'Customer is on holiday'},
//     {label: 'Death in customer house', value: 'Death in customer house'},
//     {label: 'Custom', value: 'Custom'},
//   ];
//   const [denialReason, setDenialReason] = useState(''); // Default or fetched value
//   const [denialDescription, setDenialDescription] = useState('');
//   return (
//     <View>
//       {/* Denial Reason Dropdown */}
//       <View style={styles.resonContainer}>
//         <Text style={styles.label}>Reason for Customer Denial :</Text>
//         <Dropdown
//           style={styles.dropdown}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           data={reasonOptions}
//           labelField="label"
//           valueField="value"
//           value={denialReason}
//           onChange={item => setDenialReason(item.value)}
//         />
//       </View>

//       {/* Conditionally Render Description Input */}
//       {denialReason === 'Custom' && (
//         <View style={styles.collectionSubContainer}>
//           <Text style={styles.label}>Description for Denial:</Text>
//           <TextInput
//             style={styles.inputReadyToPay}
//             placeholder="Enter description"
//             placeholderTextColor="#0F20504A"
//             value={denialDescription}
//             onChangeText={setDenialDescription}
//             multiline
//           />
//         </View>
//       )}
//       {/* Create Submit Button */}
//       <TouchableOpacity style={styles.createPromiseButton}>
//         <Text style={styles.createPromiseText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const Other = () => {
//   const [customerNotReply, setCustomerNotReply] = useState(false);
//   const [wrongNumber, setWrongNumber] = useState(false);
//   const [alternateNo, setAlternateNo] = useState('');
//   const [remark, setRemark] = useState('');

//   return (
//     <View>
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>Customer Not Reply :</Text>
//         <Switch
//           trackColor={{false: '#D3D3D3', true: '#B8C9F9'}}
//           thumbColor={customerNotReply ? '#0F2050' : '#f4f4f4'}
//           onValueChange={setCustomerNotReply}
//           value={customerNotReply}
//           style={styles.switch}
//         />
//       </View>
//       <View style={styles.collectionSubContainer}>
//         <Text style={styles.label}>wrong Number :</Text>
//         <Switch
//           trackColor={{false: '#D3D3D3', true: '#B8C9F9'}}
//           thumbColor={wrongNumber ? '#0F2050' : '#f4f4f4'}
//           onValueChange={setWrongNumber}
//           value={wrongNumber}
//           style={styles.switch}
//         />
//       </View>

//       {wrongNumber && (
//         <View style={styles.collectionSubContainer}>
//           <Text style={styles.label}>Alternate Number :</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             value={alternateNo}
//             onChangeText={setAlternateNo}
//             placeholder="Optional"
//             placeholderTextColor="#407BFF"
//           />
//         </View>
//       )}

//       {customerNotReply && (
//         <View style={styles.collectionSubContainer}>
//           <Text style={styles.label}>Remark : </Text>
//           <TextInput
//             style={styles.input}
//             value={remark}
//             onChangeText={setRemark}
//             placeholder="Enter"
//             placeholderTextColor="#0F20504A"
//           />
//         </View>
//       )}

//       {/* Create Submit Button */}
//       <TouchableOpacity style={styles.createPromiseButton}>
//         <Text style={styles.createPromiseText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    borderRadius: 10,
    position: 'relative',
    backgroundColor: '#0F2050',
  },

  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -30}],
  },

  headerText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  feedbackImage: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  CrossImage: {
    width: 25,
    height: 25,
  },
  //   tab css
  tabWrapper: {
    borderBottomWidth: 2,
    borderRadius: 9,
    borderColor: '#D3D3D3',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'transparent',
    zIndex: 1,
  },

  activeTab: {
    borderColor: '#002F6C',
    zIndex: 2,
  },

  tabText: {
    fontSize: width * 0.031,
    color: '#00000094',
  },

  activeTabText: {
    color: '#002F6C',
    fontWeight: 'bold',
  },

  //   collection
  // formContainer: {padding: 10},
  // collectionContainer: {marginTop: 10},

  // collectionSubContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: height * 0.017,
  //   alignItems: 'center',
  //   gap: 4,
  // },

  // label: {
  //   fontSize: 12,
  //   fontWeight: 'bold',
  //   marginBottom: 5,
  //   color: '#0F2050',
  // },
  // inputDatePicker: {
  //   backgroundColor: '#E4F8F9',
  //   borderRadius: 5,
  //   padding: 8,
  //   width: '60%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // input: {
  //   backgroundColor: '#E4F8F9',
  //   borderRadius: 5,
  //   padding: 8,
  //   color: '#0F2050',
  //   width: '60%',
  //   fontWeight: 'bold',
  //   fontSize: 13,
  // },
  // dateText: {
  //   color: '#0F2050',
  //   fontWeight: 'bold',
  //   fontSize: 13,
  // },
  // paymentModeContainer: {
  //   flexDirection: 'row',
  //   backgroundColor: '#E6F3F8',
  //   padding: 3,
  //   borderRadius: 5,
  //   width: '50%',
  // },
  // paymentOption: {
  //   flex: 1,
  //   padding: 5,
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },
  // activePaymentOption: {
  //   backgroundColor: '#0F2050',
  // },
  // paymentText: {
  //   fontSize: 12,
  //   color: '#0F20504A',
  // },
  // activePaymentText: {
  //   color: '#FFFFFF',
  // },
  // createPromiseButton: {
  //   backgroundColor: '#0F2050',
  //   paddingVertical: 8,
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   marginTop: 20,
  //   width: '60%', // Set width to 50%
  //   alignSelf: 'center',
  // },
  // createPromiseText: {
  //   fontSize: 12,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },

  // // Ready to pay css

  // placeholderStyle: {
  //   color: '#B1B3B8', // Change this to any color you want
  //   fontSize: width * 0.035,
  // },
  // icon: {
  //   width: width * 0.03,
  //   height: width * 0.04,
  //   color: 'black',
  // },

  // resonContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginVertical: 10,
  //   gap: 5,
  // },
  // dropdown: {
  //   flex: 1,
  //   backgroundColor: '#E3F5F6',
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   height: width * 0.1,
  //   width: width * 0.5, // Fixed width for dropdown
  // },
  // inputReadyToPay: {
  //   backgroundColor: '#E4F8F9',
  //   borderRadius: 5,
  //   padding: 8,
  //   color: '#0F2050',
  //   width: '60%',
  //   fontWeight: '500',
  //   fontSize: 13,
  // },
  // selectedTextStyle: {
  //   color: 'black', // Change this to the desired color
  //   fontSize: width * 0.035,
  //   color: '#0F2050',
  //   width: '60%',
  //   fontWeight: '500',
  // },

  // other componet css
  switch: {
    transform: [{scaleX: 1.2}, {scaleY: 1}],
  },
});

export default FeedBackModal;
