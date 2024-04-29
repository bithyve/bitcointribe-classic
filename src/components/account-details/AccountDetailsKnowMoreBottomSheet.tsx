import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../common/Colors'
import ServiceAccountKind from '../../common/data/enums/ServiceAccountKind'
import SubAccountKind from '../../common/data/enums/SubAccountKind'
import ExternalServiceSubAccountInfo from '../../common/data/models/SubAccountInfo/ExternalServiceSubAccountInfo'
import BottomSheetHandle from '../bottom-sheets/BottomSheetHandle'
import CheckingAccountKnowMoreSheetContents from '../know-more-sheets/CheckingAccountKnowMoreSheetContents'
import DonationAccountKnowMoreSheetContents from '../know-more-sheets/DonationAccountKnowMoreSheetContents'
import SavingsAccountKnowMoreSheetContents from '../know-more-sheets/SavingsAccountKnowMoreSheetContents'
import ServiceAccountKnowMoreSheetContents from '../know-more-sheets/ServiceAccountKnowMoreSheetContents'
import TestAccountKnowMoreSheetContents from '../know-more-sheets/TestAccountKnowMoreSheetContents'

export type Props = {
  primarySubAccount: any;
  accountKind: SubAccountKind;
  onClose: () => void;
};

export const KnowMoreBottomSheetHandle: React.FC = () => {
  return <BottomSheetHandle containerStyle={styles.handleContainer} />
}

const AccountDetailsKnowMoreBottomSheet: React.FC<Props> = ( {
  primarySubAccount,
  accountKind,
  onClose,
}: Props ) => {

  const serviceBottomSheet = ( serviceKind ) => {
    return (
      <ServiceAccountKnowMoreSheetContents
        serviceKind={serviceKind}
        titleClicked={onClose}
        containerStyle={styles.contentContainer}
      />
    )
  }
  const BottomSheetContent = () => {
    switch ( accountKind ) {
        case SubAccountKind.TEST_ACCOUNT:
          return (
            <TestAccountKnowMoreSheetContents
              titleClicked={onClose}
              containerStyle={styles.contentContainer}
            />
          )
        case SubAccountKind.SECURE_ACCOUNT:
          return (
            <SavingsAccountKnowMoreSheetContents
              titleClicked={onClose}
              containerStyle={styles.contentContainer}
            />
          )
        case SubAccountKind.REGULAR_ACCOUNT:
          return (
            <CheckingAccountKnowMoreSheetContents
              titleClicked={onClose}
              containerStyle={styles.contentContainer}
            />
          )
        case SubAccountKind.DONATION_ACCOUNT:
          return (
            <DonationAccountKnowMoreSheetContents
              titleClicked={onClose}
              containerStyle={styles.contentContainer}
            />
          )

        case SubAccountKind.SERVICE:
          switch( ( primarySubAccount as ExternalServiceSubAccountInfo ).serviceAccountKind ){
              case ( ServiceAccountKind.RAMP ):
                return serviceBottomSheet( ServiceAccountKind.RAMP )
              case ( ServiceAccountKind.SWAN ):
                return serviceBottomSheet( ServiceAccountKind.SWAN )
          }


        default:
          return null
    }
  }

  return (
    <View style={styles.rootContainer}>
      <BottomSheetContent />
    </View>
  )
}

const styles = StyleSheet.create( {
  rootContainer: {
    backgroundColor: Colors.blue,
    // flex: 1,
  },

  handleContainer: {
    backgroundColor: Colors.blue,
  },

  contentContainer: {
    // shadowOpacity: 0,
  },
} )

export default AccountDetailsKnowMoreBottomSheet
