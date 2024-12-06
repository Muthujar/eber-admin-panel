import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Link } from "react-router-dom";
import search from "../assets/icons/search.svg";
import { useCustomer } from '../hooks/useCustomer';
import { useDebounce } from '../hooks/useDebounce';
import { formatDate } from '../services/utils';



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
        title: "Points Earned",
        dataIndex: "points",
        key: "points",
        render: (points: number) => <span>{points > 0 ? `+${points}` : points}</span>,
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
        render: (voidStatus: boolean) => <span>{voidStatus ? "True" : "False"}</span>,
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
          <Link to={`/voidTransaction/${record.id}`}>Void {record.name}</Link>
          {/* <a>Delete</a> */}
        </Space>
      ),
    },
  ];

function Transactions(props:any) {
    const { state, getCustomerList, getCustomerDetails,FetchTransactionList } = useCustomer();
    const { customers,transactions, total, loading } = state;
  
    const [transactionList, setTransactionList] = useState([]);
    const [isloading, setIsLoading] = useState(loading);
  
    const [filters, setFilters] = useState({
      page: 1,
      limit: 10,
      display_name: "",
    });
    const debouncedSearchTerm = useDebounce(filters.display_name, 2000); // Debounce the search term


    useEffect(() => {
        console.log(state);
        setIsLoading(true);
        FetchTransactionList(filters); // Fetch first page on mount
        // getCustomerList()
        // getCustomerDetails({ email: "muthu98wic@gmail.com" });
      }, [debouncedSearchTerm, filters.page]);

      useEffect(() => {
        console.log(transactions, "cs");
        const cusList = transactions?.map((item: any) => ({
          ...item,
          created_at:formatDate(item.created_at),

          key: item.id, // Set `key` for table rows
        //   points: item.points?.[0]?.points || 0, // Safely access points
        }));
    
        setTransactionList(cusList);
      }, [transactions]);

      const handleSearch = (e: any) => {
        const searchValue = e.target.value; // Assuming it's from an input field
        // dispatch(setLoading(true));
        setIsLoading(true)
    
        setFilters((prevFilters) => ({
          ...prevFilters,
          display_name: searchValue,
        }));
      };
  
    const handleChange = (e: any) => {
      console.log(e);
  
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: e.current,
      }));
    };


  return (
    <div>
    {/* <h2>Customer List</h2> */}

    <div className="border  mb-[10px]  relative w-[250px] border-[#e9ebec] text-[14px]">
          <input
            className="py-[8px] pl-[40px] pr-[14.4px] rounded w-full focus:outline-none focus:border-blue-500 border"
            placeholder="Search Transactions"
            onChange={(e) => handleSearch(e)}
          />
          <img
            src={search}
            className="w-[20px] absolute left-[12px] top-[50%] transform -translate-y-1/2"
          />
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
      columns={columns}
      loading={loading} // Show loading state if `cusList` is empty
      dataSource={transactionList}
      pagination={{
        current: filters.page,
        total,
        pageSize: filters.limit,
        showSizeChanger: false,
      }}
      onChange={(e) => handleChange(e)}
    />
    
  </div>
  )
}

export default Transactions