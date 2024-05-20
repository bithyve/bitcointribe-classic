import React, { useContext } from 'react'
import {
  StyleSheet, Text, View
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import { LocalizationContext } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'

export default function ServerErrorModal( props ) {
  const { translations } = useContext( LocalizationContext )
  const common = translations[ 'common' ]
  return ( <View style={{
    ...styles.modalContentContainer
  }}>
    <View style={styles.successModalHeaderView}>
      <Text style={{
        color: props.headerTextColor ? props.headerTextColor : Colors.blue,
        fontSize: RFValue( 18 ),
        fontFamily: Fonts.Medium,
      }}>{props.title}{props.titleNextLine ? '\n' + props.titleNextLine : null}</Text>
      {props.info ? <Text style={{
        ...styles.modalInfoText, marginTop: wp( '1.5%' )
      }}>{props.info}</Text> : null}
    </View>
    <View style={styles.successModalAmountView}>
      {props.note ?<Text style={{
        ...styles.modalInfoText, marginBottom: hp( '1%' ), marginTop: 'auto'
      }}>{props.note}{props.noteNextLine ? '\n' + props.noteNextLine : null}</Text> : null }
    </View>
    {props.otherText ?
      <View style={styles.successModalAmountView}>
        <Text style={{
          ...styles.modalInfoText, marginBottom: hp( '1%' ), marginTop: 'auto'
        }}>{props.otherText}</Text>
      </View> : null}
    <View style={{
      height: hp( '18%' ), flexDirection: 'row', marginTop: 'auto', alignItems: 'center',
    }} >
      <AppBottomSheetTouchableWrapper
        onPress={() => props.onPressProceed()}
        style={{
          ...styles.successModalButtonView, shadowColor: props.buttonShadowColor ? props. buttonShadowColor : Colors.shadowBlue,
          backgroundColor: props.buttonColor ? props. buttonColor : Colors.blue,
        }}
      >
        <Text style={{
          ...styles.proceedButtonText, color: props.buttonTextColor ? props.buttonTextColor : Colors.white
        }}>{props.proceedButtonText}</Text>
      </AppBottomSheetTouchableWrapper>
      {props.isIgnoreButton &&
                    <AppBottomSheetTouchableWrapper
                      onPress={() => props.onPressIgnore()}
                      style={{
                        height: wp( '13%' ), width: wp( '35%' ), justifyContent: 'center', alignItems: 'center',
                      }}
                    >
                      <Text style={{
                        ...styles.proceedButtonText, color: props.buttonTextColor ? props.buttonTextColor : Colors.blue,
                      }}>{props.cancelButtonText ? props.cancelButtonText : common.ignore}</Text>
                    </AppBottomSheetTouchableWrapper>
      }
    </View>
  </View>
  )
}

const styles = StyleSheet.create( {
  modalContentContainer: {
    // height: '100%',
    backgroundColor: Colors.white,
  },
  successModalHeaderView: {
    marginRight: wp( '8%' ),
    marginLeft: wp( '8%' ),
    marginTop: wp( '8%' ),
  },
  modalInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Medium,
  },
  successModalAmountView: {
    justifyContent: 'center',
    marginRight: wp( '8%' ),
    marginLeft: wp( '8%' ),
    marginTop:hp( '2%' )
  },
  successModalButtonView: {
    height: wp( '13%' ),
    width: wp( '35%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginLeft: wp( '8%' ),
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium
  },
} )
