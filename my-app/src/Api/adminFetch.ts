import { createAsyncThunk } from "@reduxjs/toolkit";

interface ICarriage {
    success: boolean;
    body: any;
    message: string;
}
interface Error {
    error: string;
}

const DEVELOP_HOST = process.env.REACT_APP_API_URL;

export const getOrderFetch = createAsyncThunk<ICarriage, void, { rejectValue: Error }>(
    "@Admin/getOrder" as const,
    async (_, thunkAPI) => {
        try {

            const resp = await fetch(`${DEVELOP_HOST}/admin/getOrder`);
            const result = await resp.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to get order data.",
            } as Error);
        }
    }
);

export const shipOrderFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@Admin/shipOrder" as const,
    async (orderId, thunkAPI) => {
        try {

            const resp = await fetch(`${DEVELOP_HOST}/admin/shipOrder?orderId=${orderId}`);
            const result = await resp.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to ship order.",
            } as Error);
        }
    }
);
export const cancelOrderFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@Admin/cancelOrder" as const,
    async (orderId, thunkAPI) => {
        try {

            const resp = await fetch(`${DEVELOP_HOST}/admin/cancelOrder?orderId=${orderId}`);
            const result = await resp.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to cancel order.",
            } as Error);
        }
    }
);
