import React, { useEffect, useState } from 'react';
import "./totalUser.scss"
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import Swal from "sweetalert2";

import AddIcon from "@mui/icons-material/Add";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaEye, FaPlus } from "react-icons/fa";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Menu from '@mui/material/Menu';
import { Box, Button, Checkbox, Chip, Divider, FormControlLabel, IconButton, Tooltip } from '@mui/material';

const sampleData = [
    {
        name: "Microsoft",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: "Google",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: "Infosys",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: "Apple",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: "Samsung",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: "Victorious",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: "Delloite",
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: "Vivo",
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: "Reliance",
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: "Tech Mahindra",
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
    },
];

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

export default function TotalUsers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState(sampleData);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Edit Modal
    const handleEditModal = (rowData) => {
        handleClose();
        setOpenEditModal(true);
    };

    // Delete Modal
    const handleDeleteModal = (rawData) => {
        handleClose();
        Swal.fire({
            title: "Error",
            text: "Do you want to continue ?",
            icon: "warning",
            showCancelButton: true,
            // confirmButtonText: "Sure",
            cancelButtonText: "Sure",
            confirmButtonColor: "#11DD29",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yess, delete it!"
        });
    };

    useEffect(() => {
        const result = sampleData.filter(data => {
            return data.name.toLowerCase().match(search.toLowerCase());
        });
        setFilteredItems(result);
    }, [search]);

    return (
        <div className="gcg-users-container shadow px-5 py-5">
            <header className="mb-4 gcg-header">
                <input type="search" className="table-search-input" placeholder="Search Name..." value={search} onChange={event => setSearch(event.target.value)} />
                {/* <h5>Total GCG Users</h5> */}
                <Button className="create-btn" variant="contained" color="inherit" onClick={() => setOpenAddModal(!openAddModal)} startIcon={<AddIcon />}>
                    New Client
                </Button>
            </header>

            {/* Table of GCG Users List */}
            <MDBTable align='middle' bordered responsive>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Client Name</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>City</th>
                        <th scope='col'>State</th>
                        <th scope='col'>Actions</th>
                        <th scope='col'>View</th>
                    </tr>
                </MDBTableHead>

                <MDBTableBody>
                    {
                        currentItems && currentItems.length > 0 ? currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{item.address}</p>
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{item.city}</p>
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{item.state}</p>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: '0.2rem' }}>
                                        <Tooltip title="Edit">
                                            <IconButton color="success" onClick={handleEditModal}>
                                                <MdEditSquare />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={handleDeleteModal}>
                                                <AiFillDelete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </td>
                                <td>
                                    <Tooltip title="Edit">
                                        <IconButton color="primary">
                                            <FaEye />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        )) : (
                            <span className="text-danger fw-bold">
                                No Data Found
                            </span>
                        )
                    }
                </MDBTableBody>
            </MDBTable>

            {/* Pagination Container */}
            {
                filteredItems.length > 0 && (
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
                                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
                            </span>
                            <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Modal for adding new GCG User */}
            <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add Client</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="px-4">
                                <Divider>
                                    <Chip className="fw-bold" label="Company Details" size="small" />
                                </Divider>
                                <div className="mt-2 d-flex flex-column gap-3 align-items-start">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="companyname">Company Name:</label>
                                        <input type="text" className="custom-input" placeholder="eg. Microsoft" id="companyname" />
                                    </div>
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="companyaddress">Company Address:</label>
                                        <input type="text" className="custom-input" placeholder="eg. New York" id="companyaddress" />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center gap-3">
                                        <p className="mb-0 fw-bold">Company Logo:</p>
                                        <label className="mb-0 fw-bold image-upload-button d-flex align-items-center gap-1 text-muted" htmlFor="companyLogo">
                                            <FaPlus />
                                            Browse to upload
                                        </label>
                                        <input type="file" className="custom-input" placeholder="eg. New York" id="companyLogo" hidden />
                                    </div>
                                </div>
                                <Divider className="mt-4 mb-2">
                                    <Chip className="fw-bold" label="Admin Details" size="small" />
                                </Divider>
                                <div className="d-flex flex-column gap-3 align-items-start">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="adminname">Name:</label>
                                        <input type="text" className="custom-input" placeholder="eg. John Doe" id="adminname" />
                                    </div>
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="adminemail">Email Address:</label>
                                        <input type="email" className="custom-input" placeholder="eg. johndoe@example.com" id="adminemail" />
                                    </div>
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="adminmobile">Phone Number:</label>
                                        <input type="number" className="custom-input" placeholder="eg. 00005550000" id="adminmobile" />
                                    </div>
                                    <div className="field w-100 d-flex align-items-end gap-3">
                                        <div className="w-100">
                                            <label className="mb-0 fw-bold" htmlFor="adminrole">Role</label>
                                            <input type="text" value={"Admin"} className="custom-input" id="adminrole" disabled />
                                        </div>
                                        <div className="h-100 w-100">
                                            <FormControlLabel className="checkbox" control={<Checkbox defaultChecked />} label="Is Active" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => setOpenAddModal(false)}>
                                Close
                            </MDBBtn>
                            <MDBBtn className="green-btn">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            {/* Edit Modal Container */}
            <MDBModal tabIndex='-1' open={openEditModal} setOpen={setOpenEditModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Client</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenEditModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => setOpenEditModal(false)}>
                                Close
                            </MDBBtn>
                            <MDBBtn className="green-btn">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
}