export interface IResponseProps {
  data: { data: Array<ICarProps> };
}

export type ICarProps = {
  year: string;
  make: string;
  model: string;
  city: string;
  price: number;
  appointmentId: string;
  engineSize: number;
  odometerReading: number;
};
