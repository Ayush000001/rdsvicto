import React from "react";
import "./admindashboard.scss";
import AreaCard from "../../../components/dashboard/areaCard/AreaCard";
import { FaEdit } from "react-icons/fa";
import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const TABLE_HEADS = [
    "S.No.",
    "Name",
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
        order_id: "Harry Thomas",
        date: "Jun 29,2022",
        customer: "Afaq Karim",
        status: "Active",
        amount: 400,
    },
    {
        id: 101,
        name: "2.",
        order_id: "Ken Bard",
        date: "Jun 29,2022",
        customer: "Afaq Karim",
        status: "Inactive",
        amount: 288,
    },
    {
        id: 102,
        name: "3.",
        order_id: "Keith Clarke",
        date: "Jun 29,2022",
        customer: "Afaq Karim",
        status: "Active",
        amount: 500,
    },
    {
        id: 103,
        name: "4.",
        order_id: "John Linford",
        date: "Jun 29,2022",
        customer: "Afaq Karim",
        status: "Inactive",
        amount: 100,
    },
    {
        id: 104,
        name: "5.",
        order_id: "Gary Thomas",
        date: "Jun 29,2022",
        customer: "Afaq Karim",
        status: "Active",
        amount: 60,
    },
    {
        id: 105,
        name: "6.",
        order_id: "Nick Heydon",
        date: "Jun 29,2022",
        customer: "Afaq Karim",
        status: "Inactive",
        amount: 80,
    },
];

const data01 = [
    { name: 'Total Users', value: 20, fill: "#004D09" },
    { name: 'Total Active Users', value: 12, fill: "#00850F" },
    { name: 'Total Inactive Users', value: 8, fill: "#82FF91" }
];

const AdminDashboard = () => {
    return (
        <>
            {/* Total Users, Reports, GCG Users Cards */}
            <section className="content-area-cards">
                <AreaCard cardInfo={{
                    name: "Total Users",
                    value: "20",
                    text: "There are total 20 users added by you"
                }} />
                <AreaCard cardInfo={{
                    name: "Total Active Users",
                    value: "12",
                    text: "There are total 12 active user"
                }} />
                <AreaCard cardInfo={{
                    name: "Total In Active Users",
                    value: "8",
                    text: "There are total 8 inactive users"
                }} />
            </section>

            {/* For Showing Charts */}
            {/* <AreaChart /> */}
            <section className="content-area-charts">
                <div className="bar-chart">
                    <div>
                        <h5 className="mb-0 fw-bold">Users Distribution</h5>
                    </div>
                    <div className="bar-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data01}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#fff"
                                    label
                                />
                                <Label
                                    valueKey="name"
                                    position="insideBottom"
                                    content={({ value, index }) => data01[index].name}
                                />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div >
            </section>

            {/* For Showing the Total Users */}
            <div section className="content-area-table mt-5" >
                <div className="data-table-info">
                    <h4 className="data-table-title mb-3 fw-bold">Total Users</h4>
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
                                                    className={`dt-status-dot ${dataItem.status === "Active" ? "dot-delivered" : "dot-canceled"}`}
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
            </div>
        </>
    )
}

export default AdminDashboard;