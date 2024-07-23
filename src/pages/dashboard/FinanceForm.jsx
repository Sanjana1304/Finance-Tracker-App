import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';

const FinanceForm = () => {
  const {user,desc,amt,catg,paym,setdesc,setamt,setcatg,setpaym,addRecordtoDB} = useContext(DataContext);

  const addRecord = (e) =>{
    e.preventDefault();
    console.log(desc,amt,catg,paym);

    const newRecord = {
      userId: user?.id??"",
      desc:desc,
      amt:amt,
      date:new Date(),
      catg:catg,
      paym:paym
    }

    addRecordtoDB(newRecord);
    setamt('');
    setcatg('');
    setdesc('');
    setpaym('');
  }
  return (
    <div>
      <div className="row">
        <form onSubmit={(e)=>addRecord(e)}>
          <div className="row fw-bold">
            <div className="col-12">
              <label htmlFor="">Description: </label>
              <input 
                type="text" 
                value={desc}
                onChange={(e)=>setdesc(e.target.value)}
                className='form-control green-focus my-1' 
                required/>
            </div>

            <div className="col-12">
              <label htmlFor="">Amount: </label>
              <input 
                type="number" 
                value={amt}
                onChange={(e)=>setamt(e.target.value)}
                className='form-control green-focus my-1' 
                required/>
            </div>

            <div className="col-12">
              <label htmlFor="">Category: </label>
              <select className='form-control my-1' value={catg} onChange={(e)=>setcatg(e.target.value)} required>
                <option value="" disabled hidden>Select a category</option>
                <option value="Food" key={1} >Food</option>
                <option value="Rent" key={2}>Rent</option>
                <option value="Salary" key={3}>Salary</option>
                <option value="Utilities" key={4}>Utilities</option>
                <option value="Entertainment" key={5}>Entertainment</option>
                <option value="Other" key={6}>Other</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="">Payment Method: </label>
              <select className='form-control my-1' value={paym} onChange={(e)=>setpaym(e.target.value)} required>
              <option value="" disabled hidden>Select a Payment Method</option>
                <option value="Credit Card" key={1} >Credit Card</option>
                <option value="Cash" key={2}>Cash</option>
                <option value="Debit Card" key={3}>Debit Card</option>
                <option value="UPI" key={4}>UPI</option>
                <option value="Bank Transfer" key={5}>Bank Transfer</option>
              </select>
            </div>

            <div className="col-12">
              <br />
              <button className='sign-btn' type='submit'>Add Record</button>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default FinanceForm