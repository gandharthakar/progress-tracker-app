// import { CommonAPIResponse } from "@/types/tenstack-query/commonTypes";
import { useAuthChecker } from "@/tanstack-query/mutations/auth/authMutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CommonAPIResponseAuthCheck } from "@/types/tanstack-query/auth/authTypes";

const TokenChecker = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    const callbackOnSuc = (resp: (CommonAPIResponseAuthCheck | undefined)) => {
        if (resp) {
            if (resp.success) {
                if (resp?.isEmailVerified === false) {
                    navigate("/auth/re-verify/redirect");
                }
            }
        }
    }

    const callbackOnErr = (resp: (CommonAPIResponseAuthCheck | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 4000
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                        localStorage.removeItem("Auth");
                    }
                });
                const st = setTimeout(() => {
                    navigate("/");
                    localStorage.removeItem("Auth");
                    clearTimeout(st);
                }, 4000);
            }
        }
    }

    const callbackErr = (resp: (CommonAPIResponseAuthCheck | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 4000
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                        localStorage.removeItem("Auth");
                    }
                });
                const st = setTimeout(() => {
                    navigate("/");
                    localStorage.removeItem("Auth");
                    clearTimeout(st);
                }, 4000);
            }
        }
    }

    const { mutate } = useAuthChecker({ onSuccessCB: (resp) => callbackOnSuc(resp), onErrorCB: (resp) => callbackOnErr(resp), errorCB: (resp) => callbackErr(resp) });

    useEffect(() => {
        const gtCo = localStorage.getItem("Auth");
        if (gtCo) {
            const prsGtCo = JSON.parse(gtCo);
            mutate({ token: prsGtCo })
        } else {
            navigate("/");
            localStorage.removeItem("Auth");
        }
    }, [mutate, navigate]);

    return <>{children}</>
};

export default TokenChecker;