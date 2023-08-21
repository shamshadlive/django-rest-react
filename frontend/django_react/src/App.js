import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserWrapper from "./Components/user/UserWrapper/UserWrapper";
import AdminWrapper from "./Components/admin/AdminWrapper/AdminWrapper";
import { Provider } from "react-redux";
import userStore from "./Redux/userStore";
function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/*" element={
         <Provider store={userStore}>
        <UserWrapper />
        </Provider>
        }>
          </Route> 

        <Route path="admincontrol/*" element={<AdminWrapper />}></Route>

      </Routes>

     
    </BrowserRouter>
  );
}

export default App;
