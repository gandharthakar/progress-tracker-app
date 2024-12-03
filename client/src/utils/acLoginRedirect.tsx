import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const ACLoginRedirect = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const gtCo = cookies.get("Auth");
        if (gtCo) {
            navigate("/");
        }
    }, []);

    return <></>;
};

export default ACLoginRedirect;