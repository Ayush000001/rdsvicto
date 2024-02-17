import React, { useContext } from "react";
import "./dashboard.scss";
import { MdOutlineMenu, MdOutlineEdit } from "react-icons/md";
import { SidebarContext } from "../../../context/SidebarContext";
import AreaChart from "../../../components/dashboard/areaCharts/AreaChart";
import { cardData } from "../../../data/cards/cards";
import AreaCard from "../../../components/dashboard/areaCard/AreaCard";
import { FaEdit } from "react-icons/fa"

const TABLE_HEADS = [
  "S.No.",
  "Client Name",
  "Date",
  // "Customer name",
  "Status",
  // "Amount",
  "Edit",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "1.",
    order_id: "Microsoft",
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 400,
  },
  {
    id: 101,
    name: "2.",
    order_id: "Google",
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "pending",
    amount: 288,
  },
  {
    id: 102,
    name: "3.",
    order_id: "Infosys",
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "pending",
    amount: 500,
  },
  {
    id: 103,
    name: "4.",
    order_id: "Delloite",
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 100,
  },
  {
    id: 104,
    name: "5.",
    order_id: "Samsung",
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 60,
  },
  {
    id: 105,
    name: "6.",
    order_id: "Apple",
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 80,
  },
];

const Dashboard = () => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <>
      {/* <section className="content-area-top">
        <div className="area-top-l">
          <button
            className="sidebar-open-btn"
            type="button"
            onClick={openSidebar}
          >
            <MdOutlineMenu size={24} />
          </button>
          <h2 className="area-top-title">Dashboard</h2>
        </div>
      </section> */}

      {/* Total Users, Reports, GCG Users Cards */}
      <section className="content-area-cards">
        {
          cardData && cardData.map((data, index) => (
            <AreaCard key={index} cardInfo={data} />
          ))
        }
      </section>

      {/* For Showing Charts */}
      <AreaChart />

      {/* For Showing the Total Users */}
      <section className="content-area-table mt-5">
        <div className="data-table-info">
          <h4 className="data-table-title mb-3 fw-bold">Work In Progress Reports</h4>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA?.map((dataItem) => {
                return (
                  <tr key={`${dataItem.id}`}>
                    <td>{dataItem.name}</td>
                    <td>{dataItem.order_id}</td>
                    <td>{dataItem.date}</td>
                    {/* <td>{dataItem.customer}</td> */}
                    <td>
                      <div className="dt-status">
                        <span
                          className={`dt-status-dot dot-delivered`}
                        ></span>
                        <span className="dt-status-text">{dataItem.status}</span>
                      </div>
                    </td>
                    {/* <td>${dataItem.amount.toFixed(2)}</td> */}
                    <td className="dt-cell-action">
                      <FaEdit size={18} cursor={"pointer"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Dashboard;