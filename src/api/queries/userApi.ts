import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { iUserLogin } from "../types/iUserLogin";

const userApi = createApi({
    reducerPath:"userApi", 
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_api_base_url,
        //baseUrl:'http://localhost/dms',
        //mode:"cors",//for DEV
        //credentials: "include"
    }),    
    endpoints(builder){
        return{
            fetchUser:builder.mutation({ 
                query: (user: iUserLogin) =>{   
                    //console.log(user);                 
                    return {
                        url: "/user",
                        method:'POST',
                        body:{
                            username:user.user_name,
                            password:user.user_password
                        }
                    };
                }               
            }),
            getUser:builder.query({
                query: () =>{
                    return{
                        url: `/user`,
                        method:'GET',
                    };
                }
            })            
        };
    },
});

const {useFetchUserMutation, useGetUserQuery} = userApi;
export {userApi, useFetchUserMutation, useGetUserQuery};
