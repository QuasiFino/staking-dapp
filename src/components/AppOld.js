import React, { useEffect, useState } from "react";
import Web3 from "web3";

import Navbar from "./Navbar";

const App = () => {
  const [account, setAccount] = useState('0x0');
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState('0');
  const [rwdBalance, setRwdBalance] = useState('0');
  const [stakingBalance, setStakingBalance] = useState('0');
  const [loading, setLoading] = useState(true);

  const loadWeb3 = async() => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert("No ethereum browser detected! You can install MetaMask")
    }
  }

  const loadBlockchainData = async() => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    console.log(account[0]);
    setAccount(account[0]);
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navbar account={account} />
      <div className="text-center">
        App
      </div>
    </div>
  );
}

export default App;
