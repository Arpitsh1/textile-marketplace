// Save Token

export const saveToken=(token)=>{

localStorage.setItem("token",token);

};


// Get Token

export const getToken=()=>{

return localStorage.getItem("token");

};


// Remove Token

export const removeToken=()=>{

localStorage.removeItem("token");

};


// Save User

export const saveUser=(user)=>{

localStorage.setItem(

"user",

JSON.stringify(user)

);

};


// Get User

export const getUser=()=>{

const user=localStorage.getItem("user");

return user?JSON.parse(user):null;

};


// Remove User

export const removeUser=()=>{

localStorage.removeItem("user");

};