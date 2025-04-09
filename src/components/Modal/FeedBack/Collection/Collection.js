import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const {width, height} = Dimensions.get('window');

const CollectionTab = ({overdueAmount = 23000}) => {
  const [date, setDate] = useState(null);
  const [promiseDate, setPromiseDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPromiseDatePicker, setShowPromiseDatePicker] = useState(false);
  const [paymentMode, setPaymentMode] = useState('Online');
  const [amount, setAmount] = useState('');

  const enteredAmount = parseFloat(amount) || 0;
  const remainingAmount = overdueAmount - enteredAmount;
  const showPromiseFields = enteredAmount > 0 && enteredAmount < overdueAmount;

  const formatDate = date => {
    if (!date) return 'dd/mm/yy';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.collectionContainer}>
      <View style={styles.collectionSubContainer}>
        <Text style={styles.label}>Date :</Text>
        <TouchableOpacity
          style={styles.inputDatePicker}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
          <Image
            source={require('../../../../assets/images/feedbackModal/calender.png')}
            style={styles.calendarIcon}
          />
        </TouchableOpacity>

        <DatePicker
          modal
          open={showDatePicker}
          date={date || new Date()}
          mode="date"
          onConfirm={date => {
            setShowDatePicker(false);
            setDate(date);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      </View>

      <View style={styles.collectionSubContainer}>
        <Text style={styles.label}>Amount :</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          placeholderTextColor="#0F20504A"
        />
      </View>

      {showPromiseFields && (
        <>
          <View style={styles.collectionSubContainer}>
            <Text style={styles.label}>Promise Date :</Text>
            <TouchableOpacity
              style={styles.inputDatePicker}
              onPress={() => setShowPromiseDatePicker(true)}>
              <Text style={styles.dateText}>{formatDate(promiseDate)}</Text>
              <Image
                source={require('../../../../assets/images/feedbackModal/calender.png')}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>

            <DatePicker
              modal
              open={showPromiseDatePicker}
              date={promiseDate || new Date()}
              mode="date"
              onConfirm={date => {
                setShowPromiseDatePicker(false);
                setPromiseDate(date);
              }}
              onCancel={() => setShowPromiseDatePicker(false)}
            />
          </View>

          <View style={styles.collectionSubContainer}>
            <Text style={styles.label}>Promise Amount :</Text>
            <Text style={styles.input}>{remainingAmount.toFixed(2)}</Text>
          </View>
        </>
      )}

      <View style={styles.collectionSubContainer}>
        <Text style={styles.label}>Mode of payment :</Text>
        <View style={styles.paymentModeContainer}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMode === 'Online' && styles.activePaymentOption,
            ]}
            onPress={() => setPaymentMode('Online')}>
            <Text
              style={[
                styles.paymentText,
                paymentMode === 'Online' && styles.activePaymentText,
              ]}>
              Online
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMode === 'Offline' && styles.activePaymentOption,
            ]}
            onPress={() => setPaymentMode('Offline')}>
            <Text
              style={[
                styles.paymentText,
                paymentMode === 'Offline' && styles.activePaymentText,
              ]}>
              Offline
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.createPromiseButton}>
        <Text style={styles.createPromiseText}>
          {showPromiseFields ? 'Create Promise' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  collectionContainer: {marginTop: 10},
  collectionSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.017,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F2050',
  },
  inputDatePicker: {
    backgroundColor: '#E4F8F9',
    borderRadius: 5,
    padding: 8,
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#E4F8F9',
    borderRadius: 5,
    padding: 8,
    color: '#0F2050',
    width: '60%',
    fontWeight: 'bold',
    fontSize: 13,
  },
  dateText: {
    color: '#0F2050',
    fontWeight: 'bold',
    fontSize: 13,
  },
  paymentModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6F3F8',
    padding: 3,
    borderRadius: 5,
    width: '50%',
  },
  paymentOption: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  activePaymentOption: {
    backgroundColor: '#0F2050',
  },
  paymentText: {
    fontSize: 12,
    color: '#0F20504A',
  },
  activePaymentText: {
    color: '#FFFFFF',
  },
  createPromiseButton: {
    backgroundColor: '#0F2050',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  createPromiseText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  calendarIcon: {
    width: width * 0.04,
    height: height * 0.03,
    right: 10,
  },
});

export default CollectionTab;
