import { useLayoutEffect, useState } from "react";
import instance from "../../Config/api/index";

function useGetDatas(url, refetch = [], call = true) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useLayoutEffect(() => {
    if (call) {
      (async () => {
        setloading(true);
        try {
          const res = await instance({ url, method: "GET" });
          setdata(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setloading(false);
        }
      })();
    }
  }, [...refetch, url, call]);

  return {
    data,
    loading,
  };
}

export default useGetDatas;