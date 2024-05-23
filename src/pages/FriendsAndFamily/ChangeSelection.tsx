import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../common/Colors'
import { translations } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'
import BottomInfoBox from '../../components/BottomInfoBox'
import CardWithRadioBtn from '../../components/CardWithRadioBtn'

export default function ChangeSelection( props ) {
  const strings = translations[ 'f&f' ]
  const common = translations[ 'common' ]

  const [ activeIndex, setActiveIndex ] = useState( 0 )
  return (
    <SafeAreaView style={{
      backgroundColor: Colors.backgroundColor
    }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {props.closeBottomSheet()}}
        style={{
          width: wp( 7 ), height: wp( 7 ), borderRadius: wp( 7/2 ),
          alignSelf: 'flex-end',
          backgroundColor: Colors.CLOSE_ICON_COLOR, alignItems: 'center', justifyContent: 'center',
          marginTop: wp( 3 ), marginRight: wp( 3 )
        }}
      >
        <FontAwesome name="close" color={Colors.white} size={19} style={{
        // marginTop: hp( 0.5 )
        }} />
      </TouchableOpacity>
      <View style={{
        // alignSelf: 'baseline'
      }}>
        <View style={{
          marginLeft: wp( 6 ),
        }}>
          <Text style={styles.modalTitleText}>{'Change'}</Text>
          <Text style={{
            ...styles.modalInfoText,
            marginTop: wp( 1.5 ),
            marginBottom: wp( 3 ),
            marginRight: wp( 13 )
          }}>{'Send the gift to someone else or change the confirmation method'}</Text>
        </View>
        <CardWithRadioBtn
          mainText={'Change contact'}
          subText={'Send the gift to a different person'}
          isSelected={activeIndex === 0}
          setActiveIndex={setActiveIndex}
          index={0}
          geticon={''}
          italicText={''}
          boldText={''}
          changeBgColor={true}
        />
        <CardWithRadioBtn
          mainText={'Change confirmation method'}
          subText={'Use 2FA instead'}
          isSelected={activeIndex === 1}
          setActiveIndex={setActiveIndex}
          index={1}
          geticon={''}
          italicText={''}
          boldText={''}
          changeBgColor={true}
        />
      </View>
      <BottomInfoBox
        // title={common.note}
        infoText={''}
        // backgroundColor={Colors.white}
      />
      <View style={{
        marginTop: 0, marginBottom: hp( 2 )
      }}>
        <TouchableOpacity
          onPress={() => {
            props.onConfirm( activeIndex )
          }}
          style={{
            ...styles.proceedButtonView,
            backgroundColor:Colors.blue,
          }}
        >
          <Text style={styles.proceedButtonText}>{common.proceed}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create( {
  modalTitleText: {
    color: Colors.blue,
    fontSize: RFValue( 18 ),
    fontFamily: Fonts.Regular,
    letterSpacing: 0.54
    // width: wp( 30 ),
  },
  modalInfoText: {
    marginRight: wp( 4 ),
    color: Colors.textColorGrey,
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Regular,
    textAlign: 'justify',
    letterSpacing: 0.6,
    lineHeight: 18
  },
  proceedButtonView: {
    marginLeft: wp( 6 ),
    height: wp( '13%' ),
    width: wp( '30%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 10,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 1,
    shadowOffset: {
      width: 15, height: 15
    },
    marginBottom: hp( '1%' ),
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
} )
