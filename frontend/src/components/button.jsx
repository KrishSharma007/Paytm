
export function Button({ label, color, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`${color} w-full text-white rounded-lg p-2 sm:p-3 mt-2 sm:mt-4`}
        >
            {label}
        </button>
    );
}
