import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Profile } from './profile';
// export function Listusers(){
//     return <li className='flex items-center justify-between mt-4 pl-2'>
//         <Profile name={"Krish Sharma"}></Profile>
//         <Link to={"/send"}>
//         <div className='w-40'>
//             <Button color={"bg-black"} label={"Send Money"}></Button>
//         </div>
//         </Link>
//     </li>
// }


export function Listusers({user}) {
    const navigate= useNavigate()
    return (
        <li className="flex flex-col sm:flex-row items-center justify-between mt-4 pl-2">
            <Profile name={`${user.firstName} ${user.lastName}`} />
            <div className="w-full sm:w-40 mt-2 sm:mt-0">

                <Button onClick={(e)=>{
                    navigate("/send?id="+user._id+"&name="+user.username)
                }} color={"bg-black"} label={"Send Money"} />
            </div>
        </li>
    );
}
