import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iFile } from "../types/iFile";

const fileApi = createApi({
    reducerPath: "fileApi",
        baseQuery: fetchBaseQuery({
            baseUrl: import.meta.env.VITE_api_base_url,
        }),
        tagTypes: ['FileUploads'],
        endpoints(builder){
            return {
                fetchUploadedFiles:builder.query<iFile[], {userid: number, familyid: number, ctgryid: number}>({
                    query: ({userid, familyid, ctgryid}) => {
                        return {
                            url: `/file/${userid}/${familyid}/${ctgryid}/`,
                            method:'GET'
                        };
                    },
                    providesTags: ['FileUploads']
                }),                
                UploadFile:builder.mutation<number, {userid: number, familyid: number ,ctgryid: number, formdata: FormData}>({
                    query:({userid, familyid, ctgryid, formdata}) => {
                        return{
                            url:`/file/${userid}/${familyid}/${ctgryid}/`,
                            method:'POST',
                            body:formdata
                        }
                    },
                    invalidatesTags:['FileUploads']
                }),
                deleteFile:builder.mutation<boolean, {fileid:number, filename:string}>({
                    query:({fileid, filename}) => {
                        return{
                            url:'/file/',
                            method:'DELETE',
                            body:{
                                fileid: fileid,
                                filename: filename
                            }
                        }
                    },
                    invalidatesTags:['FileUploads']
                })                                
            }
        }        
});

const {useUploadFileMutation, useFetchUploadedFilesQuery, useDeleteFileMutation} = fileApi;
export {useUploadFileMutation, useFetchUploadedFilesQuery, useDeleteFileMutation, fileApi};