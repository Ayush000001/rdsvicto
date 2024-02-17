import React, { useEffect, useState } from 'react';
import "./gcgusers.scss"
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import Swal from "sweetalert2";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Menu from '@mui/material/Menu';
import { Button, Checkbox, Chip, Divider, FormControlLabel } from '@mui/material';

const sampleData = [
    {
        name: "John Doe",
        title: "Manager",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Ansh Goyal",
        title: "Business Analyst",
        status: "Inactive",
        position: "Senior"
    },
    {
        name: "Upendra Singh",
        title: "Human Resource Manager",
        status: "Active",
        position: "Junior"
    },
    {
        name: "Mike Dickens",
        title: "Product Specialist",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Harry Potter",
        title: "Product Specialist",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Mark Dell",
        title: "Business Analyst",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Smith Jones",
        title: "Product Specialist",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Sally John",
        title: "Business Analyst",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Julie Turner",
        status: "Active",
        title: "Marketing Manager",
        position: "Senior"
    },
    {
        name: "Samantha Clarke",
        title: "Human Resource Manager",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Angela Lords",
        title: "Human Resource Manager",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Mary Heinz",
        title: "Business Analyst",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Dalia Roberts",
        title: "Marketing Manager",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Luke Torr",
        title: "Human Resource Manager",
        status: "Active",
        position: "Senior"
    },
    {
        name: "David Clarks",
        title: "Marketing Manager",
        status: "Active",
        position: "Senior"
    },
    {
        name: "Ladan Genevar",
        title: "Business Developement Manager",
        status: "Active",
        position: "Senior"
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

export default function GCGUsers() {
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
                    New GCG User
                </Button>
            </header>

            {/* Table of GCG Users List */}
            <MDBTable align='middle' bordered responsive>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Actions</th>
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
                                    <p className='fw-normal mb-1'>{item.title}</p>
                                </td>
                                <td>
                                    <MDBBadge color='success' pill>
                                        {item.status}
                                    </MDBBadge>
                                </td>
                                <td>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon size={20} />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleEditModal}>Edit</MenuItem>
                                        <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
                                    </Menu>
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
                            <MDBModalTitle>New GCG User</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="px-4">
                                <Divider className="mt-0 mb-2">
                                    <Chip label="User Details" size="small" />
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
                                            <input type="text" value={"GCG Admin"} className="custom-input" id="adminrole" disabled />
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
                            <MDBModalTitle>Edit GCG User</MDBModalTitle>
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