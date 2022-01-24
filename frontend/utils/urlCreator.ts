import { ICarProps } from "api/types";

export const urlCreator = (car: ICarProps) => {
  return `https://cars24.com/ae/buy-used-${car.year}-${car.make}-${car.model}-${car.year}-cars-${car.city}-${car.appointmentId}`;
};
