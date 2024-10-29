
export function Balance({ value }) {
    return (
        <div className="flex flex-col sm:flex-row w-full">
            <div className="font-medium text-lg sm:text-base">Your Balance</div>
            <div className="mt-1 sm:mt-0 sm:ml-3 text-xl sm:text-base">&#8377;{value}</div>
        </div>
    );
}
