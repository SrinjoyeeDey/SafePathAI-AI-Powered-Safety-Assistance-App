import { useEffect,useState } from "react";

export default function DarkModeToggle() {
const [theme,setTheme]=useState(
    localStorage.getItem("theme") || "light"
);

useEffect(()=>{
    if(theme=='dark'){
        document.documentElement.classList.add('dark');
    }else{
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem("theme",theme);
},[theme]);

    return (
        <button onClick={()=>setTheme(theme==='light'?'dark':'light')}
        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800">
            {theme==='light'?'dark Mode':'Light Mode'}
        </button>
    );
}

