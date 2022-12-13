

export default function Select({children = [],className="",...props}){
    console.log(children)
    return(
        <select 
        
            className={className}
            {...props}
        >
            {children}
        </select>
    )

}