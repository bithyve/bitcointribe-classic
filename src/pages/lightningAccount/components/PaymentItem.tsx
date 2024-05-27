import moment from 'moment'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Lightning from '../../../assets/images/accIcons/lightning.svg'
import Colors from '../../../common/Colors'
import BitcoinUnit from '../../../common/data/enums/BitcoinUnit'
import CurrencyKind from '../../../common/data/enums/CurrencyKind'
import Fonts from '../../../common/Fonts'
import LabeledBalanceDisplay from '../../../components/LabeledBalanceDisplay'
import Payment from '../../../models/Payment'
import useCurrencyKind from '../../../utils/hooks/state-selectors/UseCurrencyKind'

const styles = StyleSheet.create( {
  transactionKindIcon: {
    marginRight: 14,
  },

  titleSection: {
    flex: 1, width: widthPercentageToDP( '35%' )
  },
  titleText: {
    color: Colors.greyTextColor,
    fontSize: RFValue( 12 ),
    marginBottom: 2,
    // fontWeight: 'bold',
    fontFamily: Fonts.Regular,
  },

  subtitleText: {
    fontSize: RFValue( 11 ),
    letterSpacing: 0.3,
    color: Colors.gray2
  },
  amountSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 16,
  },
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    marginRight: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 45/2,
    borderColor: Colors.white,
    borderWidth: 2,
    elevation: 10,
    shadowColor: Colors.borderColor,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 10, height: 10
    },
  },
  amountText: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 17 ),
  },
  bitcoinImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

} )


type Props = {
    payment?: Payment,
  bitcoinUnit?: BitcoinUnit;
  currencyKind?: CurrencyKind | null;
}

const PaymentItem = ( {
  payment,
  bitcoinUnit = BitcoinUnit.SATS,
  currencyKind = useCurrencyKind(),
}: Props ) => {

  const transactionKindIconColor = useMemo( () => {
    return Colors.green
  }, [ payment ] )

  const amountTextStyle = useMemo( () => {
    return {
      ...styles.amountText,
      color: Colors.red,
    }
  }, [ payment ] )


  return (
    <>
      <ListItem containerStyle={{
        backgroundColor: Colors.backgroundColor, paddingHorizontal: widthPercentageToDP( 5 )
      }} pad={1}>

        <View style={styles.containerImg}>
          <Lightning/>
        </View>
        <ListItem.Content style={styles.titleSection}>
          <LabeledBalanceDisplay
            balance={parseInt( payment.value )}
            bitcoinUnit={bitcoinUnit}
            currencyKind={currencyKind}
            amountTextStyle={amountTextStyle}
            currencyImageStyle={styles.bitcoinImage}
            iconSpacing={2}
            bitcoinIconColor="gray"
            isTestAccount={false}
          />
          <ListItem.Subtitle style={styles.subtitleText}>
            {`${moment.unix( parseInt( payment.creation_date ) ).format( 'DD/MM/YY • hh:MMa' )}`}
          </ListItem.Subtitle>
        </ListItem.Content>

        <ListItem.Content style={styles.amountSection}>
          <ListItem.Chevron size={22}/>
        </ListItem.Content>
      </ListItem>

      <View style={{
        borderBottomWidth: 1, borderColor: Colors.gray1, marginHorizontal: widthPercentageToDP( 4 )
      }} />
    </>
  )
}

export default PaymentItem

