import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";

const UIDChecker = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const gtCo = cookies.get("Auth");
        if (gtCo) {
            const decodeToken = jwtDecode(gtCo);
            console.log(decodeToken);
        }
    }, []);

    return <></>
}

export default UIDChecker;