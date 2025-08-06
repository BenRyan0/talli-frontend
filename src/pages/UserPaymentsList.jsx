import React, { useEffect, useState } from 'react'
import DemoPage from '@/app/payments/page'
import { useDispatch, useSelector } from 'react-redux';
import { getMyPayers } from '.././store/reducers/payerReducer';
// import { getMyPayers } from '/store/reducers/payerReducer';

import { columns } from "../app/payments/columns";
import { DataTable } from "../app/payments/data-table";

const UserPaymentsList = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(
    (state) => state.auth
  );
  const { myPayers } = useSelector(
    (state) => state.payer
  );

// ✅ New (defaults to today)
const [selectedDate, setSelectedDate] = useState(new Date());


  console.log("userInfo:", userInfo);

  useEffect(()=>{
    if(userInfo){
      dispatch(getMyPayers({selectedDate}))
    }
  },[userInfo, dispatch,selectedDate])


    useEffect(() => {
    console.log("Selected date from child:", selectedDate);
    setSelectedDate(selectedDate)
  }, [selectedDate]);

  return (
    <div className='w-full h-full p-3 '>
        <DataTable columns={columns} data={myPayers} setSelectedDate={setSelectedDate} selectedDate={selectedDate}  />
    </div>
  )
}

export default UserPaymentsList