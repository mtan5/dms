import { createSlice } from "@reduxjs/toolkit";
import type {iUserLogin} from '../../api/types/iUserLogin';

interface userString {
    type: string;
    payload: string;
}

interface userInt {
  type: string;
  payload: number;
}

const userSlice = createSlice({
  name: "userSlice",
  initialState: {} as iUserLogin,
  reducers: {
    setUserName(userState, action: userString) {        
      userState.user_name = action.payload;
    },
    setPassword(userState, action: userString) {        
      userState.user_password = action.payload;
    },
    setUserId(userState, action: userInt) {        
      userState.user_id = action.payload;
    }      
  }
});

const {setUserName, setPassword, setUserId} = userSlice.actions;
const userSliceReducer = userSlice.reducer;

export {setUserName, setPassword, setUserId, userSliceReducer};