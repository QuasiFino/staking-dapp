import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../redux/data/dataActions";
import Navbar from "./Navbar";

const App = (props) => {

  const { blockchain, data } = props;
  console.log(data);

  const renderError = () => {
    if(blockchain.errorMsg) {
      return (
        <div class="alert alert-danger" role="alert">
          {blockchain.errorMsg}
        </div>
      );
    }
  }

  useEffect(() => {
    if (
      blockchain.account !== "" 
      && blockchain.tether !== null
      && blockchain.rwd !== null
      && blockchain.decentralBank !== null
    ) {
      props.fetchData(blockchain.account);
    }
  }, [blockchain]);

  return (
    <div>
      <Navbar account="0x0" />
      <div className="text-center">
        App
      </div>
      <br />
      {renderError()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    blockchain: state.blockchain,
    data: state.data
  }
}

export default connect(mapStateToProps, actions)(App);
// https://github.com/euphoric-git/staking-dapp.git