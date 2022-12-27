import React, { useEffect, useRef, useState } from "react"

export default function Autocomplete({options, value, onChange}) {
    
    const [showOptions, setShowOptions] = useState(false)
    const [cursor, setCursor] = useState(-1)
    const ref = useRef();

    const select = option => {
        onChange(option)
        setShowOptions(false)
    }

    const handleChange = text => {
        onChange(text);
        setCursor(-1);
        if(!showOptions) {
            setShowOptions(true)
        }
    }
    
    const filteredOptions = options.filter(option => option.includes(value))
    const sliceFilterOption = filteredOptions.slice(0,10)
    const moveCursorDown = () => {
        if(cursor < filteredOptions.length - 1) {
            setCursor(c => c + 1)
        }
    }

    const moveCursorUp = () => {
        if(cursor > 0) {
            setCursor(c => c - 1)
        }
    }

    const handleNav = (e) => {
        switch (e.key) {
            case "ArrowUp":
                moveCursorUp();
                break;
            case "ArrowDown":
                moveCursorDown();
                break;
            case "Enter":
                if(cursor >= 0 && cursor < filteredOptions.length) {
                    select(filteredOptions[cursor]);
                }
                break;
        }
    }

    useEffect(() => {
        const listener = e => {
            if(!ref.current.contains(e.target)) {
                setShowOptions(false)
                setCursor(-1)
            }
        };
        
        document.addEventListener('click', listener)
        document.addEventListener('focusin', listener)
        return () => { 
            document.removeEventListener('click', listener); 
            document.removeEventListener('focusin', listener); 
        }
    },[]);

    return (<div className="relative w-64 "  >

        <input ref={ref} type="text" className="border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-md" 
            value={value}
            onChange={e => handleChange(e.target.value)}
            onFocus={()=> setShowOptions(true)} 
            onKeyDown={handleNav}
            />

        <ul className={`absolute w-full rounded-lg shadow-lg ${!showOptions && 'hidden'} select-none`}>
            {sliceFilterOption.length > 0 ? sliceFilterOption.map((option, i, arr) => {
                let className = "px-4 bg-white hover:bg-gray-100 "

                if(i === 0)
                    className += "pt-2 pb-1 rounded-t-lg"
                else if(i === arr.length)
                    className += "pt-1 pb-2 rounded-b-lg"
                else if(i ===0 && arr.length === 1)
                    className += "py-2 rounded-lg"
                else 
                    className += "py-1 "

                if(cursor === i) {
                    className += " bg-gray-100"
                }

                return <li className={className} 
                    key={option}
                    onClick={() => select(option)}
                    >{option}</li>
            }) : <li className="px-4 py-2 text-gray-500">No results</li>}
            
        </ul>
    </div>)
}