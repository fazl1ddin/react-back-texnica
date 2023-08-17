import { useLayoutEffect, useState } from "react";
import instance from "../../Config/api/index";

function useGetDatas(url, refetch = []) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useLayoutEffect(() => {
    (async () => {
      setloading(true)
      try {
        const res = await instance({ url, method: 'GET', withCredentials: true })
        setdata(res.data)
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false)
      }
    })();
  }, [...refetch, url]);

  return {
    data,
    loading
  }
}

export default useGetDatas;