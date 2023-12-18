import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddCompanyAPI } from "../services/allApi";

function CarPage() {

    const [show, setShow] = useState(false);
    const [token,setToken] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [companyDetails,setCompanyDetails] = useState({
        title:""
      })


      useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }else{
          setToken("")
        }
},[])

    const handleAdd = async (e)=>{
        e.preventDefault()
  
     const {title} = companyDetails
  
     if(!title ){
      alert("Please fill the details")
     }else{
       
  
        if(token){
            const reqHeader = {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
      
     
  
      try{  const result = await AddCompanyAPI(reqHeader)
         if(result.status ===200){
          handleClose()
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
  return (
    <div className="p-5 mt-5">
      <h5> Companies</h5>
   <div className="d-flex">
   <div className="company w-25 d-flex flex-column shadow p-5 border ms-3 mt-5">
        <div className="maruti">
         <div className="d-flex justify-content-between align-items-center">
         <h6 className="p-2 mb-3">Maruti </h6>
         <i class="fa-solid fa-trash text-primary"></i>  
         </div>
         
          <div className="maruti-cars">
            <ul>
                <li>Maruti Ciaz</li>
                <li>Maruti Brezza</li>
                <li>Maruti Dzire</li>
                <li> <div onClick={handleShow}>
         
         <h6  style={{backgroundColor:"#151f63"}} className="p-2 mb-3 border text-white">Add New car <span><i class="fa-solid fa-plus"></i></span></h6>
       </div></li>
            </ul>
          </div>

        </div>
        <div className="ford">
         
         <h6 className="p-2 mb-3 border">Maruti Ciaz</h6>
         <div className="ford-cars"><ul>
                <li>Ford Figo</li>
                <li>Ford Aspire</li>
                <li>Ford Mustang</li>
                <li> <div onClick={handleShow}>
         
         <h6  style={{backgroundColor:"#151f63"}} className="p-2 mb-3 border text-white">Add New car <span><i class="fa-solid fa-plus"></i></span></h6>
       </div></li>
            </ul></div>
       </div>  <div>
         
         <h6 className="p-2 mb-3 border">Maruti Brezza</h6>
       </div>
       <div>
         
         <h6 className="p-2 mb-3 border">Maruti Dzire</h6>
       </div>

       <div onClick={handleShow}>
         
         <h6  style={{backgroundColor:"#151f63"}} className="p-2 mb-3 border text-white">Add Company <span><i class="fa-solid fa-plus"></i></span></h6>
       </div>
        


      </div>
      <div className="company w-25 d-flex flex-column shadow p-5 border ms-3 mt-5">
        <div className="maruti">
         
        <div className="d-flex justify-content-between align-items-center">
         <h6 className="p-2 mb-3">Ford </h6>
         <i class="fa-solid fa-trash text-primary"></i>  
         </div>
          <div className="maruti-cars">
            <ul>
                <li>Maruti Ciaz</li>
                <li>Maruti Brezza</li>
                <li>Maruti Dzire</li>
                <li> <div onClick={handleShow}>
         
         <h6  style={{backgroundColor:"#151f63"}} className="p-2 mb-3 border text-white">Add New car <span><i class="fa-solid fa-plus"></i></span></h6>
       </div></li>
            </ul>
          </div>

        </div>
        <div className="ford">
         
         <h6 className="p-2 mb-3 border">Ford Mustang</h6>
         <div className="ford-cars"><ul>
                <li>Ford Figo</li>
                <li>Ford Aspire</li>
                <li>Ford Mustang</li>
                <li> <div onClick={handleShow}>
         
         <h6  style={{backgroundColor:"#151f63"}} className="p-2 mb-3 border text-white">Add New car <span><i class="fa-solid fa-plus"></i></span></h6>
       </div></li>
            </ul></div>
       </div>  <div>
         
         <h6 className="p-2 mb-3 border">Ford Figo</h6>
       </div>
       <div>
         
         <h6 className="p-2 mb-3 border">Ford Aspire</h6>
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
