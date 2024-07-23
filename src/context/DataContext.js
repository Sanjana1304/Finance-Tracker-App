import React from 'react';
import { createContext,useState } from 'react';
import { useUser } from '@clerk/clerk-react';
const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const {user} = useUser();
    const [desc,setdesc] = useState('');
    const [amt,setamt] = useState('');
    const [catg,setcatg] = useState('');
    const [paym,setpaym] = useState('');

    const[records,setRecords] = useState([]);

    const addRecordtoDB = async(newRecord) =>{
        const response = await fetch("https://finance-tracker-backend-ud79.onrender.com/finRec",{
            method:"POST",
            body:JSON.stringify(newRecord),
            headers:{
                'Content-Type':"application/json"
            }
        });
        try {
            if (response.ok) {
                const newRec = await response.json();
                console.log("sanj"+JSON.stringify(newRec));
                setRecords((prev) => [...prev,newRec]);
            }
        } catch (error) {
            console.log(error.message);
        }
        
        //console.log("sanj"+JSON.stringify(newRec));
    }
    const updRecord = async(updatedRec,id) =>{
        const response = await fetch(`https://finance-tracker-backend-ud79.onrender.com/finRec/${id}`,{
            method:"PUT",
            body:JSON.stringify(updatedRec),
            headers:{
                'Content-Type':"application/json"
            }
        });
        try {
            if (response.ok) {
                const index = records.findIndex(record => record._id === id);

                if (index !== -1) {
                    const updatedElements = [...records];
                    updatedElements[index] = { ...updatedElements[index], desc: updatedRec.desc };
                    
                   
                    setRecords(updatedElements);
                  }
                
                console.log("sanj"+JSON.stringify(records));
            }
        } catch (error) {
            console.log(error.message);
        }

    }
    const delRecord = async(id) =>{
        console.log(id);
        try {
            const response = await fetch(`https://finance-tracker-backend-ud79.onrender.com/finRec/${id}`,{
                method:"DELETE",
            });
            if (response.ok) {
                const deletedRec = await response.json();
                setRecords((prev) => prev.filter(record => record._id !==deletedRec._id));
            }else{
                console.error("Failed to delete record !");
            }
        } catch (error) {
            console.error(error.message);
        }

    }

    return (
        <DataContext.Provider value={{
            desc,amt,catg,paym,setdesc,setamt,setcatg,setpaym,addRecordtoDB,updRecord,delRecord,records,setRecords,user

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;