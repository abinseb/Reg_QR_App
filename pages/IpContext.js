import React,{createContext,useContext,useState} from 'react'

const IpContext = createContext();

export const useIpContext =()=> useContext(IpContext);

export const IPProvider = ({children} ) =>{
    const [ipAddress,setIpAddress] = useState([]);

    const addIpAddress =(ip)=>{
        setIpAddress([...ipAddress, ip]);
    }

    return(
        <IpContext.Provider value={{ipAddress,addIpAddress}}>
            {children}
        </IpContext.Provider>
    );
};