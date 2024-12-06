import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomer } from "../hooks/useCustomer";
import { message } from "antd";

export const VoidPoints = (props:any) => {
  const { state, voidTransac } = useCustomer();

  const param: any = useParams();
  const navigate = useNavigate();

  console.log(props)


  const [formData, setFormData] = useState({
    transactionId:param.id,
    transactionNo: "",
  });


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    const dataToSubmit = {
      ...formData,
    };

    voidTransac(dataToSubmit, { transaction_id: formData.transactionId }).then((res: any) => {
      console.log(res);
      if (res.success) {
          message.success("transaction voided  ");

          navigate("/");
          props.tabChange('5')
        
      }
    });
    // Add your submission logic here
  };

  const handleCancel = () => {
    setFormData({
      transactionId: "",
      transactionNo: "",
    });
    navigate("/");
    props.tabChange('5')
    console.log("Form Reset");
  };

  return (
    <div className="p-4  mx-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Void Points
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Transaction ID */}
        <div className="mb-4">
          <label
            htmlFor="transactionId"
            className="block text-gray-700 font-medium mb-2"
          >
            Transaction ID
          </label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Transaction ID"
          />
        </div>

        <div >Or</div>

        {/* Transaction No */}
        <div className="mb-4 mt-3">
          <label
            htmlFor="transactionNo"
            className="block text-gray-700 font-medium mb-2"
          >
            Transaction No
          </label>
          <input
            type="text"
            id="transactionNo"
            name="transactionNo"
            value={formData.transactionNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Transaction No"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};