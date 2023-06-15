import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [theme, settheme] = useState("light");

  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
  //     settheme('dark');
  //   } else {
  //     settheme('ligth');
  //   }
  // }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const handleThemeSwitch = () => {
    settheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="mx-auto text-center mt-10 h-screen w-screen flex justify-center items-center 
    dark:bg-dark-primary-default  
    bg-light-secondary-default">
      <div className=" absolute top-20 left-20 rotate-6 h-40 w-40 
        bg-dark-primary-200
      dark:bg-dark-third-default">
      </div>

      <button
        className=" 
        text-1xl
        font-semibold
        text-dark-primary-50
        bg-light-primary-default 
        dark:bg-light-primary-default 
        dark:text-light-primary-50 
         rounded-lg 
         px-2 py-1"
        onClick={handleThemeSwitch}>
        {theme === 'light' ? "DarkMode" : "LightMode"}
      </button>
    </div>
  )
}
