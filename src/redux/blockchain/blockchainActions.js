import Web3 from "web3/dist/web3.min";

import { 
  CONNECTION_REQUEST, 
  CONNECTION_SUCCCESS, 
  CONNECTION_FAILED, 
  UPDATE_ACCOUNT 
} from "../ActionTypes";

import { fetchData } from "../data/dataActions";

import Tether from "../../truffle_abis/Tether.json"
import RWD from "../../truffle_abis/RWD.json";
import DecentralBank from "../../truffle_abis/DecentralBank.json";

const connectRequest = () => {
  return {
    type: CONNECTION_REQUEST,
  };
};

const connectSuccess = (payload) => {
  return {
    type: CONNECTION_SUCCCESS,
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: CONNECTION_FAILED,
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: UPDATE_ACCOUNT,
    payload: payload,
  };
};

export const connectBlockchain = () => async dispatch => {
  dispatch(connectRequest());
  if(window.ethereum) {
    let web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      const NetworkDataTether = await Tether.networks[networkId];
      const NetworkDataRwd = await RWD.networks[networkId];
      const NetworkDataDecentralBank = await DecentralBank.networks[networkId];
      if(NetworkDataTether && NetworkDataRwd && NetworkDataDecentralBank) {
        const tetherObj = new web3.eth.Contract(
          Tether.abi,
          NetworkDataTether.address
        );
        const rwdObj = new web3.eth.Contract(
          RWD.abi,
          NetworkDataRwd.address
        );
        const decentralBankObj = new web3.eth.Contract(
          DecentralBank.abi,
          NetworkDataDecentralBank.address
        );
        dispatch(connectSuccess({
          account: accounts[0],
          tether: tetherObj,
          rwd: rwdObj,
          decentralBank: decentralBankObj,
          web3: web3,
        }));

        window.ethereum.on("accountsChanged", (accounts) => {
          dispatch(updateAccount(accounts[0]));
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } else {
        dispatch(connectFailed("Change to correct network"));
      }
    } catch (err) {
      dispatch(connectFailed("Something went wrong."));
    }
  } else {
    dispatch(connectFailed("Install Metamask."));
  }
};

export const updateAccount = (account) => async dispatch => {
  dispatch(updateAccountRequest({account: account}));
  dispatch(fetchData(account));
};
