import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  message,
  Radio,
  Space,
  Table,
  Tag,
} from "antd";
import type { RadioChangeEvent, TableProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import search from "../assets/icons/search.svg";
import { useCustomer } from "../hooks/useCustomer";
import { useDebounce } from "../hooks/useDebounce";
import { convertToUTC, formatDate, omitEmptyKeys } from "../services/utils";
import moment from "moment";

// const columns: TableProps<any>["columns"] = [
//     {
//         title: "Transaction ID",
//         dataIndex: "id",
//         key: "id",
//       },
//       {
//         title: "Customer",
//         dataIndex: ["user", "display_name"],
//         key: "user",
//     },
//     {
//         title: "Transaction Type",
//         dataIndex: "type",
//         key: "type",
//         // render: (record: any) => {
//         //   if (record.purchase) {
//         //     return <span>Purchase</span>;
//         //   } else if (record.reward) {
//         //     return <span>Reward</span>;
//         //   } else {
//         //     return <span>Reward</span>;
//         //   }
//         // },
//       },

//     {
//         title: "Points Earned",
//         dataIndex: "points",
//         key: "points",
//         render: (points: number) => <span>{points > 0 ? `+${points}` : points}</span>,
//       },
//       {
//         title: "Amount (MYR)",
//         dataIndex: "amount",
//         key: "amount",
//       },
//       {
//         title: "Void Status",
//         dataIndex: "void",
//         key: "void",
//         render: (voidStatus: boolean) => <span>{voidStatus ? "True" : "False"}</span>,
//       },
//       {
//         title: "Created Date",
//         dataIndex: "created_at",
//         key: "created_at",
//       },

//   //   {
//   //     title: "Tags",
//   //     key: "tags",
//   //     dataIndex: "tags",
//   //     render: (_, { tags }) => (
//   //       <>
//   //         {tags?.map((tag: any) => {
//   //           let color = tag.length > 5 ? "geekblue" : "green";
//   //           if (tag === "loser") {
//   //             color = "volcano";
//   //           }
//   //           return (
//   //             <Tag color={color} key={tag}>
//   //               {tag.toUpperCase()}
//   //             </Tag>
//   //           );
//   //         })}
//   //       </>
//   //     ),
//   //   },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <Link to={`/voidTransaction/${record.id}`}>

//           <Button type="primary">
//           Void{record.name}
//         </Button>
//           {/* Void {record.name} */}

//           </Link>
//           {/* <a>Delete</a> */}
//         </Space>
//       ),
//     },
//   ];

// const bsColumns: TableProps<any>["columns"] = [
//   {
//       title: "Site",
//       dataIndex: "itemsite_code",
//       key: "itemsite_code",
//     },
//     {
//       title: "Customer",
//       dataIndex: "sa_custname",
//       key: "sa_custname",
//   },
//   {
//       title: "Paid On",
//       dataIndex: "sa_date",
//       key: "sa_date",
//       // render: (record: any) => {
//       //   if (record.purchase) {
//       //     return <span>Purchase</span>;
//       //   } else if (record.reward) {
//       //     return <span>Reward</span>;
//       //   } else {
//       //     return <span>Reward</span>;
//       //   }
//       // },
//     },

//   {
//       title: "Invoice Amount",
//       dataIndex: "sa_totamt",
//       key: "sa_totamt",
//       render: (points: number) => <span>{points > 0 ? `+${points}` : points}</span>,
//     },
//     {
//       title: "Transaction No",
//       dataIndex: "sa_transacno",
//       key: "sa_transacno",
//     },
//     {
//       title: "Reference No",
//       dataIndex: "sa_transacno_ref",
//       key: "sa_transacno_ref",
//       render: (voidStatus: boolean) => <span>{voidStatus ??'-'}</span>,
//     },
//     {
//       title: "Item",
//       dataIndex: "item",
//       key: "item",
//     },
//     {
//       title: "Billed By",
//       dataIndex: "created_at",
//       key: "created_at",
//     },
//     {
//       title: "Status",
//       dataIndex: "sa_status",
//       key: "sa_status",
//     },
//     {
//       title: "Type",
//       dataIndex: "sa_transacno_type",
//       key: "sa_transacno_type",
//     },

// //   {
// //     title: "Tags",
// //     key: "tags",
// //     dataIndex: "tags",
// //     render: (_, { tags }) => (
// //       <>
// //         {tags?.map((tag: any) => {
// //           let color = tag.length > 5 ? "geekblue" : "green";
// //           if (tag === "loser") {
// //             color = "volcano";
// //           }
// //           return (
// //             <Tag color={color} key={tag}>
// //               {tag.toUpperCase()}
// //             </Tag>
// //           );
// //         })}
// //       </>
// //     ),
// //   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <Button onClick={()=>handleIssuePoints(record)} type="primary">
//           Issue Points {record.name}
//         </Button>
//       {/* <a>Delete</a> */}
//     </Space>
//     ),
//   },
// ];

function Transactions(props: any) {
  const {
    state,
    fetchBsCustomer,
    postPurchase,
    FetchBsTransactionList,
    FetchTransactionList,
  } = useCustomer();
  const {
    Bstransactions,
    transactions,
    total,
    transTotal,
    loading,
    bsCustomer,
  } = state;
  const [size, setSize] = useState<any>("eber");
  const [bsTransactionList, setBsTransactionList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [isloading, setIsLoading] = useState(loading);
  const columns: TableProps<any>["columns"] = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: ["user", "display_name"],
      key: "user",
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      key: "type",
      // render: (record: any) => {
      //   if (record.purchase) {
      //     return <span>Purchase</span>;
      //   } else if (record.reward) {
      //     return <span>Reward</span>;
      //   } else {
      //     return <span>Reward</span>;
      //   }
      // },
    },
    {
      title: "Common Transaction No",
      dataIndex: "transaction_no",
      key: "transaction_no",
      render: (voidStatus: boolean) => <span>{voidStatus ?? "-"}</span>,

    },

    {
      title: "Points Earned",
      dataIndex: "points",
      key: "points",
      render: (points: number) => (
        <span>{points > 0 ? `+${points}` : points}</span>
      ),
    },
    {
      title: "Amount (MYR)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Void Status",
      dataIndex: "void",
      key: "void",
      render: (voidStatus: boolean) => (
        <span>{voidStatus ? "True" : "False"}</span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
    },

    //   {
    //     title: "Tags",
    //     key: "tags",
    //     dataIndex: "tags",
    //     render: (_, { tags }) => (
    //       <>
    //         {tags?.map((tag: any) => {
    //           let color = tag.length > 5 ? "geekblue" : "green";
    //           if (tag === "loser") {
    //             color = "volcano";
    //           }
    //           return (
    //             <Tag color={color} key={tag}>
    //               {tag.toUpperCase()}
    //             </Tag>
    //           );
    //         })}
    //       </>
    //     ),
    //   },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.type !== "void" && !record.void && (
            <Link to={`/voidTransaction/${record.id}`}>
              <Button type="primary">Void{record.name}</Button>
            </Link>
          )}
        </Space>
      ),
    },
  ];

  const bsColumns: TableProps<any>["columns"] = [
    {
      title: "Site",
      dataIndex: "itemsite_code",
      key: "itemsite_code",
    },
    {
      title: "Customer",
      dataIndex: "sa_custname",
      key: "sa_custname",
    },
    {
      title: "Paid On",
      dataIndex: "sa_date",
      key: "sa_date",
      // render: (record: any) => {
      //   if (record.purchase) {
      //     return <span>Purchase</span>;
      //   } else if (record.reward) {
      //     return <span>Reward</span>;
      //   } else {
      //     return <span>Reward</span>;
      //   }
      // },
    },

    {
      title: "Invoice Amount",
      dataIndex: "sa_totamt",
      key: "sa_totamt",
      render: (points: number) => (
        <span>{points > 0 ? `+${points}` : points}</span>
      ),
    },
    {
      title: "Transaction No",
      dataIndex: "sa_transacno",
      key: "sa_transacno",
    },
    {
      title: "Reference No",
      dataIndex: "sa_transacno_ref",
      key: "sa_transacno_ref",
      render: (voidStatus: boolean) => <span>{voidStatus ?? "-"}</span>,
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Billed By",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Status",
      dataIndex: "sa_status",
      key: "sa_status",
    },
    {
      title: "Type",
      dataIndex: "sa_transacno_type",
      key: "sa_transacno_type",
    },

    //   {
    //     title: "Tags",
    //     key: "tags",
    //     dataIndex: "tags",
    //     render: (_, { tags }) => (
    //       <>
    //         {tags?.map((tag: any) => {
    //           let color = tag.length > 5 ? "geekblue" : "green";
    //           if (tag === "loser") {
    //             color = "volcano";
    //           }
    //           return (
    //             <Tag color={color} key={tag}>
    //               {tag.toUpperCase()}
    //             </Tag>
    //           );
    //         })}
    //       </>
    //     ),
    //   },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleIssuePoints(record)} type="primary">
            Issue Points {record.name}
          </Button>
          {/* <a>Delete</a> */}
        </Space>
      ),
    },
  ];

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    display_name: "",
    from_date: "",
    to_date: "",
    transac_no: "",
    cust_name: "",
    sales_staffs: "",
    transaction_no:''
  });
  const debouncedSearchTerm = useDebounce(filters.display_name, 2000); // Debounce the search term
  const debouncedBsSearchTerm = useDebounce(filters.cust_name, 2000); // Debounce the search term
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    setIsLoading(true);
    if (size === "eber") {
      FetchTransactionList(omitEmptyKeys(filters)); // Fetch first page on mount
    } else {
      FetchBsTransactionList(omitEmptyKeys(filters)); // Fetch first page on mount
    }
    // getCustomerList()
    // getCustomerDetails({ email: "muthu98wic@gmail.com" });
  }, [debouncedSearchTerm, debouncedBsSearchTerm, filters.page, size]);

  useEffect(() => {
    console.log(transactions, "cs");
    console.log(Bstransactions, "bs");

    if (size === "eber") {
      const cusList = transactions?.map((item: any) => ({
        ...item,
        created_at: formatDate(item.created_at),

        key: item.id, // Set `key` for table rows
        //   points: item.points?.[0]?.points || 0, // Safely access points
      }));

      setTransactionList(cusList);
    } else setBsTransactionList(Bstransactions);
  }, [transactions, Bstransactions]);

  const handleSearch = () => {
    setIsLoading(true);
    if (size === "eber") {
      // setFilters((prevFilters) => ({
      //   ...prevFilters,
      //   transaction_no: searchValue,
      // }));
      FetchTransactionList(filters)
    } else {
      FetchBsTransactionList(filters); // Fetch first page on mount
      // setFilters((prevFilters) => ({
      //   ...prevFilters,
      //   search: searchValue,
      // }));
    }
  };

  const handleChange = (e: any) => {
    console.log(e);

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: e.current,
    }));
  };

  const handleIssuePoints = async (item: any) => {
    console.log(item);

    try {
      const user = await fetchBsCustomer({ search: item.sa_custname });
      if (user.error) {
        message.error("Error occurred");
        return;
      }

      if (user?.data?.length > 0) {
        const userData = user.data[0];
        console.log(user);

        const dataToSubmit = {
          amount: item.total_amount,
          email: userData?.cust_email,
          phone: userData?.cust_phone2,
          transaction_no: item.sa_transacno,
          utc_transaction_created_at: convertToUTC(item.sa_date),
        };
        // const params = userData?.cust_email
        // ? { email: userData.cust_email }
        // : { phone: userData.cust_phone2 };
        const params = {
          email: userData.cust_email,
          phone: userData.cust_phone2,
        };

        const res = await postPurchase(dataToSubmit, params);

        console.log(res);

        if (res?.success) {
          message.success("Points issued");
          setSize("eber");
        }
        console.log("Form Data Submitted:", dataToSubmit);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("Error occurred while issuing points");
    }
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    // filters.search=''
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: "",
    }));

    setSize(e?.target?.value);
  };

  const handleAddPoints = () => {
    // filters.search=''
    navigate("./addpoints");
  };

  const handleFilterChange = (key: string, value: any) => {

    setFilters((prev) => ({ ...prev, [key]: value }));
  };


  const handleclear = (key: string, value: any) => {
    
    setFilters((prev) => ({ ...prev, [key]: '' }));
    handleSearch()
  };

  return (
    <div>
      {/* <h2>Customer List</h2> */}

      {/* Radio Buttons */}
      <div
        className={`flex items-center 
         justify-end 
        mb-[16px]`}
      >
        <Button
          onClick={() => handleAddPoints()}
          type="primary"
          className="mr-[20px]"
        >
          Issue Points Manually
        </Button>

        <Radio.Group
          value={size}
          onChange={onRadioChange}
          style={{ minWidth: "160px" }}
        >
          <Radio.Button value="eber">Eber</Radio.Button>
          <Radio.Button value="beautesoft">Beautesoft</Radio.Button>
        </Radio.Group>
      </div>

      <div className="flex items-center justify-start mb-[16px]">
        {/* From Date */}
        {size !== "eber" && (
          <DatePicker
            placeholder="From Date"
            format="YYYY-MM-DD"
            value={filters.from_date ? moment(filters.from_date) : null}
            onChange={(date, dateString) =>
              handleFilterChange("from_date", dateString)
            }
            className="mr-[12px]"
          />
        )}
        {size !== "eber" && (
          <DatePicker
            placeholder="To Date"
            format="YYYY-MM-DD"
            value={filters.to_date ? moment(filters.to_date) : null}
            onChange={(date, dateString) =>
              handleFilterChange("to_date", dateString)
            }
            className="mr-[12px]"
          />
        )}

        {/* Transaction Number */}
        {size !== "eber" && (
          <Input
            placeholder="Transaction Number"
            value={filters.transac_no}
            onChange={(e) => handleFilterChange("transac_no", e.target.value)}
            className="mr-[12px] w-[200px]"
          />
        )}

        {/* Customer Name */}
        {size !== "eber" && (
          <Input
            placeholder="Customer Name"
            value={filters.cust_name}
            onChange={(e) => handleFilterChange("cust_name", e.target.value)}
            className="mr-[12px] w-[200px]"
          />
        )}

        {size === "eber" && (
          <Input
            placeholder="search Transaction"
            value={filters.transaction_no}
            onChange={(e) => handleFilterChange("transaction_no", e.target.value)}
            className="mr-[12px] w-[200px]"
            allowClear
            onClear={() => handleclear("transaction_no", '')} // Clear input when the close button is clicked
          />
        )}

        {/* Search Button */}
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <Table
        columns={size === "eber" ? columns : bsColumns}
        loading={loading} // Show loading state if `cusList` is empty
        // dataSource={transactionList}
        dataSource={size === "eber" ? transactionList : bsTransactionList}
        pagination={{
          current: filters.page,
          total: transTotal,
          pageSize: filters.limit,
          showSizeChanger: false,
        }}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default Transactions;
