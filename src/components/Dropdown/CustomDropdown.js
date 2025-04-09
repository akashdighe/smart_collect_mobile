import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  data,
  selectedValues,
  setSelectedValues,
  placeholder = 'Select',
  multiSelect = false,
  dropdownStyle = {},
  placeholderStyle = {},
  iconStyle = {},
}) => {
  const [searchText, setSearchText] = useState('');

  // Filter data based on search text
  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Get selected labels for displaying inside dropdown
  const getSelectedLabels = () => {
    return (
      data
        .filter(item => selectedValues.includes(item.value))
        .map(item => item.label)
        .join(', ') || placeholder
    );
  };

  return (
    <Dropdown
      style={[styles.dropdown, dropdownStyle]}
      data={filteredData}
      labelField="label"
      valueField="value"
      placeholder={getSelectedLabels()}
      placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
      value={selectedValues}
      search
      searchPlaceholder="Search..."
      onChange={item => {
        if (multiSelect) {
          setSelectedValues(
            prevSelected =>
              prevSelected.includes(item.value)
                ? prevSelected.filter(val => val !== item.value) // Remove if exists
                : [...prevSelected, item.value], // Add if not exists
          );
        } else {
          setSelectedValues(item.value);
        }
      }}
      renderRightIcon={() => (
        <Image
          source={require('../../assets/images/DownArrow.png')}
          style={[styles.icon, iconStyle]}
        />
      )}
      selectedStyle={styles.selectedStyle}
      renderItem={item => (
        <TouchableOpacity
          style={[
            styles.item,
            selectedValues.includes(item.value) && styles.selectedItem, // Highlight selected item
          ]}
          onPress={() => {
            if (multiSelect) {
              setSelectedValues(prevSelected =>
                prevSelected.includes(item.value)
                  ? prevSelected.filter(val => val !== item.value)
                  : [...prevSelected, item.value],
              );
            } else {
              setSelectedValues(item.value);
            }
          }}>
          <Text
            style={[
              styles.itemText,
              selectedValues.includes(item.value) && styles.selectedItemText, // Change text color
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    color: '#999',
  },
  icon: {
    width: 20,
    height: 20,
  },
  selectedStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#E3F5F6', // Highlight selected item
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: '#007BFF', // Change color for selected items
  },
  checkIcon: {
    width: 18,
    height: 18,
    tintColor: '#007BFF', // Customize check icon color
  },
});

export default CustomDropdown;
