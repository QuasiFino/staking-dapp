import { useState } from "react";
import { connect } from "react-redux";
import Web3 from "web3/dist/web3.min";
import tether from "../images/tether.png";
import * as actions from "../redux/data/dataActions";

const Main = (props) => {
  const { data, blockchain } = props;

  const [stakeInput, setStakeInput] = useState("0");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const web3 = new Web3(window.ethereum);

  const onStakeTokens = (amount) => {
    if(
      blockchain.account !== "" 
      && blockchain.tether !== null 
      && blockchain.rwd !== null 
      && blockchain.decentralBank !== null 
    ) {
      console.log(blockchain.decentralBank._address);
      setLoading(true);
      setErrorMessage("");
      blockchain.tether.methods
        .approve(blockchain.decentralBank._address, amount)
        .send({from: blockchain.account, gasLimit: "600000"})
        .once("error", (err) => {
          setLoading(false);
          window.alert("Error Occured while approving");
          setErrorMessage("Error Occured while approving");
        })
        .then(() => {
          blockchain.decentralBank.methods.depositTokens(amount)
          .send({from: blockchain.account, gasLimit: "600000"})
          .once("error", (err) => {
            setLoading(false);
            window.alert("Error Occured while attempting to stake");
            setErrorMessage("Error Occured while attempting to stake");
          })
          .then(() => {
            props.fetchData(blockchain.account);
            setLoading(false);
            window.alert("Transaction successfull!");
          })
        })
    } else {
      window.alert("Kindly connect Wallet!");
      setErrorMessage("Kindly connect Wallet!");
      console.log(errorMessage);
    }
  }

  const onUnstakeTokens = () => {
    if(
      blockchain.account !== "" 
      && blockchain.tether !== null 
      && blockchain.rwd !== null 
      && blockchain.decentralBank !== null 
    ) {
      setLoading(true);
      setErrorMessage("");

      blockchain.decentralBank.methods.unstakeTokens()
      .send({from: blockchain.account, gasLimit: "600000"})
      .once("error", (err) => {
        setLoading(false);
        window.alert("Error Occured while attempting to Unstake");
        setErrorMessage("Error Occured while attempting to Unstake");
      })
      .then(() => {
        props.fetchData(blockchain.account);
        setLoading(false);
        window.alert("Unstake Transaction successfull!");
      })
    } else {
      window.alert("Kindly connect Wallet!");
      setErrorMessage("Kindly connect Wallet!");
      console.log(errorMessage);
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let amount = web3.utils.toWei(stakeInput);
    console.log(amount);
    onStakeTokens(amount);
  }

  return (
    <div id="content" 
      className="mt-5" 
    >
      <table className="table text-muted text-center" style={{ backgroundColor: "#2596be" }}>
        <thead>
          <tr style={{ color: "white" }}>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: "white" }}>
            <td>
            {web3.utils.fromWei(data.stakingBalance, "Ether")}{" "}
              USDT
            </td>
            <td>
              {web3.utils.fromWei(data.rwdBalance, "Ether")}{" "}
              RWD
            </td>
          </tr>
        </tbody>
      </table>
      <div className="card mb-2" style={{ opactiy: ".9" }}>
        <div className="card-body">
          <form
            onSubmit={onSubmitHandler}
            className="mb-3"
          >
            <div style={{ borderSpacing: "0 1em" }}>
              <label className="float-start" style={{ marginLeft: "15px", marginBottom: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-end" style={{ marginRight: "8px", marginBottom: "15px" }}>
                Balance:{" "}
                {web3.utils.fromWei(data.tetherBalance, "Ether")}
              </span>
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <img src={tether} alt="tether" height="32" />
                  &nbsp;&nbsp;&nbsp; USDT
                </div>
                <input
                className="form-control"
                  value={stakeInput}
                  onChange={(e) => {
                    setErrorMessage("");
                    setStakeInput(e.target.value);
                  }}
                  type="text"
                  placeholder="0"
                  required
                />
                <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                DEPOSIT
              </button>
              </div>
            </div>
          </form>
          <hr style={{ backgroundColor: "grey", height: "3px" }}/>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                onUnstakeTokens();
              }}
              className="btn btn-outline-primary fluid"
            >
              WITHDRAW
            </button>
          </div>
          <div className="card-footer mt-5 text-center" style={{ color: "blue" }}>
              <b>AIRDROP</b>
          </div>
        </div>
      </div>
      {errorMessage ? (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      ): null}
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    blockchain: state.blockchain,
  }
}

export default connect(mapStateToProps, actions)(Main);
