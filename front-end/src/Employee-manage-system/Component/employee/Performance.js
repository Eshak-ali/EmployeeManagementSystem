import React, { useContext, useEffect, useState } from 'react'
import { Employee } from '../../login-register/context'
import '../../CSS/performance.css'
import axios from 'axios'


const Performance = () => {
    const { person,fetched  } = useContext(Employee)
    const [temp, setTemp] = useState([])
    const [emp, setEmp] = useState([])
    const [search, setSearch] = useState('')



    const fetch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/employee/all`);
            if (response.data) {
                setTemp(response.data);

            }
        } catch (error) {
            alert(error.message);
        }

    };

    useEffect(() => {
        fetch();
    }, [])

    useEffect(() => {
        fetched();
    }, [])

    useEffect(() => {
        setEmp(temp.filter(each => each.position !== '' && each.position !== 'reject'))
    },[temp])

    return (
        <div className='main-performance col-12 '>
            <h2 className='col-2 mx-2 text-dark '>Performance</h2>
            {person?.position === "" && "reject" ? <p style={{color:'black'}}>You didnt Assigned for any position</p>
                :
                <div className='table-responsive m-auto col-10 '>
                    <table className='table table-success col-10'>
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>ID</th>
                                <th>position</th>
                                <th>Performance</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='emp-img'><img src={`${process.env.REACT_APP_API}/uploads/${person.image}`} /></td>
                                <td>{person.name}</td>
                                <td>{person.employeeid}</td>
                                <td>{person.position}</td>
                                <td>{person?.performance}</td>
                                <td>{person?.performance === 5 ?
                                    <p style={{ color: 'green' }}>Good Job Keep it up</p>
                                    :
                                    person?.performance !== 0 ?
                                        <p className='text-primary'>Pls upgrade your Performance</p>

                                        :
                                        <p style={{ color: 'red' }}>Pls improve your work skill</p>
                                }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            <section className='m-auto  col-10  col-md-10 text-dark'>
                <p>Other Employee</p>
                <label>Search by name  </label><br />
                <input type='text' role='searchbox' onChange={(e) => {
                    setSearch(e.target.value)
                }} />
                <div className='table-responsive performance-table'>
                    <table className='table table-bordered table-hover mt-2 table-sm col-10 table-primary'>

                        <thead className='thead-style'>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Position</th>
                                <th>Performance</th>
                            </tr>
                        </thead>

                        <tbody>
                            {emp.filter((each) => ((each.name.toLowerCase()).includes(search.toLowerCase()))).map((each) => (
                                <tr key={each._id}>
                                    <td className='emp-img'>
                                        <img src={`${process.env.REACT_APP_API}/uploads/${each.image}`} /></td>
                                    <td >{each.name}</td>
                                    <td>{each.employeeid}</td>
                                    <td>{each?.position}</td>
                                    <td>{each?.performance || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Performance
