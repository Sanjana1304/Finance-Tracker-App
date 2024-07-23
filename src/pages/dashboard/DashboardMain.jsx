import React, { useContext, useEffect } from 'react';
import FinanceForm from './FinanceForm';
import RecordFinance from './RecordFinance';
import {SignedOut} from '@clerk/clerk-react';
import DataContext from '../../context/DataContext';
import { Navigate } from 'react-router-dom';

const DashboardMain = () => {
  
  const {setRecords,user} = useContext(DataContext);

  useEffect(() => {

    const fetchData = async() =>{
      if(!user) return;
      const userId = user.id;
      
      
    try {
      const response = await fetch(`https://finance-tracker-backend-ud79.onrender.com/finRec/getAllByUserID/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      }else{
        console.error("Failed to fetch records !");
      }
     
    } catch (error) {
      console.error(error.message);
    }
    }

    (async () => await fetchData())()


  }, [user])
  
  return (
    <>
    <SignedOut>
      <Navigate to="/auth" />
    </SignedOut>
    <div className='dashboard'>
        <br />
        <div className='db container'>
          <h1>Welcome {user?.firstName} ! </h1>
          <h1>Here are your Finances :</h1>
          <br />
          <FinanceForm/>
          <RecordFinance/>
        </div>
    </div>
    </>
  )
}

export default DashboardMain