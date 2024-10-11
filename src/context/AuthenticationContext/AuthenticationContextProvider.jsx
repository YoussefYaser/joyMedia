import { createContext, useState } from "react"


export const Authentication = createContext();


export default function AuthenticationContextProvider({children}) {    

    let [isLogin, setIsLogin] = useState(false);

    return (
        <Authentication.Provider value={{isLogin, setIsLogin}}>
            {children}
        </Authentication.Provider>
    )
}
