import { useEffect, useState } from "react";
import { getCars } from "api";
import type { ICarProps } from "api/types";

const useCars = () => {
  const [data, setData] = useState<Array<ICarProps>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initial = async () => {
      const data = await getCars().then((res) =>
        res.sort((a: ICarProps, b: ICarProps) => a.price - b.price)
      );
      setData(data);
      setLoading(false);
    };
    initial();
  }, []);

  return { loading, data };
};

export default useCars;
