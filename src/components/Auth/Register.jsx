import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginAPI, registerAPI } from '../../services/allApi'

function Register({register}) {
    const [userData,setUserData] = useState({
        username:"",email:"",password:"",phone:""
      })
      const [isUsernameValid, setisUsernameValid] = useState(true);
      const [isEmailValid, setisEmailValid] = useState(true);
      const [isPasswordValid, setisPasswordValid] = useState(true);
      const [isPhoneValid, setisPhoneValid] = useState(true);

      const navigate = useNavigate()
    const isRegisterForm = register?true:false



    const handleChange = (e)=>{
      const {name,value} = e.target
      setUserData({...userData,[name]:value})

      if (name === 'email') {
        const isValidEmail = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
        setisEmailValid(isValidEmail);
      }
  
      if (name === 'password') {
        const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value);
        setisPasswordValid(isValidPassword);
      }
  
      if( name === 'username'){
        const isValidUsername = /^[A-Za-z][A-Za-z0-9_]{7,15}$/i.test(value);
  
        setisUsernameValid(isValidUsername)
        
      }

      if(name === "phone"){
        const isValidPhone = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/i.test(value)
         setisPhoneValid(isValidPhone)
      }


    }
    const handleRegister = async (e)=>{

        e.preventDefault()
      
        const {username,email,password,phone} = userData



        
      
        if(!username || !email || !password ||!phone ||  !isEmailValid ||
          !isPasswordValid ||
          !isUsernameValid || !isPhoneValid ){
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
        if(!email || !password ||  !isEmailValid ||
          !isPasswordValid ||
          !isUsernameValid || !isPhoneValid ){
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
            <input  onChange={(e)=>handleChange(e)} name='username'  value={userData.username} className='rounded form-control' type="text" placeholder='Username' />
            </label>}
            {!isUsernameValid && isRegisterForm &&
              <div className='mb-3 text-danger'>
              *Invalid username
            </div>
            }
          
           <label className='mb-3 d-flex flex-column'>
            Email
           <input required onChange={(e)=>handleChange(e)} name='email' value={userData.email} className='rounded form-control' type="email" placeholder='Email' />
           {!isEmailValid &&
              <div className='mb-3 text-danger'>
              *Invalid Email
            </div>
            }
           </label>
           <label className='mb-3 d-flex flex-column'>
            Password
           <input required  name='password' onChange={(e)=>handleChange(e)} value={userData.password} className='rounded form-control' type="Password" placeholder='Password' />

           </label>
           {!isPasswordValid &&
              <div className='mb-3 text-danger'>
              *Invalid Password
            </div>
            }
         {isRegisterForm &&  <label className='mb-3 d-flex flex-column'>
            Phone Number
           <input required  name='phone'  onChange={(e)=>handleChange(e)} value={userData.phone} className='rounded form-control' type="tel" placeholder='Phone' />

           </label>}
           {!isPhoneValid && isRegisterForm &&
              <div className='mb-3 text-danger'>
              *Invalid Phone Number
            </div>
            }
          {isRegisterForm? <button type='submit' onClick={handleRegister} className='bg-dark rounded text-light p-2'>Signup</button>:<button type='submit' onClick={handleLogin} className='bg-dark rounded text-light p-2'>Login</button>}
           <div className='d-flex justify-content-between mt-2 align-items-center'>
           {isRegisterForm? <p>Already Registered? <span><Link to={'/login'}>Login</Link> </span></p>: <p>Don't have an account? <span><Link to={'/'}>Register</Link> </span></p>}
           </div>
            </div>
           

        </div>
    </div>
  )
}

export default Register