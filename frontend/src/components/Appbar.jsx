import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/3135715.png';
export function Appbar({ username, profilePhoto }) {
    const nav=useNavigate()
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-4 font-medium text-lg">
                <div className="text-3xl sm:text-5xl font-bold text-black">
                    Paytm
                </div>
                <div className="flex flex-col items-center space-x-4 sm:space-x-6 mt-2 sm:mt-0">
                    <div className="text-gray-700">Hello, {username}</div>
                    <img
                        src={profilePhoto || profileImage}
                        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover cursor-pointer"
                        alt={`${username}'s profile`}
                        onClick={() => alert('Profile clicked!')}
                    />
                    <button onClick={()=>{
                        localStorage.removeItem("token")
                        nav("/signin")
                    }}>Logout</button>
                </div>
            </div>
            <hr className="mt-2 border-t-2 border-gray-700" />
        </>
    );
}
