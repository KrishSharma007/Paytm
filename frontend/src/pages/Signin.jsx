import { Button } from "../components/button";
import { Bottomwarning } from "../components/bottomwarning"
import { InputBox } from "../components/InputBox"
import { Heading } from "../components/SignHeading"
import { SubHeading } from "../components/SubHeading"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../url";
export const Signin=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const nav = useNavigate();
    useEffect(()=>{
    const checkAuth = async () => {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        try {
            const response = await axios.get(url+"/api/v1/user/me", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log(response.data);
            if (response.data.logged) {
                nav("/dashboard");
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
        }
    };

    checkAuth();
}, [nav]); 

    return <div className="bg-slate-300 min-h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-96 text-center p-4">
                <Heading label={"Sign in"}></Heading>
                <SubHeading label={"Enter your account information"}></SubHeading>
                <InputBox onChange={(e)=>{setUsername(e.target.value)}} type={"text"} placeholder={"Enter Username"} label={"Username"}></InputBox>
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} type={"Password"} placeholder={"Enter password"} label={"Password"}></InputBox>
                <Button onClick={async()=>{
                    try {
                        const response = await axios.post(url+"/api/v1/user/signin", {
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        nav("/dashboard")
                    } catch (error) {
                        console.error("Signin failed:", error);
                        alert("Signin failed. Please try again.");
                    }
                }} color={"bg-black"} label={"Sign in"}></Button>
                <Bottomwarning label={"Don't have an account?"} link={"Sign up"} to={"signup"}></Bottomwarning>
            </div>
        </div>
    </div>
}