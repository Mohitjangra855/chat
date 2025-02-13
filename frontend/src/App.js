import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
// import Navbar from './Components/Includes/Navbar';
// import Footer from './Components/Includes/Footer';
import Home from "./Components/Home/Home";
import Show from "./Components/Show/Show";
import Chats from "./Components/Chats/Chats";
import { VerifyUser } from "./utils";
import Message from "./Components/Chats/Message";

const App = () => {
  return (
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Navigate to="/api/cars" />} />
          <Route path="/api/cars" element={<Home />} />
          <Route path="/api/cars/see/:id" element={<Show />} />
          <Route path="/api/auth/register" element={<Signup />} />
          <Route path="/api/auth/login" element={<Login />} />
        
          <Route element={<VerifyUser />}>
            <Route path="/api/user/message" element={<Message />} />
            <Route path="/api/message/:id" element={<Chats />} />
          </Route>

          {/* <Route path='/api/message/:id' element={<Home/>} /> */}
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
   
  );
};

export default App;
