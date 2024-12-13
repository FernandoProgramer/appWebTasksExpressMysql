
export const ButtonForm = ({ isSubmitting, children, ...props }) => {
    return (
        <button
            {...props}
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            disabled={isSubmitting}
        >
            {children}
        </button>
    )
}
