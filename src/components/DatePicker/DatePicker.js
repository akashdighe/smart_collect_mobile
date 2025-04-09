import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerComponent = () => {
  const [date, setDate] = useState(null); // Stores selected date
  const [open, setOpen] = useState(false); // Controls modal visibility

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      {/* Label */}
      <Text style={{fontSize: 16, marginBottom: 8}}>Date:</Text>

      {/* Touchable Input Field */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          width: 250,
          backgroundColor: '#f0f0f0',
        }}>
        {/* Date Input */}
        <TextInput
          value={date ? date.toDateString() : ''}
          placeholder="dd/mm/yy"
          editable={false}
          style={{flex: 1, fontSize: 16, color: '#0F2050'}}
        />

        {/* Calendar Image */}
        <Image
          source={require('../../assets/images/feedbackModal/calender.png')} // Replace with your image path
          style={{width: 24, height: 24, marginLeft: 10}}
        />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        mode="date"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default DatePickerComponent;
