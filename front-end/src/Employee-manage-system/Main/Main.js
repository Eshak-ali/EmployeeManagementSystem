import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Context, { Employee } from '../login-register/context'
import Login from '../login-register/Login'
import Register from '../login-register/Register'
import Dashboard from '../Component/Dashboard'
import Admindashboard from '../Component/admin/admindashboard'
import Leave from '../Component/employee/Leave'
import Emptask from '../Component/employee/Emptask'
import Performance from '../Component/employee/Performance'
import Navbar from '../Navbar/navbar'
import Taskpending from '../Component/employee/task/Taskpending'
import Taskdoing from '../Component/employee/task/Taskdoing'
import Tasktimesup from '../Component/employee/task/Tasktimesup'
import Taskcomplete from '../Component/employee/task/Taskcomplete'
import AdminNavbar from '../Component/admin/adminNavbar'
import Adminemployee from '../Component/admin/Adminemployee'
import Adminleave from '../Component/admin/Adminleave'
import Adminperformance from '../Component/admin/Adminperformance'
import Admintask from '../Component/admin/Admintask'
import Adminsalary from '../Component/admin/Adminsalary'
import Admintaskview from '../Component/admin/admintaskview'
import Adminview from '../Component/admin/Adminview'
import Leavecard from '../Component/admin/Leavecard'




const Authentication = ({ children }) => {
  const { authen } = useContext(Employee);
  if (authen) {
    return children;
  }
  if (!authen) {
    return <Navigate to='/' />;
  }
}

const Main = () => {

  const { path, person } = useContext(Employee);
  return (
    <div>

      <Router>
        <Routes>
          <Route path={person === null ? '/' : '/login'} element={<Login />} />
          <Route path='/register' element={<Register />} />



          <Route path={path === 'employee' ? '/' : '/employee'} element={
            <Authentication><Navbar /></Authentication>
          } >
            <Route index element={<Dashboard />} />
            <Route path='leave' element={<Leave />} />
            <Route path='emptask' element={<Emptask />}>
              <Route path='pending' element={<Taskpending />} />
              <Route path='doing' element={<Taskdoing />} />
              <Route path='timesup' element={<Tasktimesup />} />
              <Route path='completed' element={<Taskcomplete />} />
            </Route>
            <Route path='performance' element={<Performance />} />
          </Route> 

          <Route path={path === 'admin' ? '/' : '/admin'} element={<Authentication><AdminNavbar /></Authentication>} >
            <Route index element={<Admindashboard />} />
            <Route path='employeeDetail' element={<Adminemployee />} >
              <Route path='salary' element={<Adminsalary />} />
            </Route>
            <Route path='leave' element={<Adminleave />} >
              <Route index element={<Leavecard />} />
            </Route>
            <Route path='performance' element={<Adminperformance />} >
            </Route>
            <Route path='task' element={<Admintask />} >
              <Route index element={<Admintaskview />} />
              <Route path='assign' element={<Adminview />} />
            </Route>
          </Route>

        </Routes>
      </Router>

    </div>
  )
}

export default Main
