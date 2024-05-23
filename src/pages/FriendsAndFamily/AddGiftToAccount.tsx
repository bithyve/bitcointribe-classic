import idx from 'idx'
import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { AccountType } from '../../bitcoin/utilities/Interface'
import Colors from '../../common/Colors'
import BitcoinUnit from '../../common/data/enums/BitcoinUnit'
import AccountShell from '../../common/data/models/AccountShell'
import Fonts from '../../common/Fonts'
import { giftAccepted, refreshAccountShells } from '../../store/actions/accounts'
import { associateGift } from '../../store/actions/trustedContacts'
import usePrimarySubAccountForShell from '../../utils/hooks/account-utils/UsePrimarySubAccountForShell'
import useSpendableBalanceForAccountShell from '../../utils/hooks/account-utils/UseSpendableBalanceForAccountShell'
import useFormattedUnitText from '../../utils/hooks/formatting/UseFormattedUnitText'
import AccountSelected from './AccountSelected'
import AccountSelection from './AccountSelection'
import GiftAddedModal from './GiftAddedModal'
// import useAccountShellFromNavigation from '../../utils/hooks/state-selectors/accounts/UseAccountShellFromNavigation'

export type Props = {
  navigation: any;
  giftAmount: string | number;
  giftId: string
  getTheme: () => void;
  onCancel: () => void;
  closeModal: () => void;
};


export default function AddGiftToAccount( { getTheme, navigation, giftAmount, giftId, onCancel, closeModal }: Props ) {
  const dispatch = useDispatch()
  const [ showAccounts, setShowAccounts ] = useState( true )
  const [ confirmAccount, setConfirmAccount ] = useState( false )
  const [ giftAddedModal, setGiftAddedModel ] = useState( false )
  const [ showLoader, setLoader ] = useState( false )
  const [ accType, setAccType ] = useState( AccountType.CHECKING_ACCOUNT )
  const [ accId, setAccId ] = useState( '' )
  const accountShells: AccountShell[] = useSelector( ( state ) => idx( state, ( _ ) => _.accounts.accountShells ) )
  const sendingAccount = accountShells.find( shell => shell.primarySubAccount.type == accType && shell.primarySubAccount.instanceNumber === 0 )

  const sourcePrimarySubAccount = usePrimarySubAccountForShell( sendingAccount )
  const spendableBalance = useSpendableBalanceForAccountShell( sendingAccount )

  const formattedUnitText = useFormattedUnitText( {
    bitcoinUnit: BitcoinUnit.SATS,
  } )

  const sourceAccountHeadlineText = useMemo( () => {
    const title = sourcePrimarySubAccount.customDisplayName || sourcePrimarySubAccount.defaultTitle

    return `${title}`
    // return `${title} (${strings.availableToSpend}: ${formattedAvailableBalanceAmountText} ${formattedUnitText})`

  }, [ sourcePrimarySubAccount ] )

  useEffect( () => {
    setAccId( sourcePrimarySubAccount.id )
    // return `${title} (${strings.availableToSpend}: ${formattedAvailableBalanceAmountText} ${formattedUnitText})`

  }, [ sourcePrimarySubAccount ] )

  const renderButton = ( text ) => {
    return (
      <TouchableOpacity
        onPress={async() => {
          if ( text === 'Confirm' ) {
            // closeModal()
            setLoader( true )
            await dispatch( associateGift( giftId, accId ) )
            await dispatch( refreshAccountShells( [ sendingAccount ], {
              hardRefresh: true
            } ) )
            setTimeout( () => {
              setLoader( false )
              setConfirmAccount( false )
              setGiftAddedModel( true )
            }, 2000 )
          } else if ( text === 'View Account' ) {
            setGiftAddedModel( false )
            closeModal()
            setTimeout(()=>{
              dispatch( giftAccepted( '' ) )
              navigation.popToTop()
              navigation.navigate( 'AccountDetails', {
                accountShellID: sourcePrimarySubAccount.accountShellID,
              } )
              dispatch( refreshAccountShells( [ sendingAccount ], {
                hardRefresh: true
              } ) )
            },100)
          }
        }}
        style={{
          ...styles.buttonView,
          backgroundColor: Colors.blue,
        }}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    )
  }

  const numberWithCommas = ( x ) => {
    return x ? x.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' ) : ''
  }

  return (
    <>
      {showAccounts &&
        <View style={styles.modalContentContainer}>
          <AccountSelection
            onClose={() => {
              setShowAccounts( false )
              onCancel()
            }}
            onChangeType={( type, selectedAccId ) => {
              // closeModal()
              setAccType( type )
              setAccId( selectedAccId )
              setShowAccounts( false )
              setConfirmAccount( true )
              // dispatch( associateGift( giftId, accId ) )
            }}
          />
        </View>
      }
      {confirmAccount &&
        <View style={styles.modalContentContainer}>
          <AccountSelected
            getTheme={getTheme}
            onAccountChange={() => { setConfirmAccount( false ); setShowAccounts( true ) }}
            sourcePrimarySubAccount={sourcePrimarySubAccount}
            sourceAccountHeadlineText={sourceAccountHeadlineText}
            spendableBalance={spendableBalance}
            formattedUnitText={formattedUnitText}
            renderButton={renderButton}
            giftAmount={giftAmount}
            onCancel={onCancel}
          />
          {showLoader &&
            <ActivityIndicator style={{
              zIndex:999, position:'absolute', left:0, right:0, bottom:0, top:0
            }} color={Colors.black} size={'large'} />
          }
        </View>
      }
      {giftAddedModal &&
        <View style={styles.modalContentContainer}>
          <GiftAddedModal
            getTheme={getTheme}
            sourcePrimarySubAccount={sourcePrimarySubAccount}
            sourceAccountHeadlineText={sourceAccountHeadlineText}
            renderButton={renderButton}
            formattedUnitText={formattedUnitText}
            spendableBalance={spendableBalance}
            accountShellID={sourcePrimarySubAccount.accountShellID}
            onCancel={onCancel}
            navigation={navigation}
          />
        </View>
      }
    </>
  )
}
const styles = StyleSheet.create( {
  box: {
    flex: 1,
    height: 60,
    backgroundColor: Colors.shadowBlue,
    marginTop: hp( '3%' ),
    marginLeft: wp( '4%' ),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
  buttonView: {
    height: wp( '14%' ),
    width: wp( '35%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.blue,
  },
  modalContentContainer: {
    backgroundColor: Colors.bgColor,
    paddingBottom: hp( 4 ),
  },
} )



