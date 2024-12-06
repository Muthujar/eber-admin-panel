import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import CustomerDetailPage from "./components/CustomerDetailPage";
import LoginPage from "./pages/loginpage";
import CustomerDetail from "./pages/CustomerDetailPage";
import HomePage from "./pages/HomePage";
import AddPoints from "./pages/addPoints";

const App = () => {
  return (
<HomePage/>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage/>} />
    //     {/* <Route path="/login" element={<LoginPage />} /> */}
    //     {/* <Route path="/customer/:email" element={<CustomerDetail />} /> */}
    //     <Route path="/customer/:phone" element={<CustomerDetail />} />
    //     <Route path="/addpoints" element={<AddPoints />} />

    //   </Routes>
    // </Router>
  );
};

export default App;