import axios, { AxiosInstance } from "axios";
import Client from "bitcoin-core";
import * as bitcoinJS from "bitcoinjs-lib";
import {
  BIT_ENVIRONMENT,
  BIT_GAP_LIMIT,
  BIT_DPATH_PURPOSE,
  BIT_STANDARD_BIP44,
  BIT_STANDARD_BIP49,
  BIT_STANDARD_BIP84,
  BIT_SECURE_WALLET_XPUB_PATH,
  BIT_SECURE_DERIVATION_BRANCH,
  BIT_SCHUNK_SIZE,
  BIT_BSI_INIT_INDEX,
  BIT_BSI_MAXUSEDINDEX,
  BIT_BSI_MINUNUSEDINDEX,
  BIT_BSI_DEPTH_INIT,
  BIT_BSI_DEPTH_LIMIT,
  BIT_API_URLS_BH_SERVER_DEV,
  BIT_API_URLS_BH_SERVER_PROD,
  BIT_HEXA_ID,
  BIT_BLOCKCYPHER_API_URLS_TOKEN,
  BIT_SUCCESS_STATUS_CODE,
  BIT_ERROR_STATUS_CODE,
  BIT_RPC_USERNAME,
  BIT_RPC_PASSWORD,
  BIT_HOST_IP,
  BIT_ESPLORA_TESTNET_MULTIBALANCE,
  BIT_ESPLORA_TESTNET_MULTIUTXO,
  BIT_ESPLORA_TESTNET_MULTITXN,
  BIT_ESPLORA_TESTNET_TXNFEE,
  BIT_ESPLORA_TESTNET_TXNDETAILS,
  BIT_ESPLORA_TESTNET_BROADCAST_TX,
  BIT_ESPLORA_MAINNET_MULTIBALANCE,
  BIT_ESPLORA_MAINNET_MULTIUTXO,
  BIT_ESPLORA_MAINNET_MULTITXN,
  BIT_ESPLORA_MAINNET_TXNFEE,
  BIT_ESPLORA_MAINNET_TXNDETAILS,
  BIT_ESPLORA_MAINNET_BROADCAST_TX,
  BIT_API_URLS_TESTNET_BASE,
  BIT_API_URLS_BLOCKCHAIN_INFO_TESTNET_BASE,
  BIT_API_URLS_TESTNET_BALANCE_CHECK,
  BIT_API_URLS_TESTNET_UNSPENT_OUTPUTS,
  BIT_API_URLS_TESTNET_BROADCAST,
  BIT_API_URLS_TESTNET_TX_DECODE,
  BIT_API_URLS_TESTNET_TX_FETCH_URL,
  BIT_API_URLS_TESTNET_TX_LIMIT,
  BIT_API_URLS_TESTNET_FUND_URL,
  BIT_API_URLS_MAINNET_BASE,
  BIT_API_URLS_BLOCKCHAIN_INFO_MAINNET_BASE,
  BIT_API_URLS_MAINNET_BALANCE_CHECK,
  BIT_API_URLS_MAINNET_UNSPENT_OUTPUTS,
  BIT_API_URLS_MAINNET_BROADCAST,
  BIT_API_URLS_MAINNET_TX_DECODE,
  BIT_API_URLS_MAINNET_TX_FETCH_URL,
  BIT_API_URLS_MAINNET_TX_LIMIT,
  BIT_CIPHER_ALGORITHM,
  BIT_CIPHER_SALT,
  BIT_CIPHER_KEYLENGTH,
  BIT_SSS_OTP_LENGTH,
  BIT_SSS_TOTAL,
  BIT_SSS_THRESHOLD,
  BIT_MSG_ID_LENGTH,
  BIT_CHECKSUM_ITR,
  BIT_SSS_METASHARE_SPLITS,
  BIT_HEXA_HEALTH_STAGE1,
  BIT_HEXA_HEALTH_STAGE2,
  BIT_HEXA_HEALTH_STAGE3,
  BIT_HEXA_HEALTH_STAGE4,
  BIT_HEXA_HEALTH_STAGE5,
  BIT_ENTITY_HEALTH_STAGE1,
  BIT_ENTITY_HEALTH_STAGE2,
  BIT_ENTITY_HEALTH_STAGE3,
  BIT_SHARE_HEALTH_TIME_SLOT1,
  BIT_SHARE_HEALTH_TIME_SLOT2,
  BIT_MNEMONIC_HEALTH_TIME_SLOT
} from "react-native-dotenv";

