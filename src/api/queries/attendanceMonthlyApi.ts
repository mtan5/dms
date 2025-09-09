import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { formatDate } from "../../hooks/utilityHooks";
import { iAttendanceMonthly } from "../types/iAttendanceMonthly";

const attendanceMonthlyApi = createApi({
    reducerPath: "attendanceMonthlyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_api_base_url,
    }),
    tagTypes: ['AttendanceMonthlyLogs'],    
    endpoints(builder){
        return{
            fetchAttendanceMonthlyLog:builder.query<iAttendanceMonthly[], {logyear:number, userid: number}>({
                query: ({logyear, userid}) => {
                    return {
                        url: `/attendancemonthly/${userid}/0/${logyear}/`,
                        method:'GET'
                    };
                },
                providesTags: ['AttendanceMonthlyLogs']
            }),
            fetchAttendanceMonthlyLogByChildId:builder.query<iAttendanceMonthly[], {logyear:number, childid: number}>({
                query: ({logyear, childid}) => {
                    return {
                        url: `/attendancemonthly/0/0/${logyear}/${childid}/`,
                        method:'GET'
                    };
                },
                providesTags: ['AttendanceMonthlyLogs']
            }),            
            addAttendanceMonthlyLog:builder.mutation<number, iAttendanceMonthly>({
                query:(log:iAttendanceMonthly) => {
                    return{
                        url:'/attendancemonthly/',
                        method:'POST',
                        body:{
                            child_id: log.child_id,
                            user_id: log.user_id,
                            attendance_monthly_hrs: log.attendance_monthly_hrs,
                            attendance_monthly_last_modified: formatDate(new Date()),
                            attendance_monthly_remarks: log.attendance_monthly_remarks,
                            attendance_monthly_logyear:  log.attendance_monthly_logyear,
                            attendance_monthly_logmonth: log.attendance_monthly_logmonth
                        }
                    }
                },
                invalidatesTags:['AttendanceMonthlyLogs']
            }), 
            deleteAttendanceMonthlyLogById:builder.mutation<boolean, {recid:number, userid: number}>({
                query:({recid, userid}) => {
                    return{
                        //TODO NOTE: url for deleting attendance log has changed, needs to update this line below
                        url:`/attendancemonthly/${userid}/${recid}/`, 
                        method:'DELETE'
                    }
                },
                invalidatesTags:['AttendanceMonthlyLogs']
            }),
            updateAttendanceMonthlyLog:builder.mutation<boolean, iAttendanceMonthly>({
                query:(log:iAttendanceMonthly) => {
                    return{
                        url:'/attendancemonthly/',
                        method:'PUT',
                        body:{
                            attendance_monthly_id: log.attendance_monthly_id,
                            child_id: log.child_id,
                            user_id: log.user_id,
                            attendance_monthly_hrs: log.attendance_monthly_hrs,
                            attendance_monthly_last_modified: formatDate(new Date()),
                            attendance_monthly_remarks: log.attendance_monthly_remarks,
                            attendance_monthly_logyear:  log.attendance_monthly_logyear,
                            attendance_monthly_logmonth: log.attendance_monthly_logmonth
                        }
                    }
                },
                invalidatesTags:['AttendanceMonthlyLogs']
            }),                       
        }
    }
});

const {useFetchAttendanceMonthlyLogQuery, useFetchAttendanceMonthlyLogByChildIdQuery, useAddAttendanceMonthlyLogMutation, useDeleteAttendanceMonthlyLogByIdMutation, useUpdateAttendanceMonthlyLogMutation} = attendanceMonthlyApi;
export {useFetchAttendanceMonthlyLogQuery, useFetchAttendanceMonthlyLogByChildIdQuery,  useAddAttendanceMonthlyLogMutation, useDeleteAttendanceMonthlyLogByIdMutation, useUpdateAttendanceMonthlyLogMutation, attendanceMonthlyApi};