import React from "react";
import { connect } from "react-redux";
import bank from '../images/bank.png';

import * as actions from "../redux/blockchain/blockchainActions";

const Navbar = (props) => {
  const { blockchain } = props

  const renderConnect = () => {
    if(
      blockchain.account === "" 
      || blockchain.tether === null 
      || blockchain.rwd === null 
      || blockchain.decentralBank === null 
    ) {
      return (
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            props.connectBlockchain();
          }}
        >
          Connect
        </button>
      );
    }

    return (
      <small>
        {`Connected ${(blockchain.account).slice(0, 4)}...${(blockchain.account).slice(-4)}`}
      </small>
    );
  }

  return (
    <nav 
      className="navbar navbar-dark fixed-top shadow p-0"
      style={{ backgroundColor: 'black', color: "white", height: '50px' }} 
    >
      <a className="navbar-brand col-sm-3 col-md-2 mr-0">
        <img 
          src={bank} 
          width='30'
          height='30'
          alt="Bank"
          className='d-inline-block align-top'
        />  
        &nbsp; DAPP Yeild Staking (Decentralized Banking)
      </a>
      <ul className="navbar-nav px-3">
        <li className="text-nowrap d-none nav-item d-sm-none d-md-block">
          {renderConnect()}
        </li>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    blockchain: state.blockchain
  }
}

export default connect(mapStateToProps, actions)(Navbar);

// px- padding on left and right
// d-none- Display None Responsive. Use the d-none class to hide an element
// d-sm-none - not visible in xs and sm
// d-md-block - visible in md and above

// &nbsp; - space