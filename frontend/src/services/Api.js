import { commonrequest } from "./Apicall";
import {BASE_URL} from "./Helper"

export const registerfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
}

export const userGetFunc =async(search, gender, status, sort, page)=> {
    return await commonrequest ("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "")
}

export const singleUsergetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`, "");
}

export const editfunc = async(id, data, header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`, data, header);
}

export const deletefunc = async(id)=>{
    return await commonrequest("DELETE", `${BASE_URL}/user/edit/${id}`,  {});
}

export const statusChangefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/status/${id}`, {data})
}

export const exporttocsvfun = async()=>{
   return await commonrequest("GET", `${BASE_URL}/userexports`, "") 
}