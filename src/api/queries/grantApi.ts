import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iGrant } from "../types/iGrant";

const grantApi = createApi({
    reducerPath: "grantApi",
    baseQuery: fetchBaseQuery({
        //baseUrl:'http://localhost/dms',
        baseUrl: import.meta.env.VITE_api_base_url,
    }),
    endpoints(builder){
        return{
            fetchAllGrants:builder.query<iGrant[], void>({
                query: () => {
                    return {
                        url: `/grant/`,
                        method:'GET'
                    };
                }
            })                     
        }
    }
});

const {useFetchAllGrantsQuery} = grantApi;
export {grantApi, useFetchAllGrantsQuery}