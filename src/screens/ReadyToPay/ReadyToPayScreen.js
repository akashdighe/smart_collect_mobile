import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FeedBackModal from '../../components/Modal/FeedBack/FeedBackModal';
import {Dropdown} from 'react-native-element-dropdown';
import CustomDropdown from '../../components/Dropdown/CustomDropdown';
const {width, height} = Dimensions.get('window');

const ReadyToPayScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('day');
  const [activeIndex, setActiveIndex] = useState(0); // Track active card index
  const [modalVisible, setModalVisible] = useState(false);

  const flatListRef = useRef(null);

  const data = [
    {
      id: '1',
      title: 'Total Customer',
      loans: 45,
      amount: 'Rs. 45,000',
      image: require('../../assets/images/TotalCustomerImage.png'),
    },
    {
      id: '2',
      title: 'Pending',
      loans: 45,
      amount: 'Rs. 45,000',
      image: require('../../assets/images/PendingPayment.png'),
    },
    {
      id: '3',
      title: 'Completed',
      loans: 45,
      amount: 'Rs. 45,000',
      image: require('../../assets/images/CompletedPayment.png'),
    },
  ];

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };
  // for dropdown and button
  const [selectedName, setSelectedName] = useState([]);
  const [selectedID, setSelectedID] = useState([]);

  const nameOptions = [
    {label: 'Diksha Agrawal', value: 'diksha'},
    {label: 'Sakshi Patil', value: 'sakshi'},
  ];

  const idOptions = [
    {label: 'ID 001', value: 'id001'},
    {label: 'ID 002', value: 'id002'},
  ];

  // tbale
  const TableData = [
    {id: 1, name: 'Diksha Agrawal', status: 'Done'},
    {id: 2, name: 'Sakshi Patil', status: 'Pending'},
    {id: 3, name: 'Aaysha Yadav', status: 'Done'},
    {id: 4, name: 'Anuj Petkar', status: 'Done'},
    {id: 5, name: 'Saurabh Wagh', status: 'Pending'},
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonContainer}>
        <Image
          style={styles.backIcon}
          source={require('../../assets/images/BackIcon.png')}
        />
        <Text style={styles.backIconText}>Ready to Pay</Text>
      </TouchableOpacity>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        {['day', 'week', 'month'].map((tab, index) => (
          <View key={tab} style={styles.tabWrapper}>
            {selectedTab === tab && <View style={styles.tabLeftArrow} />}
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}>
                {tab === 'day'
                  ? 'For Day'
                  : tab === 'week'
                  ? 'For Week'
                  : 'For Month'}
              </Text>
            </TouchableOpacity>
            {selectedTab === tab && <View style={styles.tabRightArrow} />}
          </View>
        ))}
      </View>

      {/* Customer Summary Card */}
      <View style={styles.containerCard}>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onScroll={handleScroll}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Image
                  source={require('../../assets/images/InformationIcon.png')}
                  style={styles.infoImage}
                />
              </View>
              <View style={styles.cardContent}>
                <View style={styles.status}>
                  <Text style={styles.statsNumber}>{item.loans}</Text>
                  <Text style={styles.statsLabel}>#Loans</Text>
                </View>
                <View style={styles.status}>
                  <Text style={styles.statsAmount}>{item.amount}</Text>
                  <Text style={styles.statsLabel}>Amount</Text>
                </View>
                <Image source={item.image} style={styles.illustration} />
              </View>
            </View>
          )}
        />
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
      <View style={styles.horizontalLine} />
      {/* //for Buttons and Dropdowns  */}
      <View style={styles.containerDropdowns}>
        <CustomDropdown
          data={nameOptions}
          selectedValues={selectedName}
          setSelectedValues={setSelectedName}
          placeholder="Select Name"
          multiSelect={true}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.icon}
        />

        {/* Disbursement ID Dropdown */}

        <CustomDropdown
          data={idOptions}
          selectedValues={selectedID}
          setSelectedValues={setSelectedID}
          placeholder="Disbursement ID"
          multiSelect={true}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.icon}
        />

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* table  */}

      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Sr.No.</Text>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Feedback</Text>
            <View style={styles.statusHeader}>
              <Text style={styles.headerText}>Status</Text>
              <Image
                source={require('../../assets/images/TableStatusFilter.png')}
                style={styles.sortIcon}
              />
            </View>
          </View>

          {/* Table Body */}
          <FlatList
            data={TableData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <View
                style={[styles.row, index % 2 === 1 ? styles.evenRow : null]}>
                <Text style={styles.cell}>{item.id}.</Text>
                <Text
                  style={styles.nameCell}
                  onPress={() =>
                    navigation.push('ReadyToPayFeedBack', {userName: item.name})
                  }>
                  {item.name}
                </Text>
                <View style={styles.cell}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true), console.log(modalVisible);
                    }}>
                    <Image
                      source={require('../../assets/images/FeedBack.png')}
                      style={styles.feedbackIcon}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    styles.cell,
                    item.status === 'Pending'
                      ? styles.pendingStatus
                      : styles.doneStatus,
                  ]}>
                  {item.status}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
      <FeedBackModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

// **Updated Styles**
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5', padding: 10},
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {height: 20, width: 20},
  backIconText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#407BFF',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  tabWrapper: {position: 'relative'},
  tabButton: {paddingVertical: 6, paddingHorizontal: 6},
  activeTabButton: {
    backgroundColor: '#001F4D',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 6,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabText: {color: '#A0A0A0', fontSize: 14, fontWeight: '500'},
  activeTabText: {color: '#FFFFFF'},
  tabLeftArrow: {
    position: 'absolute',
    left: -10,
    top: 27.1,
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: '#001F4D',
  },
  tabRightArrow: {
    position: 'absolute',
    right: -10,
    top: 27.1,
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: '#001F4D',
  },

  // Card styles
  containerCard: {alignItems: 'center', marginTop: 20},
  card: {
    backgroundColor: '#E8F6FA',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 10,
    borderTopColor: '#001F4D',
    borderTopWidth: 3,
    paddingBottom: 0,
    width: width * 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoImage: {height: height * 0.03, width: width * 0.05},
  cardTitle: {fontSize: 16, fontWeight: '500', color: '#001F4D'},
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {marginTop: 20},
  statsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F4D',
    textAlign: 'center',
  },
  statsAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F4D',
    textAlign: 'center',
  },
  statsLabel: {fontSize: 12, color: '#7A7A7A', textAlign: 'center'},
  illustration: {
    width: width * 0.34, // Responsive width
    aspectRatio: 1.5, // Adjust this based on your image's natural ratio
    resizeMode: 'contain',
  },

  // Pagination styles
  pagination: {flexDirection: 'row', marginTop: 10},
  dot: {
    width: 30,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeDot: {backgroundColor: '#0F2050', width: 32, height: 4}, // Active dot color & size
  // horizontal line
  horizontalLine: {
    width: '100%', // Full width
    height: 1, // Thin line
    backgroundColor: '#E3E3E3', // Light gray color
    marginVertical: width * 0.05, // Space above and below
  },

  // for dropdown and aply button
  containerDropdowns: {
    flexDirection: 'row',
    gap: width * 0.03,
  },
  dropdown: {
    flex: 1,
    backgroundColor: '#E3F5F6',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    height: width * 0.1,
    color: '#B1B3B8',
    elevation: 5,
  },
  placeholderStyle: {
    color: '#B1B3B8', // Change this to any color you want
    fontSize: width * 0.035,
  },
  icon: {
    width: width * 0.03,
    height: width * 0.04,
  },
  applyButton: {
    backgroundColor: '#001F4D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },

  // table css
  tableContainer: {
    flex: 1,
    marginTop: width * 0.04,
    marginBottom: width * 0.04,
    backgroundColor: '#f8f9fa',
  },
  table: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#0F2050',
    padding: width * 0.03,
    borderRadius: width * 0.02,
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    color: 'white',
    fontWeight: 500,
    textAlign: 'center',
  },
  sortIcon: {
    width: width * 0.04, // Adjust size as needed
    height: height * 0.03,
    resizeMode: 'contain',
  },
  statusHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    padding: width * 0.03,
  },
  evenRow: {
    backgroundColor: '#E3F5F6',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },

  feedbackIcon: {
    width: 20, // Adjust size as needed
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  nameCell: {
    flex: 1,
    textAlign: 'center',
    color: '#407BFF',
    fontWeight: 'bold',
  },
  pendingStatus: {
    color: 'red',
    fontWeight: 'bold',
  },
  doneStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default ReadyToPayScreen;
