import API from "../utils/axios";



export const register=async(formData)=>{

const response=

await API.post(

"/auth/register",

formData

);

return response.data;

};



export const login=async(formData)=>{

const response=

await API.post(

"/auth/login",

formData

);

return response.data;

};