import { 
  CHECK_DATA_REQUEST, 
  CHECK_DATA_SUCCESS, 
  CHECK_DATA_FAILED 
} from "../ActionTypes";

import store from "../store";

const fetchDataRequest = () => {
  return {
    type: CHECK_DATA_REQUEST,
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: CHECK_DATA_SUCCESS,
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: CHECK_DATA_FAILED,
    payload: payload,
  }
}

export const fetchData = (account) => async dispatch => {
  dispatch(fetchDataRequest());
  try {
    let tetherBalance = await store
      .getState()
      .blockchain.tether.methods.balanceOf(account)
      .call();
    let rwdBalance = await store
      .getState()
      .blockchain.rwd.methods.balanceOf(account)
      .call();
    let stakingBalance = await store
      .getState()
      .blockchain.decentralBank.methods.stakingBalance(account)
      .call();

    dispatch(fetchDataSuccess({
      tetherBalance,
      rwdBalance,
      stakingBalance,
    }));
  } catch (err) {
    console.log(err);
    dispatch(fetchDataFailed("Could not load data from contract."));
  }
} 
