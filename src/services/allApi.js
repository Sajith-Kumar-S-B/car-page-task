


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