import * as React from "react";
import { Box, Card, CardContent, Accordion, AccordionDetails, AccordionGroup, AccordionSummary, accordionSummaryClasses, Checkbox, Input, selectClasses, Select, Option, Button } from "@mui/joy";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { MdExpandMore } from "react-icons/md";

const OriginalBuildEstimate = () => {
  const [index, setIndex] = React.useState("");
  const [index2, setIndex2] = React.useState(0);
  const [expanded, setExpanded] = React.useState([]);

  const handleAccordionChange = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 py-0">
          <div className="shadow rounded py-5 px-3 d-flex flex-column gap-5">

            {/* For Development Group */}
            {/* <div>
              <Typography className="fw-bold mb-3 text-center" variant="h5" gutterBottom>
                Development Environment
              </Typography>
              <Box sx={{ maxWidth: "80%", marginX: "auto" }}>
                <Card variant="soft">
                  <CardContent>

                  </CardContent>
                </Card>
              </Box>
            </div> */}

            <div>
              <AccordionGroup disableDivider color="neutral" variant="soft" sx={{ maxWidth: "80%", marginX: "auto" }}>
                <Accordion expanded={expanded[0]} onChange={() => handleAccordionChange(0)}>
                  <AccordionSummary indicator={false}>
                    <Typography className="w-100 d-flex align-items-center justify-content-between fw-bold">
                      Development Environment
                      <Button variant="soft" color="primary" startDecorator={expanded[0] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} >
                        {expanded[0] ? "Collapse All" : "Expand All"}
                      </Button>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionGroup disableDivider color="neutral" variant="soft">
                      <Accordion expanded={index === 0}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 0 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>1. Estimate the number of physical CPU provisioned in each development environment</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="originalBuildEstimate">Original Build Estimate</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="originalBuildEstimate" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion expanded={index === 1}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 1 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>2. If applicable, estimate the number of vCPU provisioned in each development environment</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="originalBuildEstimate">Original Build Estimate</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="originalBuildEstimate" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion expanded={index === 2}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 2 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>3. Estimate the number of development environments originally installed</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="originalBuildEstimate">Original Build Estimate</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="originalBuildEstimate" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion expanded={index === 3}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 3 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>4. State the location country where the development environments were installed</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="originalBuildEstimate">Original Build Estimate</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="originalBuildEstimate" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion expanded={index === 4}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 4 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>5. Estimate the core build / release duration in working days</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="originalBuildEstimate">Original Build Estimate</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="originalBuildEstimate" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion expanded={index === 5}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 5 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>6. Estimate the normal working hours per day</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="originalBuildEstimate">Original Build Estimate</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Select placeholder="Please Select"
                                // indicator={<KeyboardArrowDown />}
                                // value={old}
                                // onChange={handleChange}
                                sx={{
                                  width: "100%",
                                  [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                      transform: 'rotate(-180deg)',
                                    },
                                  },
                                }}
                                className="w-100"
                                color="success"
                              >
                                <Option value="3l">0-8 Hours</Option>
                                <Option value="3r">8-12 Hours</Option>
                                <Option value="3r">12-16 Hours</Option>
                                <Option value="3r">16-24 Hours</Option>
                              </Select>
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion expanded={index === 6}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 6 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>7. State Hosting type for the original build</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Here" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="originalBuildEstimate">Original Build Estimate</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Select placeholder="Please Select"
                                indicator={<KeyboardArrowDown />}
                                // value={old}
                                // onChange={handleChange}
                                sx={{
                                  width: "100%",
                                  [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                      transform: 'rotate(-180deg)',
                                    },
                                  },
                                }}
                                className="w-100"
                                color="success"
                              >
                                <Option value="3l">On-Premise</Option>
                                <Option value="3r">Hybrid / Private Cloud</Option>
                                <Option value="3r">Public Cloud</Option>
                              </Select>
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                    </AccordionGroup>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded[1]} onChange={() => handleAccordionChange(1)}>
                  <AccordionSummary indicator={false}>
                    <Typography className="w-100 d-flex align-items-center justify-content-between fw-bold">
                      People
                      <Button variant="soft" color="primary" startDecorator={expanded[1] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} >
                        {expanded[1] ? "Collapse All" : "Expand All"}
                      </Button>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionGroup disableDivider color="neutral" variant="soft">
                      <Accordion expanded={index2 === 0}
                        onChange={(event, expanded) => {
                          setIndex2(expanded ? 0 : null);
                        }} sx={{ mb: 1 }}>
                        <AccordionSummary indicator={<AddIcon />}>1. Estimate the number of INTERNAL FTE - Enter data for Location 1 ?</AccordionSummary>
                        <AccordionDetails sx={{ border: "1px solid #d0d0d0", bgcolor: "white", my: 3, mx: 0, px: 3 }}>
                          <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label">Select Source Type</Typography>
                            <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                              <Checkbox name="sourceType" label="Primary" />
                              <Checkbox name="sourceType" label="Secondary" />
                            </div>
                          </Box>
                          <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="dataSource" placeholder="Enter Data Source" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="country">Location (country)</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="country" placeholder="Enter Location" variant="outlined" />
                            </div>
                          </Box>
                          <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                            <Typography className="mb-0" component="label" htmlFor="numberFTE">Number of FTE</Typography>
                            <div className="d-flex align-items-center gap-3 w-50">
                              <Input className="w-100" id="numberFTE" placeholder="Enter Number of FTE" variant="outlined" />
                            </div>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionGroup>
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </div>

            {/* For People Group */}
            {/* <div>
              <Typography className="fw-bold mb-3 text-center" variant="h5" gutterBottom>
                People
              </Typography>
              <Box sx={{ maxWidth: "80%", marginX: "auto" }}>
                <Card variant="soft">
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", my: 2 }}>
                      <Button size="md" className="py-0" color="neutral" startDecorator={<Add />} variant="outlined">
                        Add Location
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", my: 2 }}>
                      <Typography className="mb-2" component="label">1. Estimate the number of INTERNAL FTE - Enter data for Location 1 ?</Typography>
                      <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                        <Typography className="mb-0" component="label">Select Source Type</Typography>
                        <div className="d-flex align-items-center justify-content-center gap-5 w-50">
                          <Checkbox name="sourceType" label="Primary" />
                          <Checkbox name="sourceType" label="Secondary" />
                        </div>
                      </Box>
                      <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                        <Typography className="mb-0" component="label" htmlFor="dataSource">Enter Data Source</Typography>
                        <div className="d-flex align-items-center gap-3 w-50">
                          <Input className="w-100" id="dataSource" placeholder="Enter Data Source" variant="outlined" />
                        </div>
                      </Box>
                      <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                        <Typography className="mb-0" component="label" htmlFor="country">Location (country)</Typography>
                        <div className="d-flex align-items-center gap-3 w-50">
                          <Input className="w-100" id="country" placeholder="Enter Location" variant="outlined" />
                        </div>
                      </Box>
                      <Box sx={{ width: "90%", marginX: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", my: 2 }}>
                        <Typography className="mb-0" component="label" htmlFor="numberFTE">Number of FTE</Typography>
                        <div className="d-flex align-items-center gap-3 w-50">
                          <Input className="w-100" id="numberFTE" placeholder="Enter Number of FTE" variant="outlined" />
                        </div>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OriginalBuildEstimate