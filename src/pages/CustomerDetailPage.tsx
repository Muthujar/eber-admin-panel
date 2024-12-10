import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomer } from "../hooks/useCustomer";
import { message } from "antd";
import search from "../assets/icons/search.svg";
import { Flex, Spin } from "antd";
import { Modal, Form, InputNumber, Select, Button } from "antd";

const { Option } = Select;

const AdjustPointsModal = ({ visible, onCancel, onSubmit }: any) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values); // Call the onSubmit function with form values
        form.resetFields(); // Clear the form
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Adjust Points"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" name="adjust_points_form">
        {/* Action */}
        <Form.Item
          name="action"
          label="Action"
          rules={[
            {
              required: true,
              message: "Please select an action",
            },
          ]}
        >
          <Select placeholder="Select action">
            <Option value="add">Add</Option>
            <Option value="deduct">Deduct</Option>
          </Select>
        </Form.Item>

        {/* Points */}
        <Form.Item
          name="points"
          label="Points"
          rules={[
            {
              required: true,
              message: "Please enter the points amount",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter points"
            style={{ width: "100%" }}
            min={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CustomerDetail = () => {
  const { phone } = useParams();
  const [visible, setVisible] = useState(false);

  const {
    state,
    getCustomerList,
    adjustPoints,
    getCustomerDetails,
    resetState,
    postPurchase,
  } = useCustomer();
  const { customers, total, success, customerDetails, error, loading } = state;
  const [isloading, setIsLoading] = useState(loading);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<any | null>(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    display_name: "",
    phone: "",
  });

  useEffect(() => {
    console.log(phone);
    if (phone ) {
      !visible && getCustomerDetails({ phone: phone, list_redeemable: 1 });
    }
  }, [visible]);

  useEffect(() => {
    if (customerDetails) {
      const formattedCustomer = {
        ...customerDetails,
        points: customerDetails.points?.[0]?.points || 0,
        member_tiers: customerDetails.member_tiers?.[0]?.name || "N/A",
      };
      setCustomer(formattedCustomer);
    }

    if (error) {
      message.error(error);
    }
  }, [customerDetails, error]);

  const handleOpen = () => setVisible(true);
  const handleClose = () =>{
    
    setVisible(false);
    // getCustomerDetails({ phone: phone, list_redeemable: 1 });


  }

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
    getCustomerDetails({ phone: filters.phone, list_redeemable: 1 });
  };

  const handleIssuePoints = (e: React.FormEvent) => {
    navigate("/addpoints");
    // setIssueMode(true)
  };

  const handleRedeem = (item: any, index: any) => {
    console.log(item);
    navigate(`/redeem/${index}`);

    // setIssueMode(true)
  };

  const handleCancel = () => {
    setCustomer([]);
    resetState();
    navigate("/");

    // setIssueMode(true)
  };

  const handleAdjustPoints = () => {
    handleOpen();
    // navigate(`/redeem/${index}`);

    // setIssueMode(true)
  };

  const handleSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log(" Data:", customer);

    const formData = {
      ...data,
      user_id: customer.member.user_id,
      notify: 1,
    };

    adjustPoints(formData).then((res: any) => {
      if (res.success) {
        message.success("Points adjusted successfully ");

        handleClose();
      }
    });

    // Perform API call or other logic
  };

  // Loading state or empty data handling
  // if (!customer) {
  //   return (
  //     <div className="p-4 rounded-md shadow-sm bg-white max-w-md">
  //       <p className="text-gray-500 text-center">No customer details found. Please search again.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="pb-[30px] h-full">
      <div className="relative mb-[16px] w-full flex items-center">
        <div className="w-[400px] ml-[16px] flex justify-between items-center border border-[#e9ebec] rounded-lg overflow-hidden focus-within:ring focus-within:ring-blue-300">
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
            className="ml-[2px] w-[120px] py-[13px] text-sm font-medium text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Search
          </button>
        </div>
        <div className="flex ml-auto gap-4 mr-4">
          <Button
            onClick={() => handleCancel()}
            className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Cancel
          </Button>
          <Button onClick={() => handleAdjustPoints()} type="primary">
            Adjust Points
          </Button>

          <AdjustPointsModal
            visible={visible}
            onCancel={handleClose}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {customer ? (
        <div className="p-4 flex items-center justify-between rounded-md shadow-sm bg-white ">
          <div className="w-[40%]">
            {/* Display Name */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">Name:</span>
              <span className="text-gray-800">{customer.display_name}</span>
            </div>
            {/* First Name */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">First Name:</span>
              <span className="text-gray-800">
                {customer.first_name ?? "-"}
              </span>
            </div>
            {/* Last Name */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">Last Name:</span>
              <span className="text-gray-800">{customer.last_name ?? "-"}</span>
            </div>
            {/* Email */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">Email:</span>
              <span className="text-gray-800">{customer.email}</span>
            </div>
            {/* Phone */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">Phone:</span>
              <span className="text-gray-800">{customer.phone_format}</span>
            </div>
            {/* Member ID */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">Member ID:</span>
              <span className="text-gray-800">
                {customer.external_member_id ?? "-"}
              </span>
            </div>
            {/* Point Balance */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">
                Point Balance:
              </span>
              <span className="text-gray-800">{customer.points}</span>
            </div>
            {/* Tier */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">Tier:</span>
              <span className="text-gray-800">{customer.member_tiers}</span>
            </div>
            {/* View More */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">View More:</span>
              <a
                href={customer.customer_view_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
          <div>
            {/* Redeemable Rewards Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-700 mt-4">
                Standard Rewards Available:
              </h2>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {customer?.redeemable_list?.map((item: any, i: any) => {
                  if (item.redeem_type !== "issued_reward") {
                    return (
                      <button
                        key={item.redeem_code}
                        onClick={() => handleRedeem(item, i)}
                        className="py-1.5 px-2 w-[250px] min-h-[50px] text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                      >
                        {item.redeem_name}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Issued Rewards Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-700 mt-6">
                Issued Rewards:
              </h2>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {customer?.redeemable_list?.map((item: any, i: any) => {
                  if (item.redeem_type === "issued_reward") {
                    return (
                      <button
                        key={item.redeem_code}
                        onClick={() => handleRedeem(item, i)}
                        className="py-1.5 px-2 w-[250px] min-h-[50px] text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                      >
                        {item.redeem_name}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="w-[100%] flex justify-center h-[50vh]">
          <Flex align="center" gap="middle">
            {/* <Spin size="small" /> */}
            {/* <Spin /> */}
            <Spin size="large" />
          </Flex>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[400px] p-4 rounded-md shadow-sm bg-white">
          <p className="text-gray-500 text-center">
            Please search for customer information
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
