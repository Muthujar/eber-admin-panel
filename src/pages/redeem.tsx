import React, { useEffect, useState } from "react";
import { useCustomer } from "../hooks/useCustomer";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

const RedemptionForm = (props: any) => {
  const { state, redeemRewardPoints } = useCustomer();
  const navigate = useNavigate();
  const param: any = useParams();

  const { customers, total, customerDetails, error, loading } = state;
  const redeemObj = customerDetails?.redeemable_list[param?.id] ?? "";
  //   console.log(customerDetails.redeemable_list)
  const [phone, setPhone] = useState(customerDetails?.phone_format ?? "");

  const [formData, setFormData] = useState({
    redeem_code: redeemObj.redeem_code ?? "",
    verify_only: false,
    amount: "",
    custom_store_id: "",
    custom_staff_id: "",
    transaction_no: "",
    pos_redeem_method: "",
    pos_redeem_percentage: "",
    pos_redeem_amount: "",
    pos_redeem_sku: "",
    note: "",
  });


  useEffect(()=>{

    if (param.id && !formData.redeem_code) navigate(-1)


  },[])

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      setPhone(value);
    } else
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
  };

  const handleCancel = () => {
   if (param.id)navigate(-1);
   else navigate('/')

    // const { name, value, type, checked } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: type === "checkbox" ? checked : value,
    // });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const dataToSubmit = {
      // ...formData,
      redeem_code: formData.redeem_code,
      verify_only: formData.verify_only,
      amount: formData.amount,
    };

    redeemRewardPoints(dataToSubmit, { phone: phone })
      .then((res: any) => {
        console.log(res);

        if (res?.success) {
          if (res.data.verify_only) {
            setFormData({
              ...formData,
              verify_only: !res.data.verify_only,
            });

            message.success("Redeem code verified, submit to redeem ");
          } else {
            message.success("Reward redeemed");
            console.log(props);
            // props.tabChange("2");
            param.id && navigate("/");
          }
        } else {
          message.error("error occured");
        }
      })
      .catch((error: any) => {
        const err = error?.errorDetails?.error?.exception[0];
        console.log(error);
        message.error(error ?? "error occured");
      });
  };

  return (
    <div className="px-4 pb-6 bg-white rounded-lg shadow-md  mx-auto">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        {redeemObj.redeem_name}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {/* Redeem Code */}
        <div>
          <label
            htmlFor="redeem_code"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Redeem Code
            <span>*</span>
          </label>
          <input
            type="text"
            id="redeem_code"
            name="redeem_code"
            value={formData.redeem_code}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter redeem code"
            disabled={param.id}
          />
        </div>

        {/* Phone Number */}

        {param.id && (


        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter phone number"
            disabled
          />
        </div>
)}

        {/* POS Redeem Method */}
        {param.id && (
          <div>
            <label
              htmlFor="pos_redeem_method"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Redeem Method
            </label>
            <select
              id="pos_redeem_method"
              name="pos_redeem_method"
              value={redeemObj.pos_redeem_method}
              onChange={handleChange}
              disabled
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select method</option>
              <option value="percentage">Percentage</option>
              <option value="amount">Amount</option>
            </select>
          </div>
        )}

        {/* POS Redeem Percentage */}

        {redeemObj.pos_redeem_method === "percentage" && (
          <div>
            <label
              htmlFor="pos_redeem_percentage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Redeem Percentage
            </label>
            <input
              type="number"
              disabled
              id="pos_redeem_percentage"
              name="pos_redeem_percentage"
              value={redeemObj.pos_redeem_percentage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter percentage"
            />
          </div>
        )}

        {redeemObj.pos_redeem_method === "amount" && (
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Redeem Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              disabled
              value={redeemObj.pos_redeem_amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter redeem amount"
            />
          </div>
        )}

        {/* POS Redeem SKU */}

        {param.id &&
          redeemObj.pos_redeem_sku !== "" &&
          redeemObj.pos_redeem_sku !== null && (
            <div>
              <label
                htmlFor="pos_redeem_sku"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Redeem SKU
              </label>
              <input
                type="text"
                id="pos_redeem_sku"
                name="pos_redeem_sku"
                value={redeemObj.pos_redeem_sku}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter SKU"
              />
            </div>
          )}

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bill Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter bill amount"
          />
        </div>

        {/* Note */}
        <div className="md:col-span-3">
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Note
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Add notes (optional)"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="md:col-span-3 flex justify-end items-center gap-4 mt-2">
          {/* Verify Code Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="verify_only"
              name="verify_only"
              checked={formData.verify_only}
              onChange={handleChange}
              className="mr-2 w-[1rem] h-[20px]"
            />
            <label
              htmlFor="verify_only"
              className="text-sm font-medium text-gray-700"
            >
              Verify code before submit
            </label>
          </div>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>

          {/* Submit/Verify Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {formData.verify_only ? "Verify" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RedemptionForm;
