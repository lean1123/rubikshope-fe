import { useSelector } from "react-redux";

export default function useLoginedUser() {
  const loginUser = useSelector((state) => state.users.current);

  return { loginUser };
}
