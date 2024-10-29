// export function InputBox({type,placeholder,label,onChange}) {
//     return <div className="flex flex-col items-start mt-4">
//         <label className="mb-2 font-semibold">{label}</label>
//         <input onChange={onChange} className="w-full border rounded-lg p-2" type={type} placeholder={placeholder} />
//     </div>
// }


export function InputBox({ type, placeholder, label, onChange }) {
    return (
        <div className="flex flex-col items-start mt-4 w-full">
            <label className="mb-2 font-semibold">{label}</label>
            <input
                onChange={onChange}
                className="w-full border rounded-lg p-2 sm:p-3"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}
