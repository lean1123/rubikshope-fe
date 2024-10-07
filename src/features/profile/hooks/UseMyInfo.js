import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";

export default function useGetMyAccount() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // (async () => {
    //   try {
    //     setLoading(true);
    //     const resp = await UserApi.getMyInfo();
    //     const { data } = resp;
    //     setUser(data);
    //   } catch (error) {
    //     console.log("Error in hook name is useGetMyAccount: ", error);
    //   }
    //   setLoading(false);
    // })();

    const fetchUser = async () => {
      try {
        setLoading(true);
        const userInfo = await UserService.getMyInfo();
        setUser(userInfo);
      } catch (error) {
        console.log("Error in hook name is useGetMyAccount: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { loading, user };
}
