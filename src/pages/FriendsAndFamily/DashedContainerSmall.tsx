import React, { useContext } from 'react'
import {
  Text, View
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import { LocalizationContext } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'

const DashedContainerSmall = ( props ) => {
  const { translations } = useContext( LocalizationContext )
  const strings = translations[ 'f&f' ]

  return(
    <View
      style={{
        width: '90%',
        backgroundColor: Colors.gray7,
        alignSelf: 'center',
        borderRadius: wp( 2 ),
        marginTop: hp( 1 ),
        marginBottom: hp( 1 ),
        paddingVertical: wp( 1 ),
        paddingHorizontal: wp( 1 ),
        borderColor: props.theme ? props.theme.color : Colors.darkBlue,
        borderWidth: 0.63,
      }}>
      <View style={{
        backgroundColor: Colors.gray7,
        borderRadius: wp( 2 ),
        paddingVertical: hp( 2 ),
        paddingHorizontal: wp( 4 ),
        borderColor: props.theme ? props.theme.color : Colors.lightBlue,
        borderWidth: 1,
        borderStyle: 'dashed',
        padding: wp( 3 )
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          {props.theme ? props.theme?.avatar : props.image}
          {/* <View> */}
          <Text style={{
            color: Colors.gray4,
            fontSize: RFValue( 12 ),
            fontFamily: Fonts.Regular,
            alignSelf: 'center',
            marginHorizontal: wp( 1 )
          }}>
            Accepted Gift Card
          </Text>
          <Text style={{
            color: Colors.blue,
            fontSize: RFValue( 24 ),
            fontFamily: Fonts.Regular,
            alignSelf: 'center',
            marginLeft: 'auto',
            width: 'auto'
          }}>
            {props.amt}
            <Text style={{
              color: Colors.lightTextColor,
              fontSize: RFValue( 10 ),
              fontFamily: Fonts.Regular
            }}> {props.currency}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default DashedContainerSmall

