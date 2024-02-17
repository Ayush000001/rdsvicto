import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import AreaBarChart from "./AreaBarChart";
import AreaProgressChart from "./AreaProgressChart";
import "./areaChart.scss";

const AreaChart = () => {
    const data01 = [
        { name: 'Total Clients', value: 23, fill: "#004D09" },
        { name: 'WIP Reports', value: 15, fill: "#00850F" },
        { name: 'Final Reports', value: 9, fill: "#11DD29" },
        { name: 'Total GCG Users', value: 16, fill: "#82FF91" }
    ];

    const data02 = [
        { name: 'Work in Progress', value: 15, fill: "#00850F" },
        { name: 'Final Reports', value: 9, fill: "#11DD29" }
    ];

    return (
        <section className="content-area-charts">
            <div className="bar-chart">
                <div>
                    <h5 className="mb-0 fw-bold">Products Distribution</h5>
                </div>
                <div className="bar-chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
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
            </div>

            <div className="bar-chart">
                <div>
                    <h5 className="mb-0 fw-bold">WIP/Finalized Reports</h5>
                </div>
                <div className="bar-chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data02}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    )
}

export default AreaChart