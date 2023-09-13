import React, { createContext, useState } from 'react'
export const addData = createContext();
export const updateData = createContext();
export const dltData = createContext()

const ContextProvider = ({ children }) => {
   
  const [useradd, setUseradd] = useState("");
  const [update, setUpdate] = useState("");
  const [deletedata, setDeletedata] = useState("");  
  
  
  return (
    <>
   <addData.Provider value={{ useradd, setUseradd }}>
    <updateData.Provider value={{update, setUpdate}}>
      <dltData.Provider value={{deletedata, setDeletedata}}>
            {children}
    </dltData.Provider>
    </updateData.Provider>
    </addData.Provider>
    </>
  )
}

export default ContextProvider