import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext("");

export default function AuthContextProvider({children}) {

    const [myToken, setMyToken] = useState(null);
    const Data = {
        myToken, 
        setMyToken,
    };

    useEffect(() => {
      const value = localStorage.getItem('tkn');
      if(value != null)
      {
        setMyToken(value);
      }
    }, [])

  return (
  
  <authContext.Provider value={Data}>
    {children}
  </authContext.Provider>
  
  )
}
