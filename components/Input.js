

export default function Input({disabled=false,className="",...props}){

    return (
        <input
            disabled={disabled}
            className={className}
            {...props}
        />
    )
}