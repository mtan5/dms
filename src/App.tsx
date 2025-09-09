import { RouterProvider, createHashRouter } from "react-router-dom";
import Root from './pages/Root';
import Loginpage from "./pages/login/LoginPage";
import { ClientPage } from "./pages/client/ClientPage";
//import AttendancePage from "./pages/attendance/AttendancePage";
import { SubsidyPage } from "./pages/subsidy/SubsidyPage";
import AttendanceFile from "./pages/attendance/AttendanceFile";
import { ProfilePage } from "./pages/profile/ProfilePage";

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,        
        element: <ClientPage />
      } ,
      {
        path:"/login",
        element: <Loginpage/>
      },
      {
        path:"/attendance",
        //element: <AttendancePage/>
        element: <AttendanceFile/>
      },
      {
        path:"/calculator",
        element: <SubsidyPage/>
      },
      {
        path:"/profile",
        element: <ProfilePage/>
      }                  
    ]
  }
]);

function App() {
  return (
    <RouterProvider router ={router}></RouterProvider>
  );
}

export default App
