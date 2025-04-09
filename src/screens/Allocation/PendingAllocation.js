import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const PendingAllocation = () => {
  const navigation = useNavigation();

  const TableData = [
    {id: 1, name: 'Diksha Agrawal', status: 'Done', pending: '01-09-2024'},
    {id: 2, name: 'Sakshi Patil', status: 'Pending', pending: '01-09-2024'},
    {id: 3, name: 'Aaysha Yadav', status: 'Done', pending: '01-09-2024'},
    {id: 4, name: 'Anuj Petkar', status: 'Done', pending: '01-09-2024'},
    {id: 5, name: 'Saurabh Wagh', status: 'Pending', pending: '01-09-2024'},
    {id: 6, name: 'Diksha Agrawal', status: 'Done', pending: '01-09-2024'},
    {id: 7, name: 'Sakshi Patil', status: 'Pending', pending: '01-09-2024'},
    {id: 8, name: 'Aaysha Yadav', status: 'Done', pending: '01-09-2024'},
    {id: 9, name: 'Anuj Petkar', status: 'Done', pending: '01-09-2024'},
    {id: 10, name: 'Saurabh Wagh', status: 'Pending', pending: '01-09-2024'},
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
        <Text style={styles.backIconText}>Pending Allocation</Text>
      </TouchableOpacity>

      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Sr.No.</Text>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Feedback</Text>
            <Text style={styles.headerText}>Pending Scence</Text>
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
                <Text style={styles.nameCell}>{item.name}</Text>
                <View style={styles.cell}>
                  <Image
                    source={require('../../assets/images/FeedBack.png')}
                    style={styles.feedbackIcon}
                  />
                </View>
                <Text style={styles.cell}>{item.pending}</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5', padding: 10},
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {height: 22, width: 22},
  backIconText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#407BFF',
    marginLeft: 8,
  },

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
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
  },
  pendingStatus: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
  },
  doneStatus: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default PendingAllocation;
