import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/button";
import { InputBox } from "../components/InputBox";
import { Profile } from "../components/profile";
import { Heading } from "../components/SignHeading";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../url";

export function Sendmoney() {
    const [auth, setAuth] = useState(false);
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const nav = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            console.log("Token:", token); 

            try {
                const response = await axios.get(url+"/api/v1/user/me", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log("Auth Response:", response.data); 

                if (response.data.logged) {
                    setAuth(true);
                } else {
                    console.log("User not logged in.");
                    nav("/signin");
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                nav("/signin");
            }
        };

        checkAuth();
    }, [nav]);

    if (!auth) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 sm:p-6">
            <div className="rounded-lg bg-white shadow-lg p-6 sm:p-10 w-full max-w-md">
                <Heading label={"Send Money"} />
                <div className="mt-10 sm:mt-20 w-full">
                    <div className="flex justify-start mb-4">
                        <Profile name={name} />
                    </div>
                    <div className="mb-4">
                        <InputBox onChange={(e) => { setAmount(e.target.value); }} type={"number"} placeholder={"Enter amount"} label={"Amount (in Rs)"} />
                    </div>
                    <Button onClick={async () => {
                        try {
                            await axios.post(url+"/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            });
                            alert("Transaction Successful");
                            nav("/dashboard");
                        } catch (error) {
                            console.error("Error initiating transfer:", error);
                        }
                    }} color={"bg-green-500"} label={"Initiate Transfer"} />
                </div>
            </div>
        </div>
    );
}
