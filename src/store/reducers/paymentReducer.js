import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addPayment = createAsyncThunk(
  "payment/addPayment",
  async (
    { amount, paymentMethod, payerId, paidAt },
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.post(
        "/payment/add-payment",
        {
          amount,
          paymentMethod,
          payerId,
          paidAt,
        },
        config
      );


      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPayment.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addPayment.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(addPayment.rejected, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.error;
    });

  },
});

// export default paymentReducer
export const { messageClear, redirectClear, user_reset } = paymentReducer.actions;
export default paymentReducer.reducer;
