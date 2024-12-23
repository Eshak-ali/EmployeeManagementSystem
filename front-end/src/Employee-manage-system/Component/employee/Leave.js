import React, { useContext, useEffect, useState } from 'react'
import '../../CSS/leave.css'
// images
import leave from '../../images/request.jpg'
import accept from '../../images/accept.jpg'
import reject from '../../images/reject.jpg'
import { Employee } from '../../login-register/context'
import axios from 'axios'

const Leave = () => {

    const { person, setPerson, fetched } = useContext(Employee)
    const [reason, setReason] = useState('');
    // state for success or reject message
    const [msg, setMsg] = useState({ leave: 0 });
    const [accrej, setAccrej] = useState(person)

    useEffect(() => {
        fetched();
    }, [])

    const handleLeave = async () => {

      if(reason !==''){
        const res = await axios.post(`${process.env.REACT_APP_API}/employee/leave`, person)
        const num = msg.leave + 1;
        if (res.data) {
            setMsg({
                leave: num,
                msg: "Request has been sent to the Manager"
            })
            setAccrej(person.leave.LeaveReq)
            setReason("")
        }
        else {
            console.log(Error);
            setMsg("some error occurs pls try again later or inform to manager")
        }
      }
      else{
        setMsg({
            msg: 'Pls enter a reason'
        })
      }

    }



    useEffect(() => {
        setPerson((prev) => ({ ...prev, leave: { reason: "" } }))
        setPerson((prev) => ({ ...prev, leave: { reason: reason, LeaveReq: null } }))
    }, [reason])

    return (
        <div className='leave-main col-12'>
            <h2 className=' d-flex mx-3  text-dark'> Leave Request</h2>
            {person.position === '' && 'reject' ?
                <p style={{color:'black'}}>You didnt Assigned for any position</p>
                :
                
                    <>
                        <div className=' col-12 days-cart mt-5' >
                            <div className=' col-9 col-md-3 days-count cart-back text-dark '>
                                <img src={leave} />
                                <div>
                                    <h5>Leave Request </h5>
                                    <p>{msg.msg}</p>
                                </div>
                            </div>
                            <div className='col-9 col-md-3 days-count cart-back-a text-dark'>
                                <img src={accept} />
                                <div >
                                    <h5>Accept </h5>
                                    <p>{accrej?.leave?.LeaveReq == true ? "Request Accepted" : accrej?.leave?.LeaveReq == false ? 'your past request rejected' : 'not to be proceed' }</p>
                                </div>
                            </div>
                            <div className='col-9 col-md-3 days-count cart-back-r text-dark'>
                                <img src={reject} />
                                <div>
                                    <h5>Reject </h5>
                                    <p>{accrej?.leave?.LeaveReq == false ? "Request Reject" :  "not to be proceed"}</p>
                                </div>
                            </div>
                        </div>
                        <div className='leave-input mt-5'>
                            <textarea onChange={(e) => setReason(e.target.value)} value={reason} />
                            <div className='leave-button'>
                                <button className='btn btn-secondary' onClick={() => { setReason("") }}>Clear</button>
                                <button className='btn btn-primary' onClick={handleLeave} data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>

                            </div>
                        </div>
                        {/* model */}
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog ">
                                <div class='modal-content' >
                                    <div class="modal-header">
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-dark">
                                        {msg.msg}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>


    )
}

export default Leave
