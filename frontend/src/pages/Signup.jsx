import { Button } from "../components/button";
import { Bottomwarning } from "../components/bottomwarning"
import { InputBox } from "../components/InputBox"
import { Heading } from "../components/SignHeading"
import { SubHeading } from "../components/SubHeading"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../url";

export const Signup=()=>{
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
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
            <div className=" bg-white rounded-lg lg:w-96 text-center p-4">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={"Enter your information to create an account"}></SubHeading>
                <InputBox onChange={e=>{setFirstName(e.target.value)}} type={"text"} placeholder={"John"} label={"First Name"}></InputBox>
                <InputBox onChange={e=>{setLastName(e.target.value)}} type={"text"} placeholder={"Doe"} label={"Last Name"}></InputBox>
                <InputBox onChange={e=>{setUsername(e.target.value)}} type={"text"} placeholder={"Ente username"} label={"Username"}></InputBox>
                <InputBox onChange={e=>{setPassword(e.target.value)}} type={"Password"} placeholder={"Enter password"} label={"Password"}></InputBox>
                <div className="mt-4">
                <Button onClick={async()=>{
                    try {
                        const response = await axios.post(url+"/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        nav("/dashboard")
                    } catch (error) {
                        console.error("Signup failed:", error);
                        alert("Signup failed. Please try again.");
                    }
                }} color={"bg-black"} label={"Sign up"}></Button>
                </div>
                <Bottomwarning label={"Already have an account?"} link={"Sign in"} to={"signin"}></Bottomwarning>
            </div>
        </div>
    </div>
}