import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export function UserContextProvider(props)
{
    let [userLogin, setUserLogin] = useState(null);
    let [counter1, setCounter1] = useState(10);

    useEffect(()=>{
        if(localStorage.getItem("userToken") !== null)
        {
            setUserLogin(localStorage.getItem("userToken"))
            
        }
    }, [])

    return <userContext.Provider value={{setUserLogin, userLogin, counter1}}>
        {props.children}
    </userContext.Provider>
}