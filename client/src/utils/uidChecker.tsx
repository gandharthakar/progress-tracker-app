import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserLoginTokenType } from "@/types/tanstack-query/auth/authTypes";

const UIDChecker = () => {

    const navigate = useNavigate();
    const { user_id } = useParams();

    useEffect(() => {
        const gtCo = localStorage.getItem("Auth");
        if (gtCo) {
            const prsGtCo = JSON.parse(gtCo);
            const decodeToken: UserLoginTokenType = jwtDecode(prsGtCo);
            if (user_id) {
                if (user_id !== decodeToken.user_id) {
                    navigate("/");
                    localStorage.removeItem("Auth");
                }

                if (decodeToken.user_id !== user_id) {
                    navigate("/");
                    localStorage.removeItem("Auth");
                }
            }
        } else {
            navigate("/");
            localStorage.removeItem("Auth");
        }
    }, []);

    return <></>
}

export default UIDChecker;