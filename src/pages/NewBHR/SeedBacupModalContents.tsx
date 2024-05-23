import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../common/Colors'
import { LocalizationContext } from '../../common/content/LocContext'
import Fonts from '../../common/Fonts'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import BottomInfoBox from '../../components/BottomInfoBox'

export default function SeedBacupModalContents( props ) {
  const { translations } = useContext( LocalizationContext )
  const common = translations[ 'common' ]
  return (
    <View style={{
      ...styles.modalContentContainer,
    }}>
      <View style={{
        height: props.small ? hp( 74 ) : 'auto'
      }}>
        {props.closeModal &&
        <AppBottomSheetTouchableWrapper
          onPress={() => props.closeModal()}
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
        </AppBottomSheetTouchableWrapper>
        }
        <View style={[ styles.successModalHeaderView, {
          marginTop: props.closeModal ? wp( '1%' ) : wp( '8%' )
        } ]}>
          <Text
            style={{
              color: props.headerTextColor
                ? props.headerTextColor
                : Colors.blue,
              fontSize: RFValue( 18 ),
              fontFamily: Fonts.Regular,
              letterSpacing: 0.54
              // width: wp( 65 )
            }}
          >
            {props.title}
            {props.titleNextLine ? '\n' + props.titleNextLine : null}
          </Text>
          {props.info ? (
            <Text
              style={{
                ...styles.modalInfoText,
                marginTop: wp( '1.5%' ),
                // marginRight: wp( 9 )

                color: Colors.lightTextColor,
                fontSize: RFValue( 11 ),
                fontFamily: Fonts.Regular,
                // marginHorizontal: wp( '5%' ),
                // marginTop: 5
              }}
            >
              {props.info}
            </Text>
          ) : null}
          {props.errPoints &&
            <View style={{
              marginTop: hp( 3 ),
              marginBottom: hp( 1 )
            }}>
              {props.errPoints.map( ( item, index ) => {
                return(
                  <View key={index} style={{
                    flexDirection: 'row', paddingVertical: hp( 1 ), alignItems: 'center',
                  }}>
                    <View style={{
                      height: 6, width: 6, borderRadius: 3, backgroundColor: Colors.gray4, alignSelf: 'center'
                    }}/>
                    <Text style={{
                      color: Colors.textColorGrey, opacity: 1, fontSize: RFValue( 12 ), letterSpacing: 0.6, fontFamily: Fonts.Regular, marginLeft: wp( 2 )
                    }}>
                      {item}
                    </Text>
                  </View>
                )
              } )}
            </View>
          }
        </View>
        { props.bottomBoxInfo && <View style={{
          marginTop: hp( '2%' ),
          marginBottom: hp( 1 ),
          marginLeft: wp ( '2%' )
        }}>
          <BottomInfoBox
            title={'Note:'}
            infoText={props.note}
            italicText={''}
            backgroundColor={Colors.white}
          />
        </View>
        }
        {props.otherText ? (
          <View style={styles.successModalAmountView}>
            <Text
              style={{
                ...styles.modalInfoText,
                marginBottom: hp( '1%' ),
                marginTop: 'auto',
                marginRight: wp( 10 )
              }}
            >
              {props.otherText}
            </Text>
          </View>
        ) : null}
        <View
          style={{
            height: hp( '12%' ),
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >

          <LinearGradient colors={[ Colors.blue, Colors.darkBlue ]}
            start={{
              x: 0, y: 0
            }} end={{
              x: 1, y: 0
            }}
            locations={[ 0.2, 1 ]}
            style={{
              ...styles.successModalButtonView,
              backgroundColor: props.buttonColor
                ? props.buttonColor
                : Colors.blue,
            }}
          >
            <AppBottomSheetTouchableWrapper
              onPress={() => props.onPressProceed()}
              delayPressIn={0}
            >
              <Text
                style={{
                  ...styles.proceedButtonText,
                  color: props.buttonTextColor
                    ? props.buttonTextColor
                    : Colors.white,
                }}
              >
                {props.proceedButtonText}
              </Text>
            </AppBottomSheetTouchableWrapper>
          </LinearGradient>

          {props.isIgnoreButton && (
            <AppBottomSheetTouchableWrapper
              onPress={() => props.onPressIgnore()}
              style={{
                height: wp( '12%' ),
                width: wp( '27%' ),
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              delayPressIn={0}
            >
              <Text
                style={{
                  ...styles.proceedButtonText,
                  color: props.buttonTextColor
                    ? props.buttonTextColor
                    : Colors.blue,
                }}
              >
                {props.cancelButtonText ? props.cancelButtonText : common.ignore}
              </Text>
            </AppBottomSheetTouchableWrapper>
          )}

          {props.isBottomImage && (
            <Image
              source={
                props.bottomImage
                  ? props.bottomImage
                  : require( '../../assets/images/icons/noInternet.png' )
              }
              style={props.isBottomImageStyle ? props.isBottomImageStyle : styles.successModalImage}
            />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  modalContentContainer: {
    // height: '100%',
    backgroundColor: Colors.backgroundColor,
  },
  successModalHeaderView: {
    marginRight: wp( '8%' ),
    marginLeft: wp( '8%' ),
    marginTop: wp( '1%' ),
  },
  modalInfoText: {
    color: Colors.textColorGrey,
    opacity: 1,
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Regular,
    letterSpacing: 0.6
  },
  successModalAmountView: {
    justifyContent: 'center',
    marginRight: wp( '12%' ),
    marginLeft: wp( '8%' ),
    marginTop: hp( '2%' ),
  },
  successModalButtonView: {
    height: wp( '12%' ),
    minWidth: wp( '22%' ),
    paddingLeft: wp( '5%' ),
    paddingRight: wp( '5%' ),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginLeft: wp( '8%' ),
    marginBottom:hp ( '3%' ),
  },
  successModalImage: {
    width: wp( '30%' ),
    height: wp( '30%' ),
    marginLeft: 'auto',
    resizeMode: 'stretch',
    marginRight: wp( -3 ),
    marginBottom: wp( -3 ),
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
} )
