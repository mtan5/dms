import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iAttendance } from "../types/iAttendance";
import { formatDate } from "../../hooks/utilityHooks";
import { iAttendanceLog } from "../types/iAttendanceLog";

const attendanceApi = createApi({
    reducerPath: "attendanceApi",
    baseQuery: fetchBaseQuery({
        //baseUrl:'http://localhost/dms',
        baseUrl: import.meta.env.VITE_api_base_url,
    }),
    tagTypes: ['AttendanceLogs'],    
    endpoints(builder){
        return{
            fetchAllChildAttendance:builder.query<iAttendance[], {dfrm:string, dto:string, userid: number}>({
                query: ({dfrm, dto, userid}) => {
                    return {
                        url: `/attendance/${userid}/0/${dfrm}/${dto}/`,
                        method:'GET'
                    };
                },
                providesTags: ['AttendanceLogs']
            }),
            addAttendanceLog:builder.mutation<number, iAttendanceLog>({
                query:(log:iAttendanceLog) => {
                    return{
                        url:'/attendance/',
                        method:'POST',
                        body:{
                            child_id: log.child_id,
                            attendance_date: log.attendance_date,
                            attendance_remarks: log.attendance_remarks,
                            attendance_time_in: log.attendance_time_in,
                            attendance_time_out:  log.attendance_time_out,
                            attendance_last_modified: formatDate(new Date()),
                            attendance_loggedby_userid: log.attendance_loggedby_userid
                        }
                    }
                },
                invalidatesTags:['AttendanceLogs']
            }), 
            deleteAttendanceById:builder.mutation<boolean, number>({
                query:(id:number) => {
                    return{
                        //TODO NOTE: url for deleting attendance log has changed, needs to update this line below
                        url:`/attendance/0/${id}/`, 
                        method:'DELETE'
                    }
                },
                invalidatesTags:['AttendanceLogs']
            }),
            updateAttendanceLog:builder.mutation<boolean, iAttendanceLog>({
                query:(log:iAttendanceLog) => {
                    return{
                        url:'/attendance/',
                        method:'PUT',
                        body:{
                            attendance_id: log.attendance_id,
                            child_id: log.child_id,
                            attendance_date: formatDate(new Date()),
                            attendance_remarks: log.attendance_remarks,
                            attendance_last_modified: log.attendance_last_modified,
                            attendance_time_in: log.attendance_time_in,
                            attendance_time_out:  log.attendance_time_out,
                            attendance_loggedby_userid: log.attendance_loggedby_userid
                        }
                    }
                },
                invalidatesTags:['AttendanceLogs']
            }),                       
        }
    }
});

const {useFetchAllChildAttendanceQuery, useAddAttendanceLogMutation, useDeleteAttendanceByIdMutation, useUpdateAttendanceLogMutation} = attendanceApi;
export {useFetchAllChildAttendanceQuery,  useAddAttendanceLogMutation, useDeleteAttendanceByIdMutation, useUpdateAttendanceLogMutation, attendanceApi};