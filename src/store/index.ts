import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSliceReducer, setUserName, setPassword, setUserId } from "./slices/userSlice";
import {clientSliceReducer, setSearchClient, setClientData, setSelectedClient} from './slices/clientSlice';
import {setParents, setChildren, setFamilyName, setStreet, setCity, setPostal, setIncome, setFamilyId, setValidationErrors, clientFormSliceReducer} from './slices/clientFormSlice';
import { userApi } from "../api/queries/userApi";
import { fileApi } from "../api/queries/filApi";
import { clientApi } from "../api/queries/clientApi";
import { childApi } from "../api/queries/childApi";
import { attendanceApi} from "../api/queries/attendanceApi";
import { setNavPage, navPageSliceReducer } from "./slices/navSlice";
import { setAttendanceChildId, setSearchAttendanceLog, setAttendanceLogDate, setSelectedChildFirstName, setSelectedChildLastName, setSelectedChildId, setAttendanceLoggedByUserId, setAttendanceTimeIn, setAttendanceTimeOut, setAttendanceRemarks, attendanceSliceReducer, setAttendanceLog } from "./slices/attendanceSlice";
import { subsidyApi } from "../api/queries/subsidyApi";
import { subsidySliceReducer, setAnnualIncome, setMonthlyCharge, setEstimateCharge, setChildAge, setGrantAmount, setSubsidyAmount } from "./slices/subsidySlice";
import { grantApi } from "../api/queries/grantApi";
import { childSliceReducer, setChildData, setSearchChild, setSelectedChild } from "./slices/childSlice";
import { attendanceMonthlyApi } from "../api/queries/attendanceMonthlyApi";

const store = configureStore({
    reducer:{   
        clientForm: clientFormSliceReducer,
        userCredentials: userSliceReducer,
        client:clientSliceReducer,
        child: childSliceReducer,   
        navPage: navPageSliceReducer,
        attendance: attendanceSliceReducer,
        subsidy: subsidySliceReducer,
        [userApi.reducerPath]: userApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [childApi.reducerPath]: childApi.reducer,
        [attendanceApi.reducerPath]: attendanceApi.reducer,
        [subsidyApi.reducerPath]: subsidyApi.reducer,
        [grantApi.reducerPath]: grantApi.reducer,
        [fileApi.reducerPath]: fileApi.reducer,
        [attendanceMonthlyApi.reducerPath]: attendanceMonthlyApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(clientApi.middleware)
        .concat(childApi.middleware)
        .concat(attendanceApi.middleware)
        .concat(subsidyApi.middleware)
        .concat(grantApi.middleware)
        .concat(fileApi.middleware)
        .concat(attendanceMonthlyApi.middleware);
    },
});

setupListeners(store.dispatch);
export type IRootState = ReturnType<typeof store.getState>;
export {setNavPage}
export {
    setAttendanceLog
    ,setAttendanceChildId
    ,setSearchAttendanceLog
    ,setAttendanceLogDate
    ,setSelectedChildFirstName
    ,setSelectedChildLastName
    ,setSelectedChildId
    ,setAttendanceLoggedByUserId
    ,setAttendanceTimeIn
    ,setAttendanceTimeOut
    ,setAttendanceRemarks}
export {setAnnualIncome, setMonthlyCharge, setEstimateCharge, setChildAge, setGrantAmount, setSubsidyAmount}
export {store, setUserName, setPassword, setUserId, setSearchClient, setClientData, setSelectedClient, setSelectedChild, setSearchChild, setChildData};
export {setParents, setChildren, setFamilyName, setStreet, setCity, setPostal, setIncome, setFamilyId, setValidationErrors};
export {useFetchAllSubsidiesQuery} from "../api/queries/subsidyApi";
export {useFetchAllGrantsQuery} from "../api/queries/grantApi";
export {useFetchUploadedFilesQuery, useUploadFileMutation, useDeleteFileMutation} from "../api/queries/filApi";
export {useFetchUserMutation, useGetUserQuery} from "../api/queries/userApi";
export {useFetchAllChildQuery, useFetchChildQuery} from "../api/queries/childApi";
export {useFetchAttendanceMonthlyLogQuery, useFetchAttendanceMonthlyLogByChildIdQuery, useAddAttendanceMonthlyLogMutation, useDeleteAttendanceMonthlyLogByIdMutation, useUpdateAttendanceMonthlyLogMutation} from "../api/queries/attendanceMonthlyApi";
export {useFetchAllChildAttendanceQuery,  useAddAttendanceLogMutation, useDeleteAttendanceByIdMutation, useUpdateAttendanceLogMutation} from "../api/queries/attendanceApi";
export {useFetchAllClientsQuery, useFetchClientQuery, useAddClientMutation, useDeleteClientMutation, useUpdateClientMutation} from "../api/queries/clientApi";