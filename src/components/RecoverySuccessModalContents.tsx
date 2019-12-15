import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../common/Colors";
import Fonts from "../common/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default function RecoverySuccessModalContents(props) {
  return (
    <View style={{ ...styles.modalContentContainer, height: "100%" }}>
      <View style={{ height: "100%" }}>
        <View style={styles.successModalHeaderView}>
          <Text style={styles.modalTitleText}>
            Account Successfully{"\n"}Restored
          </Text>
          <Text style={{ ...styles.modalInfoText, marginTop: wp("1.5%") }}>
            Congratulations! You can now use{"\n"}your{" "}
            <Text
              style={{
                fontFamily: Fonts.FiraSansMediumItalic,
                fontWeight: "bold",
                fontStyle: "italic"
              }}
            >
              Wallet
            </Text>
          </Text>
        </View>
        <View style={styles.successModalAmountView}>
          <Text style={styles.successModalWalletNameText}>
            {props.walletName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image
              style={styles.successModalAmountImage}
              source={require("../assets/images/icons/icon_bitcoin_gray.png")}
            />
            <Text style={styles.successModalAmountText}>
              {props.walletAmount}
            </Text>
            <Text style={styles.successModalAmountUnitText}>
              {props.walletUnit}
            </Text>
          </View>
        </View>
        <View style={styles.successModalAmountInfoView}>
          <Text style={styles.modalInfoText}>
            Your wallet has been successfully restored
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: "auto" }}>
          <TouchableOpacity
            onPress={() => props.onPressGoToWallet()}
            style={styles.successModalButtonView}
          >
            <Text style={styles.proceedButtonText}>Go to Wallet</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/images/icons/illustration.png")}
            style={styles.successModalImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    height: "100%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderLeftColor: Colors.borderColor,
    borderLeftWidth: 1,
    borderTopRightRadius: 10,
    borderRightColor: Colors.borderColor,
    borderRightWidth: 1,
    borderTopColor: Colors.borderColor,
    borderTopWidth: 1
  },
  successModalHeaderView: {
    marginRight: wp("10%"),
    marginLeft: wp("10%"),
    marginTop: wp("10%"),
    flex: 1.7
  },
  modalTitleText: {
    color: Colors.blue,
    fontSize: RFValue(18, 812),
    fontFamily: Fonts.FiraSansMedium
  },
  modalInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue(12, 812),
    fontFamily: Fonts.FiraSansRegular
  },
  successModalAmountView: {
    flex: 2,
    justifyContent: "center",
    marginRight: wp("10%"),
    marginLeft: wp("10%")
  },
  successModalWalletNameText: {
    color: Colors.black,
    fontSize: RFValue(25, 812),
    fontFamily: Fonts.FiraSansRegular
  },
  successModalAmountImage: {
    width: wp("3%"),
    height: wp("3%"),
    marginRight: 5,
    marginBottom: wp("1%"),
    resizeMode: "contain"
  },
  successModalAmountText: {
    color: Colors.black,
    fontFamily: Fonts.FiraSansRegular,
    fontSize: RFValue(21, 812),
    marginRight: 5
  },
  successModalAmountUnitText: {
    color: Colors.borderColor,
    fontFamily: Fonts.FiraSansRegular,
    fontSize: RFValue(11, 812),
    marginBottom: 3
  },
  successModalAmountInfoView: {
    flex: 0.4,
    marginRight: wp("10%"),
    marginLeft: wp("10%")
  },
  successModalButtonView: {
    height: wp("13%"),
    width: wp("35%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 10,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 10,
    shadowOffset: { width: 0, height: 10 },
    backgroundColor: Colors.blue,
    alignSelf: "center",
    marginRight: wp("10%"),
    marginLeft: wp("10%")
  },
  successModalImage: {
    width: wp("25%"),
    height: hp("18%"),
    marginLeft: "auto",
    resizeMode: "cover"
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue(13, 812),
    fontFamily: Fonts.FiraSansMedium
  }
});
