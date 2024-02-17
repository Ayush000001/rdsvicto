import { Button, Checkbox, FormControl } from "@mui/joy";
import { Box, Typography } from "@mui/material";
import { KeyboardArrowRight, Close } from "@mui/icons-material";
import * as React from "react";
import toast from "react-hot-toast";

const Information = ({ onFinish, value }) => {
    const [checked, setChecked] = React.useState(false);

    const handleSubmit = () => {
        if (!checked) return toast.error("Please agree to our Terms and Conditions");
        onFinish(value + 1);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 py-4">
                    <div className="shadow rounded py-4 px-3">
                        <Typography className="fw-bold text-dark mb-3" variant="h4" gutterBottom>
                            CEDAR™ Assessment
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            Based on the calculation methodology set in the GHG Protocol ICT Sector Guidance and aligned to both the Product and Scope 3 Standards. The assessment is based on activity metrics driven by the choices you have made on technology, software engineering, location, and purchasing specific to your software product.
                            The CEDAR™ assessment covers and includes the following:
                        </Typography>

                        <div className="my-4">
                            <ul className="d-flex flex-column gap-2" style={{ listStyleType: "initial" }}>
                                <li>Activity-based calculations within the lifecycle stages of your digital product</li>
                                <li>Location-based calculations using the latest national or regional energy figures for grid carbon intensity relevant to where the activities are undertaken for your product </li>
                                <li>Carbon performance ratings for build phases - Carbon Intensity (CI) scoring, and use phase - Carbon Efficiency (CE) scoring</li>
                                <li>Unique Optimum Digital Product Rating (ODPR) and Best-in-Class (BIC) models based on CI and CE scoring, engineering efficiency weightings and specific activity parameters to drive consistent ratings across applications</li>
                                <li>A comprehensive Carbon Action Model (CAM) to identify carbon and energy reduction opportunities specific to your product with targeted Next Best Actions</li>
                                <li>A consistent categorisation and taxonomy for aligning impact and actions</li>
                                <li>Data quality assessment with thresholds set for running our calculations</li>
                                <li>Automated software sizing calculations in our Software Sizing Model (SSM) based on ISO standards, developer effort translations into lines of code (LoC), backfiring gearing methods for programming efficiency, and a Sizing Accumulation Model (SAM) to drive accurate product growth over time (ratio model accounting for enhancement vs. refactoring, technical debt, and bug fixing)</li>
                                <li>Consistent calculations, alongside our ICT screening estimation, allowing for targeted action across the major ICT carbon categories for an organisation</li>
                                <li>Scope 1, 2 and 3 mapping across all key impact areas for your digital product</li>
                                <li>Calculated CI/CE scores benchmarked against GCG database of assessed products by Sector and Software Type in our Digital Carbon Benchmarking (DCB) Model</li>
                            </ul>
                        </div>

                        <Typography className="fw-bold" variant="body1" gutterBottom>
                            Once you are familiar with the data coverage and quality requirements for assessments, you will be able to access our Inbound Data Ingestion API (IDIA) and Outbound Calculation Response API (OCRA), providing an automated pathway for data provisioning, ratings, measurement, and action response. These will be available in 1H 2024. We recommend completing our assessment process to help your organisation define and drive a data strategy to be able to fully leverage our APIs.
                            The data provided by CEDAR™ and the full suite of ICT screening estimation tools can support your preparation for the detailed reporting requirements being set by CSRD. We are able to provide consistent, GHG Protocol ICT sector guidance-aligned data to support you as you prepare for these new reporting standards.
                        </Typography>

                        <div className="mt-3">
                            <FormControl size="md">
                                <Checkbox
                                    checked={checked}
                                    onChange={event => setChecked(event.target.checked)}
                                    label={
                                        <React.Fragment>
                                            <Typography className="" variant="body1">I have read and understood the kind of assessment to be filled up.</Typography>
                                        </React.Fragment>
                                    }
                                />
                            </FormControl>
                        </div>

                        <Box sx={{ my: 3, display: "flex", justifyContent: "end", gap: 2, flexWrap: 'wrap' }}>
                            <Button variant="soft" endDecorator={<Close />}>
                                Cancel
                            </Button>
                            <Button endDecorator={<KeyboardArrowRight />} onClick={handleSubmit} color="success">
                                Proceed
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information