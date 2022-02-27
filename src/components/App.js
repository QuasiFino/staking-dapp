import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../redux/data/dataActions";
import Navbar from "./Navbar";
import Main from "./Main";
import Loader from "./Loader";

const App = (props) => {

  const { blockchain, data } = props;
  console.log(data);

  const renderError = () => {
    if(blockchain.errorMsg) {
      window.alert(blockchain.errorMsg);
      return (
        <div className="alert alert-danger" role="alert">
          {blockchain.errorMsg}
        </div>
      );
    }
  }

  const renderContent = () => {
    if(blockchain.loading || data.loading) {
      return (
        <Loader />
      );
    }
    return(
      <Main />
    );
    
  }

  useEffect(() => {
    let isMounted = true; //to prevent warning of unmounted async event

    if (
      isMounted
      && blockchain.account !== "" 
      && blockchain.tether !== null
      && blockchain.rwd !== null
      && blockchain.decentralBank !== null
    ) {
      props.fetchData(blockchain.account);
    }

    return () => { isMounted = false }
  }, [blockchain.account]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <div className="row">
          <main 
            role="main" 
            className='col-lg-12 ml-auto mr-auto'
            style={{ minHeight: '100vm'}}
          >
            {renderContent()}
          </main>
        </div>
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