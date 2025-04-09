import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CircularProgress from '../../components/Chart/CircularProgress';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track active card index

  const data = [
    {id: '1', period: 'For Day', amount: '12,000', count: '64'},
    {id: '2', period: 'For Week', amount: '12,000', count: '64'},
    {id: '3', period: 'For Month', amount: '12,000', count: '64'},
  ];

  const dataCard = [
    {
      id: '1',
      title: 'Ready to Pay',
      totalCustomer: 290,
      TotalAmount: ' 36,000',
      amountCollected: ' 29,000',
      chartPersentage: 89,
      image: require('../../assets/images/PayIcon.png'),
    },
    {
      id: '2',
      title: 'EMI Collection',
      totalCustomer: 90,
      TotalAmount: ' 6000',
      amountCollected: ' 9000',
      chartPersentage: 79,
      image: require('../../assets/images/PayIcon.png'),
    },
  ];
  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  // this below is sample you can use  call api using api services
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await api.get('/profile'); // ✅ Automatically includes token
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error('Profile Fetch Error:', error.response?.data || error.message);
  //       Alert.alert('Error', 'Failed to load profile');
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  return (
    <View style={styles.container}>
      {/* Dashboard Title */}
      <Text style={styles.dashboardTitle}>Dashboard</Text>

      {/* new card pagination  */}
      <View style={styles.containerCard}>
        <FlatList
          ref={flatListRef}
          data={dataCard}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onScroll={handleScroll}
          renderItem={({item}) => (
            // <View>
            <View style={styles.readyToPayCard}>
              <View style={styles.cardTopContainer}>
                <View style={styles.readyToPayLeftContainer}>
                  <View>
                    <Image style={styles.payImage} source={item.image}></Image>
                  </View>
                  <View>
                    <Text style={styles.readyText}>Ready To Pay</Text>

                    <View style={styles.totalCustomers}>
                      <Text>Total Customer :</Text>
                      <Text style={styles.blueText}>{item.totalCustomer}</Text>
                    </View>
                  </View>
                </View>

                {/* <View>
                  <View style={styles.circleProgress}>
                    <Text style={styles.progressText}>
                      {item.chartPersentage}
                    </Text>
                  </View>
                </View> */}
                {/* Dynamic Circular Progress */}
                <CircularProgress progress={item.chartPersentage} />
              </View>

              <View style={styles.amountContainer}>
                <View style={styles.amountSubContainer}>
                  <Text style={styles.amountText}>Rs{item.TotalAmount}</Text>
                  <Text style={styles.subText}>Total Amount</Text>
                </View>
                <View style={styles.amountSubContainer}>
                  <Text style={styles.amountText}>
                    Rs{item.amountCollected}
                  </Text>
                  <Text style={styles.subText}>Amount Collected</Text>
                </View>
              </View>
            </View>
            // </View>
          )}
        />
        <View style={styles.pagination}>
          {dataCard.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      {/* EMI Collection List */}
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.listCard}>
              <Image
                source={require('../../assets/images/ReadyPayOfficeIcon.png')}
                style={styles.listIcon}
              />
              <View>
                <View style={styles.peroid}>
                  <Text style={styles.peroidText}>{item.period}</Text>
                </View>
                <View style={styles.emiSubContainer}>
                  <View>
                    <Text style={styles.emiSubCount}>{item.amount}</Text>
                    <Text style={styles.emiText}>Ready to Pay</Text>
                  </View>
                  <View>
                    <Text style={styles.emiSubCount}>{item.count}</Text>
                    <Text style={styles.emiText}>EMI Collection</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 10,
  },
  dashboardTitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#407BFF',
    paddingBottom: 10,
    fontFamily: 'Kanit',
  },
  //  card css
  containerCard: {alignItems: 'center'},

  readyToPayCard: {
    backgroundColor: '#E8F6FA',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 2,
    borderTopColor: '#001F4D',
    width: width * 0.93,
    // elevation: 1,
  },
  readyToPayLeftContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  readyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2050',
  },
  cardTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  totalCustomers: {
    fontSize: 13,
    color: '#0F2050B8',
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  blueText: {
    color: '#407BFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  amountSubContainer: {
    justifyContent: 'center',
  },

  circleProgress: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#0F2050',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F2050',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#407BFF',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#0F2050B8',
    textAlign: 'center',
  },
  payImage: {
    width: 20,
    height: 20,
  },
  containerCard: {alignItems: 'center'},

  pagination: {flexDirection: 'row', marginTop: 10},
  dot: {
    width: 30,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 8,
  },
  activeDot: {backgroundColor: '#0F2050', width: 32, height: 4}, // Active dot color & size
  // horizontal line
  horizontalLine: {
    width: '100%', // Full width
    height: 1, // Thin line
    backgroundColor: '#E3E3E3', // Light gray color
    marginVertical: width * 0.05, // Space above and below
  },

  // flatlist css
  listCard: {
    backgroundColor: '#E3F5F6',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0.1, 0.25)',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  emiSubContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  emiSubCount: {
    textAlign: 'center',
    color: '#0F2050',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'Kanit',
  },

  listIcon: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  peroid: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  peroidText: {
    color: '#0F2050',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 26,
  },
  emiText: {
    fontFamily: 'Kanit', // Ensure Kanit is linked properly
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18, // Closest to 17.94px
    textAlign: 'left',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#407BFF',
  },

  // new style for card
});

export default HomeScreen;
