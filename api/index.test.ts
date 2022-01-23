/**
 * @jest-environment node
 */
import axios from "axios";
import { IResponseProps } from "./types";

const enum TestEnum {
  MAX_PRICE = 1000000,
}

const getCars = async (): Promise<IResponseProps> => {
  const response = await axios.get("https://cars24.vercel.app/api/cars");
  return response;
};

describe("Cars API", () => {
  test("Car price should be less than Max Price", async () => {
    const { data } = await getCars();

    data.data.map((car) => {
      expect(car.price).toBeLessThan(TestEnum.MAX_PRICE);
    });
  });
  test("Car location should be Dubai", async () => {
    const { data } = await getCars();

    data.data.map((car) => {
      expect(car.city).toBe("Dubai");
    });
  });
});
