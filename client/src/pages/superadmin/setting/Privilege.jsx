import { Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, IconButton, InputBase, MenuItem, Select, Tooltip } from "@mui/material"
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit"
import { AiFillDelete } from "react-icons/ai"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { MdEditSquare } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add"
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import toast from "react-hot-toast";

const PRIVILEGE_DATA = [
    {
        id: 1,
        name: "Create Client Admin"
    },
    {
        id: 2,
        name: "Create GCG Admin"
    },
    {
        id: 3,
        name: "Create Client User"
    },
    {
        id: 4,
        name: "Create GCG User"
    },
    {
        id: 5,
        name: "Edit Client Admin"
    },
    {
        id: 6,
        name: "Edit GCG Admin"
    },
    {
        id: 7,
        name: "Edit Client User"
    },
    {
        id: 8,
        name: "Edit GCG User"
    },
    {
        id: 9,
        name: "Delete Client Admin"
    },
    {
        id: 10,
        name: "Delete GCG Admin"
    },
    {
        id: 11,
        name: "Delete Client User"
    },
    {
        id: 12,
        name: "Archive Data"
    },
    {
        id: 13,
        name: "Archive Report"
    },
    {
        id: 14,
        name: "Edit Client Report"
    },
    {
        id: 15,
        name: "Delete Client Report"
    },
    {
        id: 16,
        name: "Create Master Data"
    },
    {
        id: 17,
        name: "Edit Master Data"
    },
    {
        id: 18,
        name: "Delete Master Data"
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

const Privilege = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [privilegeData, setPrivilegeData] = React.useState({
        privilegeName: ""
    });

    const [filteredItems, setFilteredItems] = React.useState(PRIVILEGE_DATA);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSubmit = () => {
        const handleValidation = () => {
            if (!privilegeData.privilegeName) {
                toast.error("Privilege Name is required !", { position: "bottom-center" });
                return;
            }
            const regexExp = /^[a-zA-Z]+$/;
            if (!regexExp.test(privilegeData.privilegeName)) {
                toast.error("Privilege Name can't be Number !", { position: "bottom-center" });
                return;
            }
            return true;
        }
        if (handleValidation()) {
            alert("Done");
        }
    };

    return (
        <>
            <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
                <h5 className="role-configure mb-0">Add a new Privilege</h5>
                <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
                    New Privilege
                </Button>
            </div>

            <MDBTable align='middle' bordered responsive>
                <MDBTableHead>
                    <tr className="table-row">
                        <th scope='col'>ID</th>
                        <th scope='col'>Privilege Name</th>
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

            {/* Modal of Adding New Role */}
            <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>New Privilege</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="px-4">
                                <Divider className="mt-0 mb-2">
                                    <Chip label="Privilege Details" size="small" />
                                </Divider>
                                <div className="d-flex flex-column gap-3 align-items-start">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="privilegeName">Privilege Name:</label>
                                        <input type="text" className="custom-input" placeholder="eg. Can Create Admin" id="privilegeName" value={privilegeData.privilegeName} onChange={e => setPrivilegeData({ ...privilegeData, privilegeName: e.target.value })} />
                                    </div>
                                </div>
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => setOpenAddModal(false)}>
                                Close
                            </MDBBtn>
                            <MDBBtn color="success" onClick={handleSubmit}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default Privilege