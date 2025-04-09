import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Other = () => {
  const [customerNotReply, setCustomerNotReply] = useState(false);
  const [wrongNumber, setWrongNumber] = useState(false);
  const [alternateNo, setAlternateNo] = useState('');
  const [remark, setRemark] = useState('');

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Customer Not Reply :</Text>
        <Switch
          trackColor={{false: '#D3D3D3', true: '#B8C9F9'}}
          thumbColor={customerNotReply ? '#0F2050' : '#f4f4f4'}
          onValueChange={setCustomerNotReply}
          value={customerNotReply}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Wrong Number :</Text>
        <Switch
          trackColor={{false: '#D3D3D3', true: '#B8C9F9'}}
          thumbColor={wrongNumber ? '#0F2050' : '#f4f4f4'}
          onValueChange={setWrongNumber}
          value={wrongNumber}
        />
      </View>

      {wrongNumber && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Alternate Number :</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={alternateNo}
            onChangeText={setAlternateNo}
            placeholder="Optional"
            placeholderTextColor="#407BFF"
          />
        </View>
      )}

      {customerNotReply && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Remark :</Text>
          <TextInput
            style={styles.input}
            value={remark}
            onChangeText={setRemark}
            placeholder="Enter"
            placeholderTextColor="#0F20504A"
          />
        </View>
      )}

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {fontSize: 12, fontWeight: 'bold', color: '#0F2050'},
  inputContainer: {marginTop: 10},
  input: {
    backgroundColor: '#E4F8F9',
    borderRadius: 5,
    padding: 8,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: '#0F2050',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  submitText: {fontSize: 12, fontWeight: 'bold', color: 'white'},
});

export default Other;
