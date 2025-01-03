import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ACLoginRedirect = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const gtCo = localStorage.getItem("Auth");
        if (gtCo) {
            navigate("/");
        } else {
            localStorage.removeItem("Auth");
        }
    }, [navigate]);

    return <>{children}</>;
};

export default ACLoginRedirect;