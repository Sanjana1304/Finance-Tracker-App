import React,{ useState, useEffect } from 'react'
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

const RecordFinance = () => {
  const [showCards, setShowCards] = useState(window.innerWidth <= 1100); 
  const [showCards2,setShowCards2] = useState(window.innerWidth > 1100);

  const {records,delRecord,updRecord} = useContext(DataContext);

  var total_amt=0;
  records.map(record => {
    total_amt+=Number(record.amt);
  })

  useEffect(() => {
    const handleResize = () => {
      setShowCards(window.innerWidth <= 1100);
      setShowCards2(window.innerWidth>1100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBlur = (e,id,amt,catg,paym,date) =>{

    const updatedRec = {
      desc:e.target.innerHTML,
      amt:amt,
      date:date,
      catg:catg,
      paym:paym
    }
    updRecord(updatedRec,id);
  }

  

  return (
    <div>
      <div className="row">
        
        <div className="col"><br /><h5>Total Amount Spent: {total_amt}</h5></div>
        {showCards &&
          records.map((record,key)=>(
            
            <div className="card" key={key}>
              <div className="row" >
                <div className="col-5 rec-left py-2">Description</div>
                
                <div 
                  className="col-7 rec-right" 
                  dangerouslySetInnerHTML={{ __html: record.desc }}
                  onBlur={(e)=>handleBlur(e,record._id,record.amt,record.catg,record.paym,record.date)}
                  contentEditable></div>
                <div className="col-5 rec-left py-2">Amount</div>
                <div className="col-7 rec-right">{record.amt}</div>
                <div className="col-5 rec-left py-2">Category</div>
                <div className="col-7 rec-right">{record.catg}</div>
                <div className="col-5 rec-left py-2">Payment Method</div>
                <div className="col-7 rec-right">{record.paym}</div>
                <div className="col-5 rec-left py-2">Date</div>
                <div className="col-7 rec-right">{record.date}</div>
                <button className='col-2 rec-left btn-red py-2' onClick={()=>delRecord(record._id)}>Delete</button>
              </div>
              <br />
            </div>
          ))
        }

        <div className="card">
          {
          showCards2
          ?
          <div className="row">
            <div className="col rec-left py-2">Description</div>
            <div className="col rec-left py-2">Amount</div>
            <div className="col rec-left py-2">Category</div>
            <div className="col rec-left py-2">Payment Method</div>
            <div className="col rec-left py-2">Date</div>
            <div className="col rec-left py-2">Action</div>
          </div>
          
          
            :''
          }

          {
            showCards2 && records.map((record,k)=>(
              <div className="row" key={k}>
                <div 
                  className="col rec-right py-2" 
                  dangerouslySetInnerHTML={{ __html: record.desc }}
                  onBlur={(e)=>handleBlur(e,record._id,record.amt,record.catg,record.paym,record.date)}
                  contentEditable></div>
                <div className="col rec-right py-2">{record.amt}</div>
                <div className="col rec-right py-2">{record.catg}</div>
                <div className="col rec-right py-2">{record.paym}</div>
                <div className="col rec-right py-2">{record.date}</div>
                <button className="col rec-right py-2 btn-red text-white" onClick={()=>delRecord(record._id)}>Delete</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RecordFinance