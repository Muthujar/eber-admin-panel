import React, { useEffect, useState } from "react";
// import { useCustomerList } from '../hooks/useCustomerList';
import { useCustomer } from "../hooks/useCustomer";
import { useDebounce } from "../hooks/useDebounce";
import { Empty, message, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import search from "../assets/icons/search.svg";
import { Link, useNavigate } from "react-router-dom";
import type { ConfigProviderProps, RadioChangeEvent } from "antd";
import { Radio, Tabs } from "antd";
// type SizeType = ConfigProviderProps["componentSize"];

// interface DataType {
//     key: string;
//     name: string;
//     age: number;
//     address: string;
//     tags: string[];
//   }

const data: any[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const CustomerList = (props: any) => {
  const {
    state,
    createEberAcc,
    getCustomerList,
    getCustomerDetails,
    fetchBsCustomer,
  } = useCustomer();
  const { customers, total, loading, bsCustomer } = state;
  const [size, setSize] = useState<any>("eber");

  const [customerList, setCustomerList] = useState([]);
  const [bsCustomerList, setBsCCustomerList] = useState([]);

  const [isloading, setIsLoading] = useState(loading);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    display_name: "",
    search: "",
  });
  const debouncedSearchTerm = useDebounce(filters.display_name, 2000); // Debounce the search term
  const debouncedBsSearchTerm = useDebounce(filters.search, 2000); // Debounce the search term

  const navigate = useNavigate();

  //   const { data, isLoading, error } = useCustomerList(search);
  const columns: TableProps<any>["columns"] = [
    {
      title: "Name",
      dataIndex: "display_name",
      key: "display_name",
      render: (text, record) => (
        <a onClick={() => navigateDetails(record)}>{text || "-"}</a>
      ), // Navigate only when "Name" is clicked
    },
    // {
    //   title: "First Name",
    //   dataIndex: "first_name",
    //   key: "first_name",
    //   render: (text) => text || "-", // Handle empty values
    // },
    // {
    //   title: "Last Name",
    //   dataIndex: "last_name",
    //   key: "last_name",
    //   render: (text) => text || "-",
    // },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "-",
    },
    {
      title: "Phone",
      dataIndex: "phone_format",
      key: "phone_format",
      render: (text) => text || "-",
    },
    {
      title: "Member ID",
      dataIndex: "external_member_id",
      key: "external_member_id",
      render: (text) => text || "-",
    },
    {
      title: "Point Balance",
      dataIndex: "points",
      key: "points",
      render: (text) => text || "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a onClick={() => navigateDetails(record)}>{text || "-"}</a> */}

          <a onClick={() => navigateDetails(record)}>View More {record.name}</a>
        </Space>
      ),
    },
  ];

  const bsColumns: TableProps<any>["columns"] = [
    {
      title: "Name",
      dataIndex: "cust_name",
      key: "cust_name",
      render: (text, record) => (
        <a onClick={() => navigateDetails(record)}>{text || "-"}</a>
      ), // Navigate only when "Name" is clicked
    },
    {
      title: "Phone",
      dataIndex: "cust_phone2",
      key: "cust_phone2",
      render: (text) => text || "-", // Handle empty values
    },
    {
      title: "Site",
      dataIndex: "site_code",
      key: "site_code",
      render: (text) => text || "-",
    },
    {
      title: "Cust Code",
      dataIndex: "cust_code",
      key: "cust_code",
      render: (text) => text || "-",
    },
    {
      title: "Reference",
      dataIndex: "cust_refer",
      key: "cust_refer",
      render: (text) => text || "-",
    },
    {
      title: "Email",
      dataIndex: "cust_email",
      key: "cust_email",
      render: (text) => text || "-",
    },
    // {
    //   title: "Point Balance",
    //   dataIndex: "points",
    //   key: "points",
    //   render: (text) => text || "-",
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a onClick={() => navigateDetails(record)}>{text || "-"}</a> */}

          <a onClick={() => createEber(record)}>
            Create eber account {record.name}
          </a>
        </Space>
      ),
    },
  ];

  // console.log(customers);
  const navigateDetails = (record: any) => {
    setCustomerList([]);
    navigate(`/ebercustomerDetail/${record.phone_full}`);
  };

  const createEber = (record: any) => {
    console.log(record);
    const pcode =
      record.cust_phone2.length > 8
        ? record.cust_phone2.substring(0, 2) === "60"
          ? "MY"
          : record.cust_phone2.substring(0, 2) === "65"
          ? "SG"
          : record.cust_phone2.substring(0, 2) === "91"
          ? "IN"
          : null
        : null;
    const body = {
      // phone_code: `+${record.cust_phone2}`,
      phone_code: pcode,
      email: record.cust_email,
      display_name: record.cust_name,
      gender: "",
      address: "",
      store_id: null,
      // phone :record.cust_phone2.substring(2),
      phone: record.cust_phone2,

      // phone_format: record.cust_phone2,
      birth_day: "",
      external_member_id: record.cust_code,
    };
    createEberAcc(body)
      .then((res: any) => {
        console.log(res);

        if (res?.success) {
          setSize("eber");

          message.success("Eber account created succeddfully");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  //   const cusList:any[]={
  //     display_name:customers.display_name,
  //     first_name:customers.first_name,
  //     last_name:customers.last_name,
  //     email:customers.email,
  //     phone_format:customers.phone_format,
  //     external_member_id:customers.external_member_id,
  //     // points:customers?.points[0]?.points,
  //     points:'12',

  //     member_tiers:customers.member_tiers,
  //   }
  //   const cusList = customers?.map((item: any) => ({
  //     ...item,
  //     key: item.id, // Set `key` for table rows
  //     points: item.points?.[0]?.points || 0, // Safely access points
  //   }));

  useEffect(() => {
    console.log(state);

    setIsLoading(true);
    if (size === "eber") {
      getCustomerList(filters); // Fetch first page on mount
    } else {
      setFilters({
        ...filters,
        page: 1,
        limit: 10,
      });
      filters?.search && fetchBsCustomer(filters); // Fetch first page on mount
    }
    // getCustomerList()
    // getCustomerDetails({ email: "muthu98wic@gmail.com" });
  }, [debouncedSearchTerm, filters.page, size, debouncedBsSearchTerm]);

  useEffect(() => {
    console.log(customers, "cs");
    console.log(bsCustomer, "bs", total);

    if (customers.length > 0) {
      const cusList = customers?.map((item: any) => ({
        ...item,
        key: item.id, // Set `key` for table rows
        points: item.points?.[0]?.points || 0, // Safely access points
      }));

      setCustomerList(cusList);
    } else if (bsCustomer.length > 0) {
      console.log(bsCustomer);
      // setBsCCustomerList(bsCustomer);
      setBsCCustomerList(bsCustomer);
    }
    bsCustomer.length > 0 && setBsCCustomerList(bsCustomer);
  }, [customers, bsCustomer]);

  const handleSearch = (e: any) => {
    const searchValue = e.target.value; // Assuming it's from an input field
    // dispatch(setLoading(true));
    setIsLoading(true);
    if (size === "eber") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        display_name: searchValue,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchValue,
      }));
    }
  };

  const handleChange = (e: any) => {
    console.log(e);

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: e.current,
    }));
  };

  const onChange = (e: RadioChangeEvent) => {
    // filters.search=''
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: "",
    }));

    setSize(e?.target?.value);
  };

  return (
    <div>
      {/* <h2>Customer List</h2> */}
      <div className="flex items-center justify-between">
        <div className="border  mb-[10px] flex  relative w-[250px] border-[#e9ebec] text-[14px]">
          <div className="">
            <input
              className="py-[8px] pl-[40px] pr-[14.4px] rounded w-full focus:outline-none focus:border-blue-500 border"
              placeholder="Search customer"
              onChange={(e) => handleSearch(e)}
            />
            <img
              src={search}
              className="w-[20px] absolute left-[12px] top-[50%] transform -translate-y-1/2"
            />
          </div>
        </div>
        <div>
          <Radio.Group
            value={size}
            onChange={onChange}
            style={{ marginBottom: 16, minWidth: "160px" }}
          >
            <Radio.Button value="eber">Eber</Radio.Button>
            <Radio.Button value="beautesoft">Beautesoft</Radio.Button>
            {/* <Radio.Button value="large">Large</Radio.Button> */}
          </Radio.Group>
        </div>
      </div>
      {/* <input
        type="text"
        // value={search}
        onChange={(e) => handleSearch(e)}
        placeholder="Search Customers"
      /> */}
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}
      {/* <ul>
        {customers?.map((customer: any) => (
          <li key={customer.id}>{customer.display_name}</li>
        ))}

      </ul> */}

      <Table
        columns={size === "eber" ? columns : bsColumns}
        loading={loading} // Show loading state if `cusList` is empty
        dataSource={size === "eber" ? customerList : bsCustomerList}
        pagination={{
          current: filters.page,
          total: size === "eber" ? total : bsCustomerList?.length,
          pageSize: filters.limit,
          showSizeChanger: false,
        }}
        onChange={(e) => handleChange(e)}
        locale={{
          emptyText: (
            <Empty description="Search for the customer in search field"></Empty>
          ),
        }}
      />
    </div>
  );
};

export default CustomerList;
