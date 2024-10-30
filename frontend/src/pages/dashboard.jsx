import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../url";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [username, setUsername] = useState(0);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(url+"/api/v1/user/me", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response && response.data.logged) {
                    setAuth(true);
                    setUsername(response.data.username);
                    fetchBalance();
                } else {
                    navigate("/signin"); 
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                navigate("/signin");
            }
        };

        checkAuth(); 
    }, [navigate]);

    const fetchBalance = async () => {
        try {
            const response = await axios.get(url+"/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const roundedBalance = parseFloat(response.data.balance).toFixed(2);
            setBalance(roundedBalance);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };
    if (!auth) {
        return null;
    }

    return (
        <div className="bg-slate-300 w-screen min-h-screen p-6 sm:p-10 md:p-14 pt-2">
            <Appbar username={username} />
            <div className="w-full p-6 sm:p-8 md:p-10 pt-4 md:pt-6 pb-4 md:pb-6">
                <Balance value={balance} />
                <Users username={username} />
            </div>
        </div>
    );
};
