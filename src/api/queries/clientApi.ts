import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iClient } from "../types/iClient";

//for dev/testing
// const pause = (duration:number) =>{
//     return new Promise((resolve) => {
//         setTimeout(resolve, duration);
//     });
// };

const clientApi = createApi({
    reducerPath:"clientApi", 
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_api_base_url,
        //baseUrl:'http://localhost/dms',
        // fetchFn: async(...args) => { //fetch function  - overriding fecth function
        //     await pause(1000);
        //     return fetch(...args);
        // }
    }),
    tagTypes: ['Families', 'Family'],
    endpoints(builder){
        return{
            fetchAllClients:builder.query<iClient[],number>({ 
                query: (userid : number) =>{   
                    return {
                        url: `/client/${userid}/0/`,
                        method:'GET'
                    };
                },
                providesTags:['Families']         
            }),
            fetchClient:builder.query<iClient, number>({ 
                query: (id : number) =>{   
                    return {
                        url: `/client/${id}`,
                        method:'GET'
                    };
                },
                providesTags:['Family']
            }),
            addClient:builder.mutation<number, iClient>({
                query:(family:iClient) => {
                    return{
                        url:'/client/',
                        method:'POST',
                        body:{
                            family_id: -1,
                            family_name: family.family_name,
                            family_street: family.family_street,
                            family_city: family.family_city,
                            family_postal:  family.family_postal,
                            family_income: family.family_income,
                            user_id: family.user_id,
                            children: family.children,                            
                            parents: family.parents          
                        }
                    }
                },
                invalidatesTags:['Families']
            }),
            deleteClient:builder.mutation<boolean, iClient>({
                query:(family:iClient) => {
                    return{
                        url:'/client/',
                        method:'DELETE',
                        body:{
                            family_id: family.family_id,
                            family_name: family.family_name,
                            family_street: family.family_street,
                            family_city: family.family_city,
                            family_postal:  family.family_postal,
                            family_income: family.family_income,
                            children: family.children,
                            parents: family.parents                     
                        }
                    }
                },
                invalidatesTags:['Families']
            }),
            updateClient:builder.mutation<boolean, iClient>({
                query:(family:iClient) => {                  
                    console.log(family);                     
                    return{
                        url:'/client/',
                        method:'PUT',
                        body:{
                            family_id: family.family_id,
                            family_name: family.family_name,
                            family_street: family.family_street,
                            family_city: family.family_city,
                            family_postal:  family.family_postal,
                            family_income: family.family_income,
                            children: family.children,
                            parents: family.parents,
                            is_active: family.is_active                
                        }
                    }
                },
                invalidatesTags:['Families']
            }),     
        };
    },
});

const {useFetchAllClientsQuery, useFetchClientQuery, useAddClientMutation, useDeleteClientMutation, useUpdateClientMutation} = clientApi;
export {clientApi, useFetchAllClientsQuery, useFetchClientQuery, useAddClientMutation, useDeleteClientMutation, useUpdateClientMutation};