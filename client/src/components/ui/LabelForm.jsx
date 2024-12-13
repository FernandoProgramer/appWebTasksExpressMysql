export const LabelForm = ({ idName, children, ...props }) => {
    return (
        <label
            {...props}
            htmlFor={idName}
            className="block text-sm/6 font-medium text-gray-900">
            {children}
        </label>
    );
};
