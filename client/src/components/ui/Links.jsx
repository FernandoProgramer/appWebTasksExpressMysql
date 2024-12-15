import { Link } from 'react-router-dom'

export const Links = ({ destination, children, ...props }) => {
    return (
        <>
            <Link
                {...props}
                className='text-sm/6 font-medium text-blue-600 dark:text-blue-500 hover:underline' to={destination}>
                {children}
            </Link>
        </>
    )
}
