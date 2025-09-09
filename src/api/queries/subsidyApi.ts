import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iSubsidy } from "../types/iSubsidy";

const subsidyApi = createApi({
    reducerPath: "subsidyApi",
    baseQuery: fetchBaseQuery({
        //baseUrl:'http://localhost/dms',
        baseUrl: import.meta.env.VITE_api_base_url,
    }),
    endpoints(builder){
        return{
            fetchAllSubsidies:builder.query<iSubsidy[], void>({
                query: () => {
                    return {
                        url: `/subsidy/`,
                        method:'GET'
                    };
                }
            })                     
        }
    }
});

const {useFetchAllSubsidiesQuery} = subsidyApi;
export {subsidyApi, useFetchAllSubsidiesQuery}