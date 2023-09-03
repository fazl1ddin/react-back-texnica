import { useLayoutEffect, useState } from "react";
import instance from "../../Config/api/index";

function useGetDatas(
  url,
  method = "GET",
  body = [],
  call = true,
  params = {},
  refetch = []
) {
  const [data, setdata] = useState([]);
  const [length, setlength] = useState([]);
  const [loading, setloading] = useState(true);

  useLayoutEffect(() => {
    if (call) {
      (async () => {
        setloading(true);
        try {
          const res = await instance({
            url,
            method,
            data: JSON.stringify(body),
            params,
          });
          if (res.data.success === 1) {
            setdata(res.data.data.items);
            setlength(res.data.data.length);
          } else {
            throw new Error("Success is not 1");
          }
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
    length,
    loading,
  };
}

export default useGetDatas;