class Config {
  public ENVIRONMENT: string;
  public NETWORK: bitcoinJS.Network;
  public BITCOIN_NODE: Client;
  public BH_AXIOS: AxiosInstance;
  public SECURE_WALLET_XPUB_PATH: string = BIT_SECURE_WALLET_XPUB_PATH;
  public SECURE_DERIVATION_BRANCH: string = BIT_SECURE_DERIVATION_BRANCH;
  public TOKEN: string = BIT_BLOCKCYPHER_API_URLS_TOKEN;
  public SSS_OTP_LENGTH: string = BIT_SSS_OTP_LENGTH;
  public GAP_LIMIT: number = parseInt(BIT_GAP_LIMIT, 10);
  public CIPHER_SPEC: {
    algorithm: string;
    salt: string;
    iv: Buffer;
    keyLength: number;
  } = {
    algorithm: BIT_CIPHER_ALGORITHM,
    salt: BIT_CIPHER_SALT,
    keyLength: parseInt(BIT_CIPHER_KEYLENGTH, 10),
    iv: Buffer.alloc(16, 0)
  };
  public BH_SERVER = {
    DEV: BIT_API_URLS_BH_SERVER_DEV,
    PROD: BIT_API_URLS_BH_SERVER_PROD
  };
  public BSI = {
    INIT_INDEX: parseInt(BIT_BSI_INIT_INDEX, 10),
    MAXUSEDINDEX: parseInt(BIT_BSI_MAXUSEDINDEX, 10),
    MINUNUSEDINDEX: parseInt(BIT_BSI_MINUNUSEDINDEX, 10),
    DEPTH: {
      INIT: parseInt(BIT_BSI_DEPTH_INIT, 10),
      LIMIT: parseInt(BIT_BSI_DEPTH_LIMIT, 10)
    }
  };
  public SSS_TOTAL: number = parseInt(BIT_SSS_TOTAL, 10);
  public SSS_THRESHOLD: number = parseInt(BIT_SSS_THRESHOLD, 10);
  public MSG_ID_LENGTH: number = parseInt(BIT_MSG_ID_LENGTH, 10);
  public SCHUNK_SIZE: number = parseInt(BIT_SCHUNK_SIZE, 10);
  public CHECKSUM_ITR: number = parseInt(BIT_CHECKSUM_ITR, 10);
  public HEXA_ID: string = BIT_HEXA_ID;
  public DPATH_PURPOSE: number = parseInt(BIT_DPATH_PURPOSE, 10);
  public SSS_METASHARE_SPLITS: number = parseInt(BIT_SSS_METASHARE_SPLITS, 10);
  public STATUS = {
    SUCCESS: parseInt(BIT_SUCCESS_STATUS_CODE, 10),
    ERROR: parseInt(BIT_ERROR_STATUS_CODE, 10)
  };
  public STANDARD = {
    BIP44: parseInt(BIT_STANDARD_BIP44, 10),
    BIP49: parseInt(BIT_STANDARD_BIP49, 10),
    BIP84: parseInt(BIT_STANDARD_BIP84, 10)
  };

  public HEALTH_STATUS = {
    HEXA_HEALTH: {
      STAGE1: BIT_HEXA_HEALTH_STAGE1,
      STAGE2: BIT_HEXA_HEALTH_STAGE2,
      STAGE3: BIT_HEXA_HEALTH_STAGE3,
      STAGE4: BIT_HEXA_HEALTH_STAGE4,
      STAGE5: BIT_HEXA_HEALTH_STAGE5
    },

    ENTITY_HEALTH: {
      STAGE1: BIT_ENTITY_HEALTH_STAGE1,
      STAGE2: BIT_ENTITY_HEALTH_STAGE2,
      STAGE3: BIT_ENTITY_HEALTH_STAGE3
    },

    TIME_SLOTS: {
      SHARE_SLOT1: parseInt(BIT_SHARE_HEALTH_TIME_SLOT1, 10),
      SHARE_SLOT2: parseInt(BIT_SHARE_HEALTH_TIME_SLOT2, 10),
      MNEMONIC_SLOT: parseInt(BIT_MNEMONIC_HEALTH_TIME_SLOT, 10)
    }
  };

  public ESPLORA_API_ENDPOINTS = {
    TESTNET: {
      MULTIBALANCE: BIT_ESPLORA_TESTNET_MULTIBALANCE,
      MULTIUTXO: BIT_ESPLORA_TESTNET_MULTIUTXO,
      MULTITXN: BIT_ESPLORA_TESTNET_MULTITXN,
      TXN_FEE: BIT_ESPLORA_TESTNET_TXNFEE,
      TXNDETAILS: BIT_ESPLORA_TESTNET_TXNDETAILS,
      BROADCAST_TX: BIT_ESPLORA_TESTNET_BROADCAST_TX
    },
    MAINNET: {
      MULTIBALANCE: BIT_ESPLORA_MAINNET_MULTIBALANCE,
      MULTIUTXO: BIT_ESPLORA_MAINNET_MULTIUTXO,
      MULTITXN: BIT_ESPLORA_MAINNET_MULTITXN,
      TXN_FEE: BIT_ESPLORA_MAINNET_TXNFEE,
      TXNDETAILS: BIT_ESPLORA_MAINNET_TXNDETAILS,
      BROADCAST_TX: BIT_ESPLORA_MAINNET_BROADCAST_TX
    }
  };

  public SERVER: string = this.BH_SERVER.DEV;

  public API_URLS = {
    TESTNET: {
      BASE: BIT_API_URLS_TESTNET_BASE,
      BLOCKCHAIN_INFO_BASE: BIT_API_URLS_BLOCKCHAIN_INFO_TESTNET_BASE,
      BALANCE_CHECK: BIT_API_URLS_TESTNET_BALANCE_CHECK,
      UNSPENT_OUTPUTS: BIT_API_URLS_TESTNET_UNSPENT_OUTPUTS,
      BROADCAST: BIT_API_URLS_TESTNET_BROADCAST,
      TX_DECODE: BIT_API_URLS_TESTNET_TX_DECODE,
      TX_FETCH: {
        URL: BIT_API_URLS_TESTNET_TX_FETCH_URL,
        LIMIT: BIT_API_URLS_TESTNET_TX_LIMIT
      },
      FUND: {
        URL: BIT_API_URLS_TESTNET_FUND_URL
      }
    },
    MAINNET: {
      BASE: BIT_API_URLS_MAINNET_BASE,
      BLOCKCHAIN_INFO_BASE: BIT_API_URLS_BLOCKCHAIN_INFO_MAINNET_BASE,
      BALANCE_CHECK: BIT_API_URLS_MAINNET_BALANCE_CHECK,
      UNSPENT_OUTPUTS: BIT_API_URLS_MAINNET_UNSPENT_OUTPUTS,
      BROADCAST: BIT_API_URLS_MAINNET_BROADCAST,
      TX_DECODE: BIT_API_URLS_MAINNET_TX_DECODE,
      TX_FETCH: {
        URL: BIT_API_URLS_MAINNET_TX_FETCH_URL,
        LIMIT: BIT_API_URLS_MAINNET_TX_LIMIT
      }
    }
  };

  constructor(env: string) {
    this.ENVIRONMENT = env;
    this.setNetwork();
    this.BITCOIN_NODE = new Client({
      network:
        this.NETWORK === bitcoinJS.networks.bitcoin ? "mainnet" : "testnet",
      timeout: 10000,
      username: BIT_RPC_USERNAME,
      password: BIT_RPC_PASSWORD,
      host: BIT_HOST_IP
    });
    this.BH_AXIOS = axios.create({
      baseURL: this.SERVER,
      data: { hexa_id: this.HEXA_ID }
    });
  }

  public setNetwork = (): void => {
    if (this.ENVIRONMENT === "MAIN") {
      this.NETWORK = bitcoinJS.networks.bitcoin;
    } else if (this.ENVIRONMENT === "TEST") {
      console.log("HERE");
      console.log({ bitcoinJS });
      this.NETWORK = bitcoinJS.networks.testnet;
    } else {
      throw new Error("Please specify an apt environment(MAIN||TEST)");
    }
  };
}

export default new Config(BIT_ENVIRONMENT);
