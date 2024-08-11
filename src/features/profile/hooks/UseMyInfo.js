import { useEffect, useState } from "react";
import UserApi from "../../../api/user/UserApi";

export default function useGetMyAccount() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const resp = await UserApi.getMyInfo();

        const { data } = resp;
        setUser(data);
      } catch (error) {
        console.log("Error in hook name is useGetMyAccount: ", error);
      }

      setLoading(false);
    })();
  }, []);

  return { loading, user };
}
