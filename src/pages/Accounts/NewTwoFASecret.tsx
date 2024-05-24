import React, { useState } from 'react'
import {
  ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import Fonts from '../../common/Fonts'
import NavStyles from '../../common/Styles/NavStyles'
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper'
import CopyThisText from '../../components/CopyThisText'
import QRCode from '../../components/QRCode'

const NewTwoFASecret = props => {
  const [ receivingAddress, setReceivingAddress ] = useState( '2N6ubBgDNrs9NnJGSF3gQBUwM7SwQtGQs2g' )
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <View style={{
        ...NavStyles.modalContainer, backgroundColor: Colors.white, marginTop: 10
      }}>
        <ScrollView style={styles.qrModalScrollView}>
          <View style={NavStyles.modalHeaderTitleView}>
            <View
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center'
              }}
            >
              <Text style={NavStyles.modalHeaderTitleText}>
                2FA Key
              </Text>
              <AppBottomSheetTouchableWrapper
                style={{
                  backgroundColor: Colors.blue,
                  marginLeft: 'auto',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                onPress={() => {
                  props.navigation.pop( 1 )
                }}
              >
                <Text
                  onPress={() => {
                    props.navigation.pop( 1 )
                  }}
                  style={{
                    color: Colors.white,
                    fontSize: RFValue( 12 ),
                    marginLeft: 'auto',
                  }}
                >
                  Done
                </Text>
              </AppBottomSheetTouchableWrapper>
            </View>
          </View>

          <View style={NavStyles.modalContentView}>
            {!receivingAddress ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <QRCode title="Two FA key" value={receivingAddress} size={hp( '27%' )} />
            )}
            {receivingAddress ? <CopyThisText text={receivingAddress} /> : null}
          </View>

          <View
            style={{
              marginBottom: 30,
              padding: 20,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 10,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: Colors.blue,
                fontSize: RFValue( 13 ),
                marginBottom: 2,
                fontFamily: Fonts.Regular,
              }}
            >
              Scan in Authenticator
            </Text>
          </View>

        </ScrollView>
        <View
          style={{
            marginTop: 'auto',
            marginBottom: hp( '0.2%' ),
          }}
        >
          {/* Note view */}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create( {
  loader: {
    height: hp( '27%' ), justifyContent: 'center'
  },
  modalContainer: {
    height: '100%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: hp( '2%' ),
    elevation: 10,
    shadowOpacity: 10,
    shadowOffset: {
      width: 0, height: 2
    },
  },
  qrModalScrollView: {
    display: 'flex',
    backgroundColor: Colors.white,
  }
} )

export default NewTwoFASecret
