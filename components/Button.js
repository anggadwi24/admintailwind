


export default function Button({type="submit",className="",...
props}){
    return (
        <button 
            type={type}
            className={className}
            {...props}

        />
    )
}