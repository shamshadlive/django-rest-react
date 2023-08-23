import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserWrapper from "./Components/user/UserWrapper/UserWrapper";
import AdminWrapper from "./Components/admin/AdminWrapper/AdminWrapper";
import { Provider } from "react-redux";
import userStore from "./Redux/userStore";
function App() {
  return (
    <BrowserRouter>
    <Provider store={userStore}>
      <Routes>
        <Route path="/*" element={<UserWrapper />}>
          </Route> 

        <Route path="admincontrol/*" element={<AdminWrapper />}></Route>

      </Routes>
    </Provider>
     
    </BrowserRouter>
  );
}

export default App;
