import { useState, useEffect } from "react";
import instance from "../API";

export const Effect = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await instance.get(url);
        setData(data);
      } catch (error) {
        return error.message;
      }
    };
    fetch();
  }, [url]);

  return data;
};

export default Effect;
