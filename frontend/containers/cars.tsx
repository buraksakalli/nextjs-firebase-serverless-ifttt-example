import { ICarProps } from "api/types";
import { toCurrency } from "utils/toCurrency";
import styles from "../styles/Home.module.css";

const Cars: React.FC<{ data: Array<ICarProps> }> = ({ data }) => {
  return (
    <>
      {data.map((car) => (
        <a
          key={car.appointmentId}
          target={"_blank"}
          rel="noreferrer"
          href={`https://cars24.com/ae/buy-used-${car.year}-${car.make}-${car.model}-${car.year}-cars-${car.city}-${car.appointmentId}`}
          className={styles.card}
        >
          <h2>
            {car.make} {car.model} {car.year}
          </h2>
          <div className={styles.details}>
            <div className={styles.detailText}>
              <span>Price</span>
              <span>{toCurrency(car.price)}</span>
            </div>
            <div className={styles.detailText}>
              <span>KM</span>
              <span>{car.odometerReading.toLocaleString()}</span>
            </div>
            <div className={styles.detailText}>
              <span>Engine</span>
              <span>{car.engineSize}L</span>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default Cars;
