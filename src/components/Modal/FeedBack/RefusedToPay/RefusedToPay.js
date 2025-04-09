import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const RefusedToPayForm = () => {
  const reasonOptions = [
    {label: 'None', value: null},
    {label: 'Customer is on holiday', value: 'Customer is on holiday'},
    {label: 'Death in customer house', value: 'Death in customer house'},
    {label: 'Custom', value: 'Custom'},
  ];
  const [denialReason, setDenialReason] = useState('');
  const [denialDescription, setDenialDescription] = useState('');

  return (
    <View>
      <View style={styles.reasonContainer}>
        <Text style={styles.label}>Reason for Customer Denial :</Text>
        <Dropdown
          style={styles.dropdown}
          data={reasonOptions}
          labelField="label"
          valueField="value"
          value={denialReason}
          onChange={item => setDenialReason(item.value)}
        />
      </View>

      {denialReason === 'Custom' && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description for Denial:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            placeholderTextColor="#0F20504A"
            value={denialDescription}
            onChangeText={setDenialDescription}
            multiline
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
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {fontSize: 12, fontWeight: 'bold', color: '#0F2050'},
  dropdown: {
    flex: 1,
    backgroundColor: '#E3F5F6',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  inputContainer: {marginTop: 10},
  input: {
    backgroundColor: '#E4F8F9',
    borderRadius: 5,
    padding: 8,
    width: '100%',
    fontWeight: '500',
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

export default RefusedToPayForm;
