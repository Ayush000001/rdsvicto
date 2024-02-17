import { Button, Chip, Divider, Input, Option, Select } from "@mui/joy";
import { selectClasses } from "@mui/joy/Select";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import * as React from "react";
import { Check, Close, KeyboardArrowRight } from "@mui/icons-material";

const Summary = ({ handleFinishSummaryCheck, handleFinishSummary, value, handleStartSummary }) => {
    const [old, setOld] = React.useState("");

    const handleChange = (event, newValue) => {
        setOld(newValue);
    };

    const handleSubmit = () => {
        if (old == "3r") {
            handleFinishSummary(value + 1);
        } else {
            handleFinishSummary(value + 2);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 py-0">
                    <div className="shadow rounded py-5 px-3">
                        <Typography className="fw-bold text-dark mb-3 text-center" variant="h5" gutterBottom>
                            Summary Data
                        </Typography>
                        <Divider sx={{ my: 4, mb: 5 }}>
                            <Chip variant="soft" color="success" size="lg">
                                Product Details
                            </Chip>
                        </Divider>

                        <div className="d-flex align-items-center justify-content-center">
                            <Box sx={{ width: "80%", paddingX: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                                <div className="d-flex align-items-center gap-5 justify-content-start">
                                    <label className="w-25 mb-0" htmlFor="companyName">Please provide your Company Name</label>
                                    <Input
                                        color="success"
                                        disabled={false}
                                        placeholder="Company Name"
                                        id="companyName"
                                        size="md"
                                        variant="outlined"
                                        className="w-75"
                                    />
                                </div>

                                <div className="d-flex align-items-center gap-5 justify-content-start">
                                    <label className="w-25 mb-0" htmlFor="softwareName">Please provide the name of your software product/platform</label>
                                    <Input
                                        color="success"
                                        disabled={false}
                                        placeholder="Software Product/Platform"
                                        id="softwareName"
                                        size="md"
                                        variant="outlined"
                                        className="w-75"
                                    />
                                </div>

                                <div className="d-flex align-items-center gap-5 justify-content-start">
                                    <label className="w-25 mb-0" htmlFor="softwareProduct">Please state the type of software product being assessed.</label>
                                    <Select placeholder="Please Select"
                                        indicator={<KeyboardArrowDown />}
                                        sx={{
                                            width: 240,
                                            [`& .${selectClasses.indicator}`]: {
                                                transition: '0.2s',
                                                [`&.${selectClasses.expanded}`]: {
                                                    transform: 'rotate(-180deg)',
                                                },
                                            },
                                        }}
                                        className="w-75"
                                        color="success"
                                    >
                                        <Option value="System">System</Option>
                                        <Option value="General">General</Option>
                                        <Option value="Educational">Educational</Option>
                                        <Option value="Entertainment">Entertainment</Option>
                                        <Option value="Web Application">Web Application</Option>
                                        <Option value="Channel Layer">Channel Layer</Option>
                                        <Option value="CRM">CRM</Option>
                                        <Option value="ERP">ERP</Option>
                                        <Option value="HRM">HRM</Option>
                                        <Option value="Accounting">Accounting</Option>
                                        <Option value="SCM">SCM</Option>
                                        <Option value="ESG">ESG</Option>
                                        <Option value="Manufacturing">Manufacturing</Option>
                                        <Option value="Business Intelligence">Business Intelligence</Option>
                                        <Option value="Health">Health</Option>
                                        <Option value="Gaming">Gaming</Option>
                                        <Option value="Developer Tooling">Developer Tooling</Option>
                                        <Option value="Core Processing">Core Processing</Option>
                                        <Option value="Microservices">Microservices</Option>
                                        <Option value="Data">Data</Option>
                                        <Option value="Trading">Trading</Option>
                                    </Select>
                                </div>

                                <div className="d-flex align-items-center gap-5 justify-content-start">
                                    <label className="w-25 mb-0">How old is your software ?</label>
                                    <Select placeholder="Please Select"
                                        indicator={<KeyboardArrowDown />}
                                        value={old}
                                        onChange={handleChange}
                                        sx={{
                                            width: 240,
                                            [`& .${selectClasses.indicator}`]: {
                                                transition: '0.2s',
                                                [`&.${selectClasses.expanded}`]: {
                                                    transform: 'rotate(-180deg)',
                                                },
                                            },
                                        }}
                                        className="w-75"
                                        color="success"
                                    >
                                        <Option value="3l">Less than 3 years</Option>
                                        <Option value="3r">More than 3 years</Option>
                                    </Select>
                                </div>

                                <div className="d-flex align-items-center gap-5 justify-content-start">
                                    <label className="w-25 mb-0" htmlFor="softwareName">Scope Mapping Category</label>
                                    <Select placeholder="Please Select"
                                        indicator={<KeyboardArrowDown />}
                                        sx={{
                                            width: 240,
                                            [`& .${selectClasses.indicator}`]: {
                                                transition: '0.2s',
                                                [`&.${selectClasses.expanded}`]: {
                                                    transform: 'rotate(-180deg)',
                                                },
                                            },
                                        }}
                                        className="w-75"
                                        color="success"
                                    >
                                        <Option value="cb0ppc">Client Build On-Prem/Private Cloud</Option>
                                        <Option value="cbpc">Client Build Public Cloud</Option>
                                        <Option value="pbcop">Partner Build / Client On-Prem</Option>
                                        <Option value="pbppc">Partner Build / Partner / Public Cloud</Option>
                                        <Option value="hbcoppc">Hybrid Build Client On-Prem / Private Cloud</Option>
                                        <Option value="hboppc">Hybrid Build on Partner / Public Cloud</Option>
                                    </Select>
                                </div>

                                <Box sx={{ my: 3, display: "flex", justifyContent: "end", gap: 2, flexWrap: 'wrap' }}>
                                    <Button variant="soft" startDecorator={<Close />}>
                                        Cancel
                                    </Button>
                                    <Button startDecorator={<Check />} onClick={handleSubmit} color="success">
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary