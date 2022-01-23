import axios from "axios";
import type { IResponseProps } from "./types";

export const getCars = async () => {
  const { data }: IResponseProps = await axios.get("/api/cars");
  return data.data;
};
