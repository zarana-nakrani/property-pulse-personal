'use client';
import { count } from "console";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type countObject = {
    unreadCount: number,
    setUnreadCount: Dispatch<SetStateAction<number>>
}
//Create Context
const GlobalContext = createContext<countObject>({
    unreadCount: 0,
    setUnreadCount: () => {},
});

//Create a provider
export function GlobalProvider({children}: {
    children: ReactNode
}) {

    const [unreadCount, setUnreadCount] = useState(0)
    return (
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

//Create a custom hook to access context
export function useGlobalContext() {
    return useContext(GlobalContext);
}