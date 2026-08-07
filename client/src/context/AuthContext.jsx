import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";

import API from "../utils/axios";


// CREATE CONTEXT

export const AuthContext = createContext();



// CUSTOM HOOK

export const useAuth = ()=>{

return useContext(AuthContext);

};




// AUTH PROVIDER

export const AuthProvider = ({children})=>{


const [user,setUser]=useState(null);

const [loading,setLoading]=useState(true);





// LOAD USER FROM STORAGE

useEffect(()=>{


const token = localStorage.getItem("token");

const storedUser = localStorage.getItem("user");



if(token && storedUser){

setUser(
JSON.parse(storedUser)
);

}


setLoading(false);


},[]);







// LOGIN FUNCTION

const login = async(credentials)=>{


const response = await API.post(

"/auth/login",

credentials

);



console.log(
"LOGIN DATA:",
response.data
);



localStorage.setItem(

"token",

response.data.token

);



localStorage.setItem(

"user",

JSON.stringify(response.data.user)

);



console.log(

"LOCAL STORAGE TOKEN:",

localStorage.getItem("token")

);



setUser(
response.data.user
);



return response.data;


};









// REGISTER FUNCTION

const register = async(data)=>{


const response = await API.post(

"/auth/register",

data

);


return response.data;


};









// LOGOUT FUNCTION

const logout = ()=>{


localStorage.removeItem(
"token"
);


localStorage.removeItem(
"user"
);


setUser(null);


};









return(

<AuthContext.Provider


value={{

user,

setUser,

login,

register,

logout,

loading

}}


>


{children}


</AuthContext.Provider>


);


};