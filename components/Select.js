

export default function Select({children = [],className="",...props}){
   
    return(
        <select 
        
            className={className}
            {...props}
        >
            {children}
        </select>
    )

}