import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
