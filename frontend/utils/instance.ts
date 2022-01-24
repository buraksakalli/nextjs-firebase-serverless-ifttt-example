import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const instanceConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_CARS24_URL as string,
  headers: {
    X_COUNTRY: "AE",
    X_VEHICLE_TYPE: "CAR",
  },
};

export const instance: AxiosInstance = axios.create(instanceConfig);
