import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { RFValue } from 'react-native-responsive-fontsize'
import Entypo from 'react-native-vector-icons/Entypo'
import Colors from '../../../../common/Colors'
import AccountShell from '../../../../common/data/models/AccountShell'
import ImageStyles from '../../../../common/Styles/ImageStyles'
import ListStyles from '../../../../common/Styles/ListStyles'
import LabeledBalanceDisplay from '../../../../components/LabeledBalanceDisplay'
import getAvatarForSubAccount from '../../../../utils/accounts/GetAvatarForSubAccountKind'
import usePrimarySubAccountForShell from '../../../../utils/hooks/account-utils/UsePrimarySubAccountForShell'
import useTotalBalanceForAccountShell from '../../../../utils/hooks/state-selectors/accounts/UseTotalBalanceForAccountShell'


export type Props = {
  accountShell: AccountShell;
  showsDisclosureIndicator?: boolean;
};

const DepositSubAccountShellListItem: React.FC<Props> = ( {
  accountShell,
  showsDisclosureIndicator = false,
}: Props ) => {
  const primarySubAccount = usePrimarySubAccountForShell( accountShell )
  const totalBalance = useTotalBalanceForAccountShell( accountShell )

  return (
    <>
      <View style={styles.avatarImage} >
        {getAvatarForSubAccount( primarySubAccount )}
      </View>

      <ListItem.Content style={styles.titleSection}>
        <ListItem.Title
          style={ListStyles.listItemTitle}
          numberOfLines={1}
        >
          {primarySubAccount.customDisplayName || primarySubAccount.defaultTitle}
        </ListItem.Title>

        <LabeledBalanceDisplay
          balance={totalBalance}
          bitcoinUnit={accountShell.unit}
          textColor={Colors.primaryText}
        />

      </ListItem.Content>

      {showsDisclosureIndicator && (
        <Entypo
          name={'dots-three-horizontal'}
          color={Colors.buttonText}
          size={RFValue( 22 )}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create( {
  avatarImage: {
    ...ImageStyles.thumbnailImageMedium,
    marginRight: 14,
    borderRadius: 9999,
  },

  titleSection: {
    flex: 1,
  },
} )

export default DepositSubAccountShellListItem
