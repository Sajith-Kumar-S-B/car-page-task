


import { SERVER_URL } from "./serverUrl"
import { commonApi } from "./commonApi"

// register

export const registerAPI = async(user)=>{
    return await commonApi("POST",`${SERVER_URL}/register`,user,"")
}


// login


export const LoginAPI = async(user)=>{
    return await commonApi("POST",`${SERVER_URL}/login`,user,"")
}


// add company

export const AddCompanyAPI = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/company/add`,reqBody,reqHeader)
}


// get company

export const getCompanyAPI = async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/company/get`,"",reqHeader)
}

// delete company

export const deleteCompanyAPI = async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/company/${id}`,{},reqHeader)
}



// add variant

export const AddVariantAPI = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/variant/add`,reqBody,reqHeader)
}


// get variant

export const getVariantAPI = async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/variant/get`,"",reqHeader)
}


// delete variant

export const deleteVariantAPI = async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/variant/${id}`,{},reqHeader)
}

