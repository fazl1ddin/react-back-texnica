import { useLayoutEffect, useState } from "react";
import instance from "../../Config/api/index";

function useGetDatasExper(
  url,
  method = "GET",
  body = [],
  call = true,
  params = {},
  refetch = []
) {
  const [data, setdata] = useState([]);
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
            setdata(res.data.data);
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
    data: Object.fromEntries(data.map((item, index) => {
      return [item._id, item]
    })),
    loading,
  };
}

export default useGetDatasExper;
