import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../../common/Colors'
import { translations } from '../../../common/content/LocContext'
import BitcoinUnit from '../../../common/data/enums/BitcoinUnit'
import { Satoshis } from '../../../common/data/typealiases/UnitAliases'
import Fonts from '../../../common/Fonts'
import ListStyles from '../../../common/Styles/ListStyles'
import Invoice from '../../../models/Invoice'
import useFormattedAmountText from '../../../utils/hooks/formatting/UseFormattedAmountText'
import useFormattedUnitText from '../../../utils/hooks/formatting/UseFormattedUnitText'
import InvoiceItem from './InvoiceItem'

const styles = StyleSheet.create( {
  rootContainer: {
    marginBottom: 5,
  },

  viewMoreLinkRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  headerDateText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Regular,
  },

  headerTouchableText: {
    color: Colors.white,
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Italic,
  },

  activityIndicator: {
    paddingVertical: 40,
    color: 'grey'
  },
  viewMoreWrapper: {
    height: 22,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 5
  }
} )

type Props = {
    availableBalance: Satoshis,
    bitcoinUnit: BitcoinUnit,
    onViewMorePressed: () => void;
    invoices: Invoice [],
    accountShellId: string,
    loading: boolean,
    navigation: any
}

const TransactionsList: React.FC<Props> = ( {
  availableBalance,
  bitcoinUnit,
  onViewMorePressed,
  invoices,
  accountShellId,
  loading,
  navigation
}:Props ) => {
  const strings  = translations[ 'accounts' ]

  const formattedBalanceText = useFormattedAmountText( availableBalance )

  const formattedUnitText =  useFormattedUnitText( {
    bitcoinUnit
  } )

  const renderItem = ( { item: invoice, } : {
    item: Invoice;
  } ) => {
    return (
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate( 'InvoiceDetailsScreen', {
            invoice
          } )
        }}
      >
        <InvoiceItem
          navigation = {navigation}
          invoice={invoice}/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={{
        ...ListStyles.listItemTitle, marginBottom: 12,  color: Colors.mango
      }}>
        {`${strings.availableToSpend}: ${formattedBalanceText} ${formattedUnitText}`}
      </Text>

      <View style={styles.viewMoreLinkRow}>
        <Text style={styles.headerDateText}>{strings.RecentInvoices}</Text>

        <TouchableOpacity
          onPress={onViewMorePressed}
        >
          <LinearGradient
            start={{
              x: 0, y: 0
            }} end={{
              x: 1, y: 0
            }}
            colors={[ Colors.skyBlue, Colors.darkBlue ]}
            style={styles.viewMoreWrapper}
          >
            <Text style={styles.headerTouchableText}>
              {strings.ViewMore}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {
        loading ? <ActivityIndicator color={Colors.blue} size="large" style={styles.activityIndicator}/>:
          <FlatList
            data={invoices}
            //keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
      }

    </View>
  )
}

export default TransactionsList

