import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import DataTable from 'react-data-table-component';

const Taskpending = () => {
    const context=useOutletContext();

    useEffect(()=>{
       context?.setTabledata(context?.taskdata.filter((item) => item.status === 'pending'))
    },[])
  return (
    <div>
          <div className='table-responsive  col-11 m-auto mt-3'>
                <DataTable
                    columns={context?.columns}
                    data={context?.tabledata}
                    pagination
                    highlightOnHover
                />
            </div>
    </div>
  )
}

export default Taskpending
