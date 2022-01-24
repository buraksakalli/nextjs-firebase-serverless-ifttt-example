import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, setDoc, doc } from "firebase/firestore/lite";
import db from "configs/firebase";
import { urlCreator, instance } from "utils";
import { ICarProps } from "api/types";

async function getCars() {
  const carsCol = await collection(db, "cars");
  const carsSnapshot = await getDocs(carsCol);
  return carsSnapshot.docs.map((doc) => doc.data());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const carsList = await getCars();

  instance
    .get(process.env.NEXT_PUBLIC_CARS24_URL as string, {
      headers: {
        X_COUNTRY: "AE",
        X_VEHICLE_TYPE: "CAR",
      },
    })
    .then((response) => {
      // TODO: Define a type for response.data
      const unbookedCars = response.data.results.filter(
        (r: any) => r.booked === false
      );
      let updated = false;
      const isUpdated = unbookedCars.map((r: ICarProps) => {
        // TODO: Define a type for carsList
        return carsList.findIndex(
          (c: any) => c.appointmentId == r.appointmentId
        );
      });

      if (isUpdated.includes(-1)) {
        unbookedCars.map((car: ICarProps) => {
          setDoc(doc(db, "cars", car.appointmentId), {
            ...car,
            link: urlCreator(car),
          });
        });
        updated = true;
        const lastAdded = isUpdated.findIndex((c: number) => c == -1);

        res.status(200).json({
          data: unbookedCars,
          updated,
          lastAdded: unbookedCars[lastAdded],
          link: urlCreator(unbookedCars[lastAdded]),
        });
      } else res.status(200).json({ data: unbookedCars, updated });
    });
}
