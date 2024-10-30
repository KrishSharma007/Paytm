import { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { Listusers } from "./listusers";
import axios from "axios";
import { url } from "../../url";

export function Users({username}) {
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");
    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await axios.get(url+"/api/v1/user/bulk?filter="+filter);
                let array=response.data.user
                array=array.filter((e)=>{
                    if (e.username!=username) {
                        return true
                    }
                    return false
                })
                setUsers(array);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    },[filter])
    return (
        
        <div className="pl-2 sm:pl-4">
            <InputBox onChange={e=>{setFilter(e.target.value)}} label={"Users"} placeholder={"Search users..."} />
            <ul className="mt-4 sm:mt-6">
            {users.map((user)=><Listusers key={user.id} user={user}/>)}
            </ul>
        </div>
    );
}
