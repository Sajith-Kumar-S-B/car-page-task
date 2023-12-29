import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddCompanyAPI, deleteCompanyAPI, getCompanyAPI } from "../services/allApi";

function CarPage() {

    const [show, setShow] = useState(false);
    const [token,setToken] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [companyDetails,setCompanyDetails] = useState({
        title:"",companyId:""
      })
      const [company,setCompany] = useState([])


      useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }else{
          setToken("")
        }

        getCompany()
},[])

    const handleAdd = async (e)=>{
        e.preventDefault()
  
     const {title,companyId} = companyDetails
  
     if(!title || !companyId ){
      alert("Please fill the details")
     }else{
       
     const reqBody = companyDetails
        if(token){
            const reqHeader = {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
      
     
  
      try{  
        const result = await AddCompanyAPI(reqBody,reqHeader)
         if(result.status ===200){
          handleClose()
          alert("company Added Successfully")
          getCompany()
         }else{
          console.log(result);
          console.log(result.response.data);
          alert("Failed to add Company. Please try again.");
         }
        }catch(err){
          console.error("Error adding Company:", err);
          alert("An error occurred while adding the Company. Please try again.");
        }
  
      
      
     }
  
    }
      }


      const getCompany = async ()=>{

        if(sessionStorage.getItem('token')){
          const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Content-Type":"application/json", "Authorization":`Bearer ${token}`
          }
          const result = await getCompanyAPI(reqHeader)
          if(result.status===200){
            setCompany(result.data)
          }else{
            console.log(result);
            console.log(result.response.data);
          }
        }
       
      }


      const deleteCompany = async (id)=>{

       
          const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Content-Type":"application/json", "Authorization":`Bearer ${token}`
          }
          const result = await deleteCompanyAPI(id,reqHeader)
          console.log(result);
         if(result.status===200){
          getCompany()
         }else{
          console.log(result);
          console.log(result.response.data);
        }
     

    }

    console.log(company);
  return (
    <div className="p-5 mt-5">
      <h5> Companies</h5>
   <div className="d-flex">
   <div className="company w-25 d-flex flex-column shadow p-5 border ms-3 mt-5">
        <div className="maruti">
       { company?.length > 0 ? company.map(item=>(
        <div key={item?._id} className="d-flex justify-content-between align-items-center">
         <h6 className="p-2 mb-3">{item?.title}</h6>
         <button onClick={()=>deleteCompany(item._id)} className="btn" > <i className="fa-solid fa-trash text-primary"></i> </button>
         
         </div>
       )):(  <p className='text-danger mt-5'>No Companies Added</p>) }
         
          <div  className="maruti-cars">
            <ul>
                <li>Maruti Ciaz</li>
                <li>Maruti Brezza</li>
                <li>Maruti Dzire</li>
                </ul>
               

                  <div onClick={handleShow}>
         
         <h6  style={{backgroundColor:"#151f63"}} className="p-2 mb-3 border text-white">Add New car <span><i class="fa-solid fa-plus"></i></span></h6>
       </div>
           
          </div>

        </div>
     
       

       <div onClick={handleShow}>
         
         <h6  style={{backgroundColor:"#151f63"}} className="p-2 mb-3 border text-white">Add Company <span><i class="fa-solid fa-plus"></i></span></h6>
       </div>
        


      </div>
    
   </div>
     

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="w-100">
         <input value={companyDetails.companyId}  onChange={e=>setCompanyDetails({...companyDetails,companyId:e.target.value})} className="form-control mb-3" placeholder="Enter company Id"  type="text" name="" id="" />

            <input value={companyDetails.title}  onChange={e=>setCompanyDetails({...companyDetails,title:e.target.value})} className="form-control" placeholder="Enter company name"  type="text" name="" id="" />
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={handleAdd} variant="dark">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CarPage;
