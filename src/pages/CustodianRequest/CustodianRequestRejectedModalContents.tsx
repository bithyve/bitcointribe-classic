import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Colors from "../../common/Colors";
import Fonts from "../../common/Fonts";

export default function CustodianRequestRejectedModalContents(props) {
  return (
    <View style={{ ...styles.modalContentContainer, height: "100%" }}>
      <View style={{ height: "100%" }}>
        <View
          style={{
            ...styles.successModalHeaderView,
            marginRight: wp("8%"),
            marginLeft: wp("8%")
          }}
        >
          <Text style={styles.modalTitleText}>
            Recovery Key Rejected{"\n"}Successfully
          </Text>
          <Text style={{ ...styles.modalInfoText, marginTop: wp("1.5%") }}>
            You have rejected the request to be a{"\n"}Keeper for
          </Text>
        </View>
        <View style={styles.box}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.successModalAmountImage}
              source={require("../../assets/images/icons/icon_wallet.png")}
            />
            <Text style={styles.successModalWalletNameText}>
              {props.userName}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginLeft: wp("8%"),
              marginRight: wp("8%")
            }}
          >
            <Text style={{ ...styles.modalInfoText }}>
              The sender will be notified that you have rejected the{"\n"}
              request to be a Keeper
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: "auto",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../../assets/images/icons/reject.png")}
            style={styles.successModalImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    height: "50%",
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
  box: {
    backgroundColor: Colors.backgroundColor1,
    marginRight: wp("5%"),
    marginLeft: wp("5%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
    marginBottom: hp("3%"),
    borderRadius: 10,
    justifyContent: "center"
  },
  successModalHeaderView: {
    marginTop: hp("5%"),
    marginBottom: hp("3%")
  },
  modalTitleText: {
    color: Colors.blue,
    fontSize: RFValue(18),
    fontFamily: Fonts.Medium
  },
  modalInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue(11),
    fontFamily: Fonts.Regular
  },
  successModalWalletNameText: {
    color: Colors.black,
    fontSize: RFValue(25),
    fontFamily: Fonts.Regular,
    textAlign: "center"
  },
  successModalAmountImage: {
    width: wp("15%"),
    height: wp("15%"),
    marginRight: 15,
    marginLeft: 15,
    resizeMode: "contain"
  },
  successModalImage: {
    width: wp("30%"),
    height: wp("35%"),
    marginLeft: "auto",
    resizeMode: "contain"
  }
});
