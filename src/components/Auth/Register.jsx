import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginAPI, registerAPI } from '../../services/allApi'

function Register({register}) {
    const [userData,setUserData] = useState({
        username:"",email:"",password:"",phone:""
      })
      const navigate = useNavigate()
    const isRegisterForm = register?true:false

    const handleRegister = async (e)=>{

        e.preventDefault()
      
        const {username,email,password,phone} = userData
      
        if(!username || !email || !password ||!phone){
          alert("Please fill the details")
        }else{
      
            const result = await registerAPI(userData)

            if(result.status===200){
              alert(`${result.data.username} has successfully registered`)
        
              setUserData({
                username:'',email:'',password:''
              })
                 navigate("/login")
            }else{
        
              alert(result.response.data)
              console.log(result);
            }
         
        }
      
      
      }

      const handleLogin = async (e)=>{
        e.preventDefault()
      const {email,password} = userData
        if(!email || !password){
          alert("Please fill the details")
        }else{
      
          const result = await LoginAPI(userData)
      
      
          
          if(result.status===200){
            // toast.success(`${result.data.username} has successfully registered`)
      
         sessionStorage.setItem("registeredUser",JSON.stringify(result.data.registeredUser))
         sessionStorage.setItem("token",result.data.token)
      
       
            setUserData({
            email:'',password:''
            })
               navigate("/company/add")
          }else{
      
            alert(result.response.data)
            console.log(result);
          }
      
        }
      
      }
      
      
      
  return (
    <div className='w-100'>
        <div className='d-flex justify-content-between align-items-center  w-75 shadow mt-5 mx-auto'>
            <div className='d-flex  w-100 p-3 justify-content-center align-items-center' >
                <img width={'100%'} src="https://noeticforce.com/wp-content/uploads/2023/06/kubernetes-for-mobile-applications.jpeg" alt="" />
            </div>
            <div className='d-flex flex-column w-75 p-3'>
           {isRegisterForm && <label className='mb-3 d-flex flex-column' >
                Username 
            <input  onChange={(e)=>setUserData({...userData,username:e.target.value})} value={userData.username} className='rounded form-control' type="text" placeholder='Username' />
            </label>}
           <label className='mb-3 d-flex flex-column'>
            Email
           <input required onChange={(e)=>setUserData({...userData,email:e.target.value})} value={userData.email} className='rounded form-control' type="email" placeholder='Email' />

           </label>
           <label className='mb-3 d-flex flex-column'>
            Password
           <input required minLength={5} pattern='[a-zA-Z0-9]*' onChange={(e)=>setUserData({...userData,password:e.target.value})} value={userData.password} className='rounded form-control' type="Password" placeholder='Password' />

           </label>
         {isRegisterForm &&  <label className='mb-3 d-flex flex-column'>
            Phone Number
           <input required pattern='^[789]\d{9}$' minLength={10} onChange={(e)=>setUserData({...userData,phone:e.target.value})} value={userData.phone} className='rounded form-control' type="tel" placeholder='Phone' />

           </label>}
          {isRegisterForm? <button type='submit' onClick={handleRegister} className='bg-dark rounded text-light p-2'>Signup</button>:<button type='submit' onClick={handleLogin} className='bg-dark rounded text-light p-2'>Login</button>}
           <div className='d-flex justify-content-between mt-2 align-items-center'>
           {isRegisterForm? <p>Already Registered? <span><Link to={'/login'}>Login</Link> </span></p>: <p>Don't have an account? <span><Link to={'/register'}>Register</Link> </span></p>}
           </div>
            </div>
           

        </div>
    </div>
  )
}

export default Register