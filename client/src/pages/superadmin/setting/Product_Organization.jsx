import { Box, Button, Chip, Divider, FormControl, IconButton, InputBase, MenuItem, Paper, Select, Tooltip } from "@mui/material"
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit"
import { AiFillDelete } from "react-icons/ai"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { MdEditSquare } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add"
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

const PRIVILEGE_DATA = [
    {
        id: 1,
        name: "Microsoft",
        productName: ["CEDAR", "PRODUCT-I"]
    },
    {
        id: 2,
        name: "Google",
        productName: ["PRODUCT-I", "PRODUCT-III"]
    },
    {
        id: 3,
        name: "Infosys",
        productName: ["CEDAR", "PRODUCT-II"]
    },
    {
        id: 4,
        name: "Delloite",
        productName: ["PRODUCT-I", "PRODUCT-II"]
    },
    {
        id: 5,
        name: "Misfits",
        productName: ["CEDAR", "PRODUCT-I", "PRODUCT-III"]
    },
];

const Product_Name = [
    'CEDAR',
    'PRODUCT-I',
    'PRODUCT-II',
    'PRODUCT-III'
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
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

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 4;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const Product_Organization = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [selectedData, setSelectedData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filteredItems, setFilteredItems] = React.useState(PRIVILEGE_DATA);
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleEditChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedData({
            ...selectedData,
            productName: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleEdit = (selectedRow) => {
        setSelectedData(selectedRow);
        setOpenEditModal(true);
    };

    return (
        <>
            <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
                <h5 className="role-configure mb-0">Assign a product to organization</h5>
                <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
                    New Assignee
                </Button>
            </div>

            <MDBTable align='middle' bordered responsive>
                <MDBTableHead>
                    <tr className="table-row">
                        <th scope='col'>ID</th>
                        <th scope='col'>Organization Name</th>
                        <th scope='col'>Product Assigned</th>
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
                                    <Paper
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexWrap: 'wrap',
                                            listStyle: 'none',
                                            p: 0.5,
                                            m: 0,
                                        }}
                                        component="ul"
                                    >
                                        {item.productName.map((data, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <Chip
                                                        label={data}
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </Paper>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: '0.2rem' }}>
                                        <Tooltip title="Edit">
                                            <IconButton color="success" onClick={() => handleEdit(item)}>
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

            {/* Modal of Adding New P_O Data */}
            <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>New Assignee</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="px-4">
                                <Divider className="mt-0 mb-2">
                                    <Chip label="Assignee Details" size="small" />
                                </Divider>
                                <div className="d-flex flex-column gap-3 align-items-start mt-3">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel id="demo-multiple-chip-label">Organization Name</InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                input={<OutlinedInput id="select-multiple-chip" label="Organization Name" />}
                                            // MenuProps={MenuProps}
                                            >
                                                {PRIVILEGE_DATA.map((data, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={data.name}
                                                        style={getStyles(data.name, data.name, theme)}
                                                    >
                                                        {data.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-3 align-items-start mt-3">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel id="demo-multiple-chip-label">Product Name</InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput id="select-multiple-chip" label="Product Name" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {Product_Name.map((name, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={name}
                                                        style={getStyles(name, Product_Name, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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

            {/* Modal for editing the P_O Data */}
            <MDBModal tabIndex='-1' open={openEditModal} setOpen={setOpenEditModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Assignee</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenEditModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="px-4">
                                <Divider className="mt-0 mb-2">
                                    <Chip label="Assignee Details" size="small" />
                                </Divider>
                                <div className="d-flex flex-column gap-3 align-items-start mt-3">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                            <label className="mb-0 fw-bold" htmlFor="organizationName">Organization Name:</label>
                                            <input type="text" className="custom-input" value={selectedData.name} id="organizationName" disabled />
                                        </div>
                                    </div>
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        {
                                            // console.log(selectedData)
                                        }
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel id="demo-multiple-chip-label">Assigned Products</InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={selectedData.productName ? selectedData.productName : []}
                                                onChange={handleEditChange}
                                                input={<OutlinedInput id="select-multiple-chip" label="Assigned Products" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {Product_Name.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, personName, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <Divider />
                                <div className="d-flex flex-column gap-3 align-items-start mt-3">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">

                                    </div>
                                </div>
                            </form>
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
        </>
    )
}

export default Product_Organization