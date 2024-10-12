import { createContext, useState } from "react"


export const Authentication = createContext();


export default function AuthenticationContextProvider({children}) {
    
    const joyMediaToken = localStorage.getItem('joyMediaToken') != null ? true : false;

    let [isLogin, setIsLogin] = useState(joyMediaToken);
    let[postsLoaded, setPostsLoaded] = useState(isLogin);
    let[hideSign, setHideSign] = useState(isLogin);

    return (
        <Authentication.Provider value={{isLogin, setIsLogin, postsLoaded, setPostsLoaded, hideSign, setHideSign}}>
            {children}
        </Authentication.Provider>
    )
}
