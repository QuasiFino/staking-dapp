import { 
  CONNECTION_REQUEST, 
  CONNECTION_SUCCCESS, 
  CONNECTION_FAILED, 
  UPDATE_ACCOUNT 
} from "../ActionTypes";

const initialState = {
  loading: false,
  account: null,
  tether: null,
  rwd: null,
  decentralBank: null,
  web3: null,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case CONNECTION_SUCCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        tether: action.payload.tether,
        rwd: action.payload.rwd,
        decentralBank: action.payload.decentralBank,
        web3: action.payload.web3,
      }
    case CONNECTION_FAILED:
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      }
    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
