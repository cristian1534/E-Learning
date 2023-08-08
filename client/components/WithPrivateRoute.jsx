import { UserContext } from "@/context/UserProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";

const WithPrivateRoute = ({ children }) => {
  const router = useRouter();
  const { status } = useContext(UserContext);

  useEffect(() => {
    if (status !== "authenticate") {
      router.push('/auth/login');
    }
  }, []);

  return <>{children}</>;
};

export default WithPrivateRoute;