import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux'
import ReceiveIcon from '../../assets/images/svgs/icon_receive.svg'
import SentIcon from '../../assets/images/svgs/icon_sent.svg'
import Colors from '../../common/Colors'
import { LocalizationContext } from '../../common/content/LocContext'
import NetworkKind from '../../common/data/enums/NetworkKind'
import Fonts from '../../common/Fonts'
import CommonStyles from '../../common/Styles/Styles'
import RGBServices from '../../services/RGBServices'
import { fetchExchangeRates, fetchFeeRates } from '../../store/actions/accounts'
import useAccountsState from '../../utils/hooks/state-selectors/accounts/UseAccountsState'
import SendAndReceiveButtonsFooter from '../Accounts/Details/SendAndReceiveButtonsFooter'
import DetailsCard from './DetailsCard'

const numberWithCommas = ( x ) => {
  return x ? x.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' ) : ''
}
export default function RGB121TxDetail(props) {
  const dispatch = useDispatch()
  const { translations } = useContext(LocalizationContext)
  const accountStr = translations['accounts']
  const asset = props.route.params.asset
  const accountsState = useAccountsState()
  const { averageTxFees, exchangeRates } = accountsState
  const [loading, setLoading] = useState(true)
  const [transactionData, setTransactionData] = useState([])

  useEffect(() => {
    getTransfers()
  }, [])

  const getTransfers = async () => {
    try {
      setLoading(true)
      const txns = await RGBServices.getRgbAssetTransactions(asset.assetId)
      setLoading(false)
      if (txns) {
        setTransactionData(txns)
      } else {
        props.navigation.goBack()
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      props.navigation.goBack()
    }
  }


  useEffect(() => {
    if (
      !averageTxFees ||
      !Object.keys(averageTxFees).length ||
      !exchangeRates ||
      !Object.keys(exchangeRates).length
    ) {
      dispatch(fetchFeeRates())
      dispatch(fetchExchangeRates())
    }
  }, [])

  const renderFooter = () => {
    return (
      <View style={styles.viewSectionContainer}>
        <View style={styles.footerSection}>
          <SendAndReceiveButtonsFooter
            onSendPressed={() => {
              props.navigation.navigate('RGBSendWithQR', {
                asset
              })
            }}
            onReceivePressed={() => {
              props.navigation.navigate('RGBReceive', {
              })
            }}
            averageTxFees={averageTxFees}
            network={
              NetworkKind.MAINNET
            }
            isTestAccount={false}
          />
        </View>
      </View>
    )
  }

  const onItemClick = (item) => {
    props.navigation.navigate('AssetTransferDetails', {
      item, asset
    })
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onItemClick(item)}>
        <View style={styles.iconWrapper}>
          {(item && item.kind.toUpperCase() === 'RECEIVE_BLIND' || item.kind.toUpperCase() === 'ISSUANCE' || item.kind.toUpperCase() === 'RECEIVE_WITNESS') ? <ReceiveIcon/> : <SentIcon/>}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.status}</Text>
          <Text style={styles.itemDesc}>{moment.unix(item.createdAt).format('DD/MM/YY • hh:MMa')}</Text>
        </View>
        <View style={styles.currencyContainer}>
          <Text
            numberOfLines={1}
            style={[styles.amountText, {
              color: (item && item.kind.toUpperCase() === 'RECEIVE_BLIND' || item.kind.toUpperCase() === 'ISSUANCE' || item.kind.toUpperCase() === 'RECEIVE_WITNESS') ? Colors.grayShade : Colors.lightBlue
            }]}
          >
            {numberWithCommas(item.amount)}
          </Text>
        </View>
        <View style={{
          width: '5%'
        }}>
          <Ionicons
            name="chevron-forward"
            color={Colors.Black}
            size={15}
            style={styles.forwardIcon}
          />
        </View>
      </TouchableOpacity>
    )
  }
  const onViewMorePressed = () => {
    props.navigation.navigate('RGBTransactionsList', {
      asset: asset
    })
  }

  return (
    <SafeAreaView style={{
      flex: 1, backgroundColor: Colors.backgroundColor
    }}>
      <StatusBar backgroundColor={Colors.backgroundColor} barStyle="dark-content" />
      <ScrollView
        scrollEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getTransfers}
          />
        }
      >
        <View style={CommonStyles.headerContainer}>
          <TouchableOpacity
            style={CommonStyles.headerLeftIconContainer}
            onPress={() => {
              props.navigation.goBack()
            }}
          >
            <View style={CommonStyles.headerLeftIconInnerContainer}>
              <FontAwesome
                name="long-arrow-left"
                color={Colors.homepageButtonColor}
                size={17}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          paddingHorizontal: 20, marginBottom: 20,
        }}>
          <DetailsCard
            onKnowMorePressed={() => {
              props.navigation.navigate('AssetMetaData', {
                asset
              })
            }}
            showKnowMore
            knowMoreText={'View details'}
            onSettingsPressed={() => { }}
            balance={asset.balance.settled}
            cardColor={'#B7B7B7'}
            title={asset.name}
            description={asset.description}
            assetId={asset.assetId}
            renderIcon={() => <View style={[styles.labelContainer, {
              backgroundColor: '#B7B7B7'
            }]}>
              <Image style={{
                height: 50, width: 50, borderRadius: 30
              }} source={{
                uri: Platform.select( {
                  android: `file://${asset.dataPaths[ 0 ].filePath}`,
                  ios: asset.dataPaths[ 0 ].filePath.replace('/private','')
                } )
              }}/>
            </View>}
            isBitcoin={false}
          />
        </View>


        <View style={{
          flex: 1,
        }}>
          <View style={styles.viewMoreLinkRow}>
            <Text style={styles.headerDateText}>{accountStr.RecentTransactions}</Text>
            <TouchableOpacity
              onPress={onViewMorePressed}
            >
              <View style={styles.viewMoreWrapper}>
                <Text style={styles.headerTouchableText}>
                  View All
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={transactionData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          {renderFooter()}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerTitleText: {
    color: Colors.blue,
    fontSize: RFValue(20),
    fontFamily: Fonts.Regular,
    textAlign: 'center'
  },
  headerSubtitle: {
    color: 'gray',
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
    textAlign: 'center'
  },
  viewSectionContainer: {
    marginBottom: 10,
  },
  footerSection: {
    paddingVertical: 15,
  },
  amountTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue(17),
    color: 'gray'
  },
  amountText: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue(14.5),
    marginRight: wp(1),
    // alignItems: 'baseline',
    // width:wp( 25 )
    color: Colors.textColorGrey
  },
  bitcoinImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  currencyImage: {
    width: wp(3),
    height: wp(4),
    resizeMode: 'contain',
    marginTop: wp(0.3)
  },
  unitTextStyles: {
    fontSize: RFValue(11),
    color: Colors.currencyGray,
    fontFamily: Fonts.Regular,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconWrapper: {
    width: '11%'
  },
  itemImage: {
    width: 35, height: 35, borderRadius: 20, backgroundColor: 'gray'
  },
  textContainer: {
    flex: 1, 
  },
  itemTitle: {
    fontFamily: Fonts.Regular, fontSize: RFValue(13), textTransform: 'capitalize'
  },
  itemDesc: {
    color: Colors.textColorGrey, fontFamily: Fonts.Regular,
    fontSize: RFValue(10), marginTop: 2
  },
  balanceText: {
    fontSize: 18, fontFamily: Fonts.Medium,
    color: Colors.textColorGrey, marginTop: 40,
    alignSelf: 'center'
  },
  assetText: {
    fontSize: 14, fontFamily: Fonts.Regular,
    color: Colors.textColorGrey,
    marginTop: 20,
    marginStart: 40,
    marginBottom: -20
  },
  viewMoreLinkRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  headerDateText: {
    color: Colors.textColorGrey,
    fontSize: RFValue(13),
    fontFamily: Fonts.Regular,
  },

  headerTouchableText: {
    color: Colors.white,
    fontSize: RFValue(12),
    fontFamily: Fonts.Medium,
  },
  viewMoreWrapper: {
    height: 26,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 5,
    backgroundColor: Colors.blue
  },
  labelContainer: {
    backgroundColor: Colors.THEAM_TEXT_COLOR,
    borderRadius: 20,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    fontSize: RFValue(9),
    fontFamily: Fonts.SemiBold,
    color: Colors.white,
  },
  forwardIcon: {
    alignSelf: 'center',
  },
})
