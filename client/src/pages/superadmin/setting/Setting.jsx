import "./_setting.scss";
import { Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, IconButton, InputBase, MenuItem, Select, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import AddIcon from "@mui/icons-material/Add"
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { useState } from "react";
import PropTypes from 'prop-types';
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AttributionIcon from '@mui/icons-material/Attribution';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { styled } from '@mui/material/styles';
import Privilege from "./Privilege";
import Product_Organization from "./Product_Organization";
import Role_Privilege from "./Role_Privilege";
import Form from "./Form";
import Question from "./Question";
import Attribute from "./Attribute";
import MasterData from "./MasterData";
import FormCopy from "./FormCopy";
import Question_Environment from "./Question_Environment";
import toast, { Toaster } from "react-hot-toast";
import QuestionCopy from "./QuestionCopy";
import Product from "./Product";

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
        id: 1,
        name: "Super Admin",
        desc: ["Can create admins for all companies.", "Can create, edit and delete any data.", "Can create Editor of GCG who is responsible for editing reports.", "Can create Housekeeping for GCG who is responsible for archiving report, deleting old data etc."],
        status: "Active",
    },
    {
        id: 2,
        name: "Admin",
        desc: ["Can create/edit/delete user for the company that the admin belongs to.", "Can edit and view reports."],
        status: "Active",
    },
    {
        id: 3,
        name: "GCG Author",
        desc: ["Can upload spreadsheets on behalf of company/companies for generating reports"],
        status: "Active",
    },
    {
        id: 4,
        name: "Client User",
        desc: ["Can fill-up the webform.", "Can run the API to process spreadsheets."],
        status: "Active",
    },
    {
        id: 5,
        name: "Editor",
        desc: ["Can edit the reports of any client after data processing and before publishing of the report."],
        status: "Active",
    },
    {
        id: 6,
        name: "Housekeeping",
        desc: ["Can delete old data after necessary approvals.", "Can archive old reports of clients."],
        status: "In Active",
    },
];

const PRODUCT_DATA = [
    {
        id: 1,
        name: "CEDAR",
        desc: "Sustainable IT for future",
        status: "Active",
    },
    {
        id: 2,
        name: "PRODUCT-2",
        desc: "Sustainable IT for future",
        status: "In Active",
    },
    {
        id: 3,
        name: "PRODUCT-3",
        desc: "Sustainable IT for future",
        status: "Active",
    },
    {
        id: 4,
        name: "PRODUCT-4",
        desc: "Sustainable IT for future",
        status: "In Active",
    },
];

const PRODUCT_ORGANIZATION = [
    {
        id: 1,
        productName: "Cedar",
        clientName: "Microsoft",
        status: "Active"
    },
    {
        id: 2,
        productName: "Cedar",
        clientName: "Microsoft",
        status: "Active"
    },
    {
        id: 3,
        productName: "Cedar",
        clientName: "Microsoft",
        status: "Active"
    },
    {
        id: 4,
        productName: "Cedar",
        clientName: "Microsoft",
        status: "Active"
    },
    {
        id: 5,
        productName: "Cedar",
        clientName: "Microsoft",
        status: "Active"
    },
];


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
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const Setting = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [value, setValue] = React.useState(0);
    const [filteredRoleItems, setFilteredRoleItems] = React.useState(TABLE_DATA);

    const [roleData, setRoleData] = React.useState({
        roleName: "", roleDesc: "", roleStatus: false
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRoleItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRoleSubmit = () => {
        const handleValidation = () => {
            if (!roleData.roleName || !roleData.roleDesc) {
                toast.error("All Fields are required !", { position: "bottom-center" });
                return;
            }
            const alphaRegex = /^[a-zA-Z]+$/;
            if (alphaRegex.test(roleData.roleName) || alphaRegex.test(roleData.roleDesc)) {
                toast.error("Role Name or Role Description can't be Number !", { position: "bottom-center" });
                return;
            }
        };
        if (handleValidation()) {
            // continue with the api calling...
            alert("Done")
        }
    };

    return (
        <section className="container-fluid">
            {/* for toast messages */}
            <Toaster />

            <div className="row">
                <div className="col-11 mx-auto">
                    <div className="bg-light shadow rounded py-4">

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
                                <Tab icon={<AccountCircleIcon />} iconPosition="start" className="fw-bold text-muted" label="ROLE" {...a11yProps(0)} />
                                <Tab icon={<AccountCircleIcon />} iconPosition="start" className="fw-bold text-muted" label="PRIVILEGE" {...a11yProps(1)} />
                                <Tab icon={<SecurityIcon />} iconPosition="start" className="fw-bold text-muted" label="ROLE-PRIVILEGE" {...a11yProps(2)} />
                                <Tab icon={<ProductionQuantityLimitsIcon />} iconPosition="start" className="fw-bold text-muted" label="PRODUCT" {...a11yProps(3)} />
                                <Tab icon={<CorporateFareIcon />} iconPosition="start" className="fw-bold text-muted" label="ORGANIZATION-PRODUCT" {...a11yProps(4)} />
                                <Tab icon={<DynamicFormIcon />} iconPosition="start" className="fw-bold text-muted" label="FORM" {...a11yProps(5)} />
                                <Tab icon={<BedroomParentIcon />} iconPosition="start" className="fw-bold text-muted" label="MASTER" {...a11yProps(6)} />
                                <Tab icon={<BedroomParentIcon />} iconPosition="start" className="fw-bold text-muted" label="QUESTION-GROUP" {...a11yProps(7)} />
                                <Tab icon={<AttributionIcon />} iconPosition="start" className="fw-bold text-muted" label="ATTRIBUTE" {...a11yProps(8)} />
                                <Tab icon={<QuestionAnswerIcon />} iconPosition="start" className="fw-bold text-muted" label="QUESTION" {...a11yProps(9)} />
                            </Tabs>
                        </Box>

                        {/* For Role */}
                        <CustomTabPanel value={value} index={0}>
                            <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
                                <h5 className="role-configure mb-0">Add a new Role</h5>
                                <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
                                    New Role
                                </Button>
                            </div>

                            <MDBTable align='middle' bordered responsive>
                                <MDBTableHead>
                                    <tr className="table-row">
                                        <th scope='col'>ID</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </MDBTableHead>

                                <MDBTableBody>
                                    {
                                        currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {item.id}{"."}
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.name}</p>
                                                </td>
                                                <td>
                                                    <ul>
                                                        {
                                                            item.desc?.map((item, index) => (
                                                                <li key={index} style={{ listStyle: "inside" }}>{item}</li>
                                                            ))
                                                        }
                                                        <li></li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <MDBBadge color={item.status === "Active" ? "success" : "danger"} pill>
                                                        {item.status}
                                                    </MDBBadge>
                                                </td>
                                                <td>
                                                    <Box sx={{ display: 'flex', gap: '0.2rem' }}>
                                                        <Tooltip title="Edit">
                                                            <IconButton color="success">
                                                                <MdEditSquare />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton color="error">
                                                                <AiFillDelete />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </MDBTableBody>
                            </MDBTable>

                            {/* For Pagination */}
                            {
                                filteredRoleItems.length > 0 && (
                                    <div className="d-flex align-items-center justify-content-center gap-2 pagination">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="mb-0 fw-bold">Rows per page:</span>
                                            <FormControl sx={{ m: 1 }} variant="standard">
                                                {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
                                                <Select
                                                    labelId="demo-customized-select-label"
                                                    id="demo-customized-select"
                                                    input={<BootstrapInput />}
                                                    value={itemsPerPage}
                                                    onChange={event => setItemsPerPage(event.target.value)}
                                                >
                                                    <MenuItem value={5}>5</MenuItem>
                                                    <MenuItem value={10}>10</MenuItem>
                                                    <MenuItem value={30}>30</MenuItem>
                                                    <MenuItem value={50}>50</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                                <IoIosArrowBack />
                                            </button>
                                            <span className="fw-bold">
                                                Page {currentPage} of {Math.ceil(filteredRoleItems.length / itemsPerPage)}
                                            </span>
                                            <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === Math.ceil(filteredRoleItems.length / itemsPerPage)}>
                                                <IoIosArrowForward />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }

                            {/* Modal of Adding New Role */}
                            <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
                                <MDBModalDialog centered>
                                    <MDBModalContent>
                                        <MDBModalHeader>
                                            <MDBModalTitle>New Role</MDBModalTitle>
                                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
                                        </MDBModalHeader>
                                        <MDBModalBody>
                                            <form className="px-4">
                                                <Divider className="mt-0 mb-2">
                                                    <Chip label="Role Details" size="small" />
                                                </Divider>
                                                <div className="d-flex flex-column gap-3 align-items-start">
                                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                                        <label className="mb-0 fw-bold" htmlFor="roleName">Role Name:</label>
                                                        <input type="text" className="custom-input" placeholder="eg. Super Admin" id="roleName" value={roleData.roleName} onChange={event => setRoleData({ ...roleData, roleName: event.target.value })} />
                                                    </div>
                                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                                        <label className="mb-0 fw-bold" htmlFor="roleDesc">Role Description:</label>
                                                        <input type="text" className="custom-input" placeholder="eg. can create and edit GCG users" id="roleDesc" value={roleData.roleDesc} onChange={event => setRoleData({ ...roleData, roleDesc: event.target.value })} />
                                                    </div>
                                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                                        <label className="mb-0 fw-bold" htmlFor="adminStatus">Set Role Status:</label>
                                                        <FormControlLabel id="adminStatus" className="checkbox" control={<Checkbox checked={roleData.roleStatus} onChange={event => setRoleData({ ...roleData, roleStatus: event.target.checked })} />} label="Is Active" />
                                                    </div>
                                                </div>
                                            </form>
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={() => setOpenAddModal(false)}>
                                                Close
                                            </MDBBtn>
                                            <MDBBtn color="success" onClick={handleRoleSubmit}>Save changes</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModalContent>
                                </MDBModalDialog>
                            </MDBModal>
                        </CustomTabPanel>

                        {/* For Privilege */}
                        <CustomTabPanel value={value} index={1}>
                            <Privilege />
                        </CustomTabPanel>

                        {/* For Role-Privilege */}
                        <CustomTabPanel value={value} index={2}>
                            <Role_Privilege />
                        </CustomTabPanel>

                        {/* For Product */}
                        <CustomTabPanel value={value} index={3}>
                            <Product />
                        </CustomTabPanel>

                        {/* For Product-Organization */}
                        <CustomTabPanel value={value} index={4}>
                            <Product_Organization />
                        </CustomTabPanel>

                        {/* For Form */}
                        <CustomTabPanel value={value} index={5}>
                            <Form />
                        </CustomTabPanel>

                        {/* For Question */}
                        <CustomTabPanel value={value} index={9}>
                            <QuestionCopy />
                        </CustomTabPanel>

                        {/* For Attribute */}
                        <CustomTabPanel value={value} index={8}>
                            <Attribute />
                        </CustomTabPanel>

                        {/* For Master */}
                        <CustomTabPanel value={value} index={6}>
                            <MasterData />
                        </CustomTabPanel>

                        {/* For Question-Environment */}
                        <CustomTabPanel value={value} index={7}>
                            <Question_Environment />
                        </CustomTabPanel>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Setting;