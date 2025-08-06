import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


export const getMyPayers = createAsyncThunk(
  "auth/getMyPayers",
  async ({selectedDate}, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(`/payer/get-my-payers/${selectedDate}`, config);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);




export const payerReducer = createSlice({
  name: "payer",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    myPayers: {}
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  
  },
    extraReducers: (builder) => {
    builder.addCase(getMyPayers.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getMyPayers.fulfilled, (state, action) => {
      state.loader = false;
    //   state.successMessage = action.payload.message; 
      state.myPayers = action.payload.payers;

    });
    builder.addCase(getMyPayers.rejected, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.error;
      // console.log("Login failed:", action.payload.error);
    });
  },
  
});

// export default paymentReducer
export const { messageClear } = payerReducer.actions;
export default payerReducer.reducer;