import { createContext,useContext,useState } from "react";

const AuthContext=createContext<any>(null);

export const AuthProvider=({children}:{children:React.ReactNode})=>{
    const [user,setUser]=useState(null);

    const login=(data:any)=>setUser(data);
    const logout=()=>setUser(null);

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth =()=>useContext(AuthContext);