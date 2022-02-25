import { 
  CHECK_DATA_REQUEST, 
  CHECK_DATA_SUCCESS, 
  CHECK_DATA_FAILED 
} from "../ActionTypes";

const initialState = {
  tetherBalance: "0",
  rwdBalance: "0",
  stakingBalance: "0",
  errorMsg: "",
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_DATA_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case CHECK_DATA_SUCCESS:
      return {
        ...initialState,
        loading: false,
        tetherBalance: action.payload.tetherBalance,
        rwdBalance: action.payload.rwdBalance,
        stakingBalance: action.payload.stakingBalance,
      };
    case CHECK_DATA_FAILED:
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
