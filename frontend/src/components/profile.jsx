import profileImage from '../assets/3135715.png';


export function Profile({ name }) {
    return (
        <div className="flex items-center">
            <img
                src={profileImage}
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover cursor-pointer"
                alt="profile"
                onClick={() => alert('Profile clicked!')}
            />
            <div className="font-medium ml-2 text-sm sm:text-base flex items-center">{name}</div>
        </div>
    );
}
