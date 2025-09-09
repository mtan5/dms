import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iChild } from "../types/iChild";

const childApi = createApi({
    reducerPath:"childApi", 
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_api_base_url,
    }),
    tagTypes: ['Families', 'Family'],
    endpoints(builder){
        return{
            fetchAllChild:builder.query<iChild[],number>({ 
                query: (userid : number) =>{   
                    return {
                        url: `/child/${userid}/0/`,
                        method:'GET'
                    };
                },
                providesTags:['Families']         
            }),
            fetchChild:builder.query<iChild, number>({ 
                query: (id : number) =>{   
                    return {
                        url: `/child/${id}/`,
                        method:'GET'
                    };
                },
                providesTags:['Family']
            })   
        };
    },
});

const {useFetchAllChildQuery, useFetchChildQuery} = childApi;
export {childApi, useFetchAllChildQuery, useFetchChildQuery};