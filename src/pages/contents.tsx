import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPoints from "./addPoints";
import CustomerDetail from "./CustomerDetailPage";
import Redeem from "./redeem";
import { Tabs } from "antd";
import RedemptionForm from "./redeem";
import { VoidPoints } from "./voidPoints";
import Transactions from "./transactions";
import CustomerList from "./customerList";
import { deleteCookie } from "../services/utils";

function Contents() {
  const [activeKey, setActiveKey] = useState("1"); // Manage active tab state

  const logout = () => {
    deleteCookie("Token");
    window.location.reload();
  };

  return (
    <div className="px-4 ">
      <div>
        {/* Tabs for navigation */}
        <Tabs
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)} // Update active tab
        >
          <Tabs.TabPane tab="Customer Details" key="1" />
          <Tabs.TabPane tab="Add Points" key="2" />
          <Tabs.TabPane tab="Redeem" key="3" />
          <Tabs.TabPane tab="Void Points" key="4" />
          <Tabs.TabPane tab="Transactions" key="5" />
          <Tabs.TabPane tab="Logout" key="6" />
        </Tabs>

        {/* Content switching based on active tab */}
        <div className="mt-4">
          {activeKey === "1" && <CustomerList tabChange={setActiveKey} />}
          {/* {activeKey === "1" && <CustomerDetail  />} */}
          {activeKey === "2" && <AddPoints tabChange={setActiveKey} />}
          {activeKey === "3" && <RedemptionForm tabChange={setActiveKey} />}
          {activeKey === "4" && <VoidPoints tabChange={setActiveKey} />}
          {activeKey === "5" && <Transactions tabChange={setActiveKey} />}
          {activeKey === "6" && (
            <>
              {logout()}
              <span>Logging out...</span> {/* Optional: Add user feedback */}
            </>
          )}
        </div>
      </div>

      <div onClick={() => logout()}>Logout</div>
    </div>
  );
}

export default Contents;
//   return (
//     <div>

//        <Routes>
//          {/* <Route path="/" element={<HomePage/>} /> */}
//          {/* <Route path="/login" element={<LoginPage />} /> */}
//          {/* <Route path="/customer/:email" element={<CustomerDetail />} /> */}
//          <Route path="/" element={<CustomerDetail />} />
//          <Route path="/addpoints" element={<AddPoints />} />
//          <Route path="/redeem" element={<Redeem />} />

//        </Routes>

//     </div>
//   )
// }

// export default Contents
