import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      toast({
        title: "Authentication Required",
        description: "You must be signed in to leave a review.",
        variant: "destructive",
      });
      navigate("/sign-in", { replace: true }); // replace: true prevents history stack push
    }
  }, [userEmail, navigate, toast]);

  return userEmail ? <>{children}</> : null;
};

export default ProtectedRoute;