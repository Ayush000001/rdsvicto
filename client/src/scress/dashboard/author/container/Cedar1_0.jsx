import * as React from "react";
import { Tabs, Tab, Box, Typography, Checkbox } from '@mui/material';
import Information from "./Information";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import Summary from "./Summary";
import OriginalBuildEstimate from "./OriginalBuildEstimate";
import Summary_Data from "../questions/Summary_Data";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Cedar1_0 = () => {
  const [value, setValue] = React.useState(0);
  const [tabToActive, setTabToActive] = React.useState(0);

  // for enabling the next tasks
  const [tabsEnabled, setTabsEnabled] = React.useState([true, false, false, false, false, false]);

  // for making the checked type icon on the tab which are completed
  const [completedTabs, setCompletedTabs] = React.useState(new Array(6).fill(false));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFinishInformation = (value) => {
    // Enable the second tab when the button in the Information tab is clicked
    const newTabsEnabled = [...tabsEnabled];
    newTabsEnabled[value] = true;
    setTabsEnabled(newTabsEnabled);

    // mark complete the current tab
    const newCompletedTabs = [...completedTabs];
    newCompletedTabs[value - 1] = true;
    setCompletedTabs(newCompletedTabs);

    // Switch to the second tab
    setValue(value);
  };

  const handleFinishSummary = (value) => {
    // Enable the second tab when the button in the Information tab is clicked
    const newTabsEnabled = [...tabsEnabled];
    newTabsEnabled[value] = true;
    setTabsEnabled(newTabsEnabled);

    const newCompletedTabs = [...completedTabs];
    newCompletedTabs[value - 1] = true;
    setCompletedTabs(newCompletedTabs);

    // Switch to the second tab
    setValue(value);
  };

  const handleStartSummary = (value) => {
    // Enable the second tab when the button in the Information tab is clicked
    const newTabsEnabled = [...tabsEnabled];
    newTabsEnabled[value] = false;
    setTabsEnabled(newTabsEnabled);
  };

  const handleFinishSummaryCheck = (value) => {
    // mark complete the current tab
    const newCompletedTabs = [...completedTabs];
    newCompletedTabs[value - 1] = true;
    setCompletedTabs(newCompletedTabs);

    // Switch to the second tab
    setValue(value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mx-auto py-5">
          <div className="shadow rounded px-4 py-5 bg-light">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label={
                  <div className="d-flex align-items-center gap-2">
                    INFORMATION
                    {completedTabs[0] && <IoMdCheckmarkCircleOutline color="green" size={28} />}
                  </div>
                } />
                <Tab label={
                  <div className="d-flex align-items-center gap-2">
                    SUMMARY DATA
                    {completedTabs[1] && <IoMdCheckmarkCircleOutline color="green" size={28} />}
                  </div>
                } disabled={!tabsEnabled[1]} />
                <Tab label="ORIGINAL BUILD ESTIMATE" disabled={!tabsEnabled[2]} />
                <Tab label="FULL ASSESSMENT" disabled={!tabsEnabled[3]} />
                <Tab label="PEOPLE, TRAVEL & TOOLS" disabled={!tabsEnabled[4]} />
                <Tab label="END OF LIFE ASSESSMENT" disabled={!tabsEnabled[5]} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <Information value={value} onFinish={handleFinishInformation} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <Summary value={value} handleFinishSummaryCheck={handleFinishSummaryCheck} handleStartSummary={handleStartSummary} handleFinishSummary={handleFinishSummary} onFinish={handleFinishInformation} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <OriginalBuildEstimate value={value} onFinish={handleFinishInformation} />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cedar1_0