import React, { useEffect, useState } from "react";
import { useCustomer } from "../hooks/useCustomer";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function AddPoints(props:any) {
  const { state, getCustomerList, getCustomerDetails, postPurchase } =
    useCustomer();
    const {redeemData}=state
  const navigate = useNavigate();

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

  const handleIssuePoints = (e: React.FormEvent) => {
    // e.preventDefault();
    // console.log("Form Data:", formData);
    // setIssueMode(true)
    // Add logic to handle form submission
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   // Add logic to handle form submission
  // };

  useEffect(() => {

    console.log(redeemData)
    const discount=redeemData?.data?.redeemData?.pos_redeem_amount
    setFormData((prev) => ({
      ...prev,
      discount: discount,
    }));


  }, [redeemData])
  
  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page
  };

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
    console.log(Object.values(itemEntry));

    const isEmpty = Object.values(itemEntry).every((item) => item === "");
    if (isEmpty) return;

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
    const isEmpty = Object.values(paymentEntry).every((item) => item === "");
    if (isEmpty) return;
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

    postPurchase(dataToSubmit, { phone: formData.phone }).then((res: any) => {
      console.log(res);
      if (res.success) {
        message.success("Points issued");
        // navigate("/");
        handleCancel()
        // props.tabChange('1')

      }
    });
    console.log("Form Data Submitted:", dataToSubmit);
    // Add logic to send data via POST request
  };

  const handleCancel = () => {
    navigate(-1);
    // props.tabChange('1')

    // const { name, value, type, checked } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: type === "checkbox" ? checked : value,
    // });
  };

  return (
    <div className="px-4 pb-4 rounded-md shadow-sm py-2 bg-white  ">
      {/* <div className="col-span-3 flex justify-end">
        <button
          onClick={() => handleGoBack()}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div> */}
      <form onSubmit={handleSubmit} className="  grid grid-cols-3 gap-4 ">
        {/* Email Input */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email <span> *</span>
          </label>
          <input
            type="email"
            id="email"

            name="email"
            value={formData.email}
            onChange={handleForm}
            placeholder="Enter email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Phone Input */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="phone"
          >
            Phone <span> *</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleForm}
            placeholder="Enter phone number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Points Input */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="points"
          >
            Points
          </label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleForm}
            placeholder="Enter points"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Amount Input */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="amount"
          >
            Amount
            <span> *</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleForm}
            placeholder="Enter amount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="amount"
          >
            Transaction No
          </label>
          <input
            type="number"
            id="transaction_no"
            name="transaction_no"
            value={formData.transaction_no}
            onChange={handleForm}
            placeholder="Enter Transaction No"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>


        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="amount"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleForm}
            placeholder="Enter discount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-3">
          <h2 className="font-semibold text-lg mb-4">Item Data</h2>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={itemEntry.name}
              onChange={handleItemChange}
              placeholder="Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="total_amount"
              value={itemEntry.total_amount}
              onChange={handleItemChange}
              placeholder="Total Amount"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="quantity"
              value={itemEntry.quantity}
              onChange={handleItemChange}
              placeholder="Quantity"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="unit_amount"
              value={itemEntry.unit_amount}
              onChange={handleItemChange}
              placeholder="Unit Amount"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="sku"
              value={itemEntry.sku}
              onChange={handleItemChange}
              placeholder="SKU"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="category"
              value={itemEntry.category}
              onChange={handleItemChange}
              placeholder="Category"
              className="p-2 border rounded"
            />
          </div>
          <button
            type="button"
            onClick={addItem}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Item
          </button>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Added Items:</h3>
            <ul className="list-disc list-inside">
              {formData.item_data.map((item: any, index) => (
                <li key={index}>
                  {item.name} - ${item.total_amount} (Qty: {item.quantity},
                  Unit: ${item.unit_amount}, SKU: {item.sku}, Category:{" "}
                  {item.category})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Data Section */}
        <div className="col-span-3">
          <h2 className="font-semibold text-lg mb-4">Payment Data</h2>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={paymentEntry.name}
              onChange={handlePaymentChange}
              placeholder="Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="amount"
              value={paymentEntry.amount}
              onChange={handlePaymentChange}
              placeholder="Amount"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="description"
              value={paymentEntry.description}
              onChange={handlePaymentChange}
              placeholder="Description"
              className="p-2 border rounded"
            />
          </div>
          <button
            type="button"
            onClick={addPayment}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Payment
          </button>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Added Payments:</h3>
            <ul className="list-disc list-inside">
              {formData.payment_data.map((payment: any, index) => (
                <li key={index}>
                  {payment.name} - ${payment.amount} ({payment.description})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-3 flex justify-end items-center gap-4 ">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>

        {/* Submit Button */}
        {/* <div className="col-span-3 flex justify-end items-end mt-4">
     <button
       type="submit"
       className="bg-blue-500 w-[120px] text-white py-2 px-8 text-sm rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
     >
       Send
     </button>
   </div> */}
      </form>
    </div>
  );
}

export default AddPoints;
