

export default function Label({children,className="",...props}){
    return(
        <label 
        
            className={className}
        >
            {children}
        </label>
    )

}