
export const AlertError = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className="flex items-start bg-red-100 text-red-700 p-2 rounded-md shadow-md border border-red-300 mt-2 mb-2"
        >
            {/* Icono de error */}
            <svg
                className="h-6 w-6 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>

            <div>
                <ul className="list-disc pl-5 text-sm">
                    {children}
                </ul>
            </div>
        </div>
    )
}

