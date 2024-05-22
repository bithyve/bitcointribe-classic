import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
import Colors from '../../common/Colors'
import { ContactRecipientDescribing } from '../../common/data/models/interfaces/RecipientDescribing'
import Fonts from '../../common/Fonts'
import ButtonBlue from '../../components/ButtonBlue'
import HeaderTitle from '../../components/HeaderTitle'
import { editTrustedContact } from '../../store/actions/trustedContacts'

export type Props = {
  closeModal: ( name: string ) => void;
  contact: ContactRecipientDescribing
};



const EditContactScreen: React.FC<Props> = ( { closeModal, contact }: Props ) => {
  const [ name, setName ] = useState( '' )
  const [ inputStyle, setInputStyle ] = useState( styles.inputBox )
  const dispatch = useDispatch()

  const editContact = useCallback( async () => {
    dispatch( editTrustedContact( {
      channelKey: contact.channelKey,
      contactName: name,
    } ) )
    closeModal( name )
  }, [ contact, name ] )



  return (
    <View style={{
      // flex: 1
      backgroundColor: Colors.bgColor,
      justifyContent: 'space-between',
    }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => closeModal( '' )}
        style={{
          width: wp( 7 ), height: wp( 7 ), borderRadius: wp( 7 / 2 ),
          alignSelf: 'flex-end',
          backgroundColor: Colors.CLOSE_ICON_COLOR, alignItems: 'center', justifyContent: 'center',
          marginTop: wp( 3 ), marginRight: wp( 3 )
        }}
      >
        <FontAwesome name="close" color={Colors.white} size={19} style={{
          // marginTop: hp( 0.5 )
        }} />
      </TouchableOpacity>
      <HeaderTitle
        firstLineTitle={'Edit Name'}
        secondLineTitle={'Enter a name to store against the contact'}
        infoTextNormal={''}
        infoTextBold={''}
        infoTextNormal1={''}
        step={''}
      />
      <View style={{
        ...inputStyle
      }}>
        <TextInput
          style={{
            height: 50,
            // margin: 20,
            paddingHorizontal: 15,
            fontSize: RFValue( 13 ),
            letterSpacing: 0.26,
            fontFamily: Fonts.Regular,
          }}
          placeholder={'Enter Name'}
          placeholderTextColor={Colors.borderColor}
          value={name}
          textContentType='none'
          autoCompleteType='off'
          autoCorrect={false}
          autoCapitalize="none"
          onKeyPress={event => {
          // setBackspace( event )
          }}
          onFocus={() => setInputStyle( styles.inputBoxFocused )}
          onBlur={() => setInputStyle( styles.inputBox )}
          onChangeText={( text ) => {
            setName( text )
          }}
          onSubmitEditing={
            () => {
            // contact.displayedName = name
            }
          }
        />
      </View>
      <View style={{
        alignItems: 'flex-start', marginLeft: wp( 5 ), marginVertical: hp( 3 )
      }}>
        <ButtonBlue
          buttonText="Save Changes"
          handleButtonPress={() => {editContact()}}
          buttonDisable={name.length === 0}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  inputBox: {
    borderRadius: 10,
    marginHorizontal: wp( 5 ),
    backgroundColor: Colors.white,
    marginBottom: hp( 2 )
  },
  inputBoxFocused: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: wp( 5 ),
    marginBottom: hp( 2 )
  },
} )

export default EditContactScreen
