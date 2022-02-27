import { connect } from "react-redux";

const Loader = ({ blockchain, data }) => {

  const renderMessage = () => {
    if(blockchain.loading) {
      return (
        "Connecting Wallet...."
      );
    } else if (data.loading) {
      return (
        `Fetching data from ${blockchain.account}....`
      );
    }
  }

  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">
        {renderMessage()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    blockchain: state.blockchain,
    data: state.data,
  };
};

export default connect(mapStateToProps)(Loader);