import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

interface UserState {
  user: string | null; // Define your user data type here
}

const initialState: UserState = {
  user: '',
};

// async thunk
export const login = createAsyncThunk<
  {
    // output
    a: boolean
  },
  {
    // input
    isLogin: string | null
  },
  { dispatch: AppDispatch; state: RootState }
>("user/login", async ({
  // lấy input ra
  isLogin
  }) => {
  //  return output
  let check = false
  if (isLogin === 'false') {
      console.log('false')
  }else{
    console.log('true')
    check = true
  }

  return {
    a: check
  }
});

const userSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      // state.user = action.payload;
    },
  },
  extraReducers(builder) {
    // Khi thực hiện login thành công (Promise fulfilled)
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log('action.payload.a', action.payload.a)
      })
      .addCase(login.rejected, (state, action) => {

      });
  },
});

export const { setUser } = userSlice.actions;


export default userSlice.reducer;
