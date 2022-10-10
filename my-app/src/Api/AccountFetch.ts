import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICombineUserDataState } from "../Redux/Slice/accountSlice";

interface ICarriage<T = any> {
  success: boolean;
  body: T;
  message: string;
}

interface Error {
  error: string;
}

const DEVELOP_HOST = process.env.REACT_APP_API_URL;

export const LogInFetch = createAsyncThunk<
  ICarriage<{
    combineUserData: Array<ICombineUserDataState>;
    userShoppingDataArr: Array<object>;
    token: string;
  }>,
  { email: string; password: string },
  { rejectValue: Error }
>("@Account/logIn" as const, async ({ email, password }, thunkAPI) => {
  try {
    const resp = await fetch(`${DEVELOP_HOST}/account/logIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await resp.json();
    return result;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      error: "Failed to log in.",
    } as Error);
  }
});

export const getUserDataJWTFetch = createAsyncThunk<
  ICarriage,
  { token: string },
  { rejectValue: Error }
>("@Account/userDataJWT" as const, async ({ token }, thunkAPI) => {
  const resp = await fetch(`${DEVELOP_HOST}/account/userDataJWT`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (resp.status < 200 || resp.status >= 300) {
    return thunkAPI.rejectWithValue({ error: "Failed to log in." } as Error);
  }
  const result = await resp.json();
  return result;
});
