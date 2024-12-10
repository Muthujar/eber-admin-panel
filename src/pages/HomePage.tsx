import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CustomerList from "./customerList";
// import CustomerList from "../components/CustomerList";
import search from "../assets/icons/search.svg";
import { useCustomer } from "../hooks/useCustomer";
import CustomerDetail from "./CustomerDetailPage";
import { postPurchaseDetails } from "../services/customerService";
import AddPoints from "./addPoints";
import Contents from "./contents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RedemptionForm from "./redeem";
import { VoidPoints } from "./voidPoints";

const HomePage = () => {
  const { state, getCustomerList, getCustomerDetails, postPurchase } =
    useCustomer();
  const { customers, total, customerDetails, error, loading } = state;
  const [formData, setFormData] = useState({
    user_id: "",
    amount: "",
    email: "",
    phone: "",
    points: "",
    transaction_no: "",
    custom_store_id: "",
    custom_staff_id: "",
    utc_transaction_created_at: "",
    tax: "",
    service_charge: "",
    discount: "",
    item_data: [], // For storing item data entries
    payment_data: [], // For storing payment data entries
  });
  const [itemEntry, setItemEntry] = useState({
    name: "",
    total_amount: "",
    quantity: "",
    unit_amount: "",
    sku: "",
    category: "",
  });

  const [paymentEntry, setPaymentEntry] = useState({
    name: "",
    amount: "",
    description: "",
  });
  const [issueMode, setIssueMode] = useState(false);

  const [isloading, setIsLoading] = useState(loading);

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    display_name: "",
    phone: "",
  });
  // useAuth(); // Check if the user is authenticated

  //   const handleLogout = () => {
  //     localStorage.removeItem("authToken");
  //     // history.push("/login"); // Redirect to login page after logout
  //     navigate('/login');

  //   };

  useEffect(() => {
    console.log(state);
    if (customerDetails) {
    }

    // setIsLoading(true);
    // getCustomerList(filters); // Fetch first page on mount
    // getCustomerList()
    // getCustomerDetails({phone:filters.phone});
  }, [state]);

  const handleChange = (e: any) => {
    const searchValue = e.target.value; // Assuming it's from an input field
    // dispatch(setLoading(true));
    setIsLoading(true);

    setFilters((prevFilters) => ({
      ...prevFilters,
      phone: searchValue,
    }));
  };

  const handleSearch = (e: any) => {
    console.log(filters.phone);
    getCustomerDetails({ phone: filters.phone });
  };

  const handleIssuePoints = (e: React.FormEvent) => {
    setIssueMode(true);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   // Add logic to handle form submission
  // };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addItem = () => {
    setFormData((prev: any) => ({
      ...prev,
      item_data: [...prev.item_data, itemEntry],
    }));
    setItemEntry({
      name: "",
      total_amount: "",
      quantity: "",
      unit_amount: "",
      sku: "",
      category: "",
    });
  };

  const addPayment = () => {
    setFormData((prev: any) => ({
      ...prev,
      payment_data: [...prev.payment_data, paymentEntry],
    }));
    setPaymentEntry({
      name: "",
      amount: "",
      description: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      item_data_json: JSON.stringify(formData.item_data),
      payment_data_json: JSON.stringify(formData.payment_data),
    };

    postPurchase(dataToSubmit, { phone: formData.phone });
    console.log("Form Data Submitted:", dataToSubmit);
    // Add logic to send data via POST request
  };

  return (
    <div className="px-5 py-2 bg-[#f4f6f8] h-full ">
      {/* <h1 className="font-semibold text-4xl mb-4">Loyalty Points POS</h1> */}
      <h1 className="font-bold text-5xl text-center text-gray-800 tracking-tight leading-tight mb-4 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
        Eber Loyalty Points 
      </h1>
      {/* <CustomerList /> */}
      {/* <button onClick={handleLogout}>Logout</button> */}
      <div className="bg-white pt-[10px] mx-[10px]">
        {/* <div className="relative   mb-4 w-full flex justify-between place-items-center">
      {!issueMode &&
          <div className="w-[400px] ml-[16px]  flex items-center border border-[#e9ebec] rounded-lg  overflow-hidden focus-within:ring focus-within:ring-blue-300">
            <img
              src={search}
              alt="Search"
              className="w-5 h-5 ml-3 text-gray-500"
            />
            <input
              type="text"
              className="py-2 px-3 w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Search customer by phone number"
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="ml-[2px w-[120px] py-[13px] text-sm font-medium text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Search
            </button>
          </div>
      }

          <div>
            <button
              onClick={(e) => handleIssuePoints(e)}
              className="mr-[16px] w-[200px] py-[13px] text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-nowrap"
            >
              {!issueMode?'Send Purchase/issue Points':"Cancel"}
            </button>
          </div>
        </div>


      {issueMode <CustomerDetail /> 
       </div>
      
        <AddPoints/> */}
        <Routes>
          // <Route path="/" element={<Contents />} />
          <Route path="/redeem/:id" element={<RedemptionForm />} />
          <Route path="/voidTransaction/:id" element={<VoidPoints />} />

          <Route path="/addpoints" element={<AddPoints />} />
          <Route path="/redeem" element={<RedemptionForm />} />

          <Route path="/ebercustomerDetail/:phone" element={<CustomerDetail/>} />

        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
