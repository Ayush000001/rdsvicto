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
import { masterData, masterType } from "../../../data/master/masterData";
import Swal from "sweetalert2";

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

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

const MasterData = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filteredItems, setFilteredItems] = React.useState(masterData);

    const [newMasterData, setNewMasterData] = React.useState({
        dataTypeName: "", masterValues: []
    });

    const theme = useTheme();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTypeItems = masterType.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems = masterData.slice(indexOfFirstItem, indexOfLastItem);

    const handleChange = event => {
        const {
            target: { value }
        } = event;
        setNewMasterData({
            ...newMasterData,
            masterValues: typeof value === "string" ? value.split(",") : value
        });
    };

    const handleEditChange = event => {
        const { value } = event.target;
        selectedData.value.filter((item) => {
            console.log(item.text, value);
        });
        // setSelectedData({
        //     ...selectedData,
        //     value: typeof value === "string" ? value.split(",") : value
        // })
    }

    const handleSubmit = () => {
        const trimmedArray = newMasterData.masterValues.map(item => item.trim());
        console.log(trimmedArray);
    };

    const handleEdit = rawData => {
        setOpenEditModal(true);
        setSelectedData(rawData);
    };

    const handleDelete = rawData => {
        Swal.fire({
            title: "Error",
            html: `Do you want to delete this <b>${rawData.dataType}</b> ?`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Sure",
            confirmButtonColor: "#11DD29",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yess, delete it!"
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="border shadow rounded px-5 mx-5 my-4 py-4">
                <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
                    <h5 className="role-configure mb-0">Master Data Type</h5>
                    <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
                        New Master Type
                    </Button>
                </div>

                <MDBTable align='middle' bordered responsive>
                    <MDBTableHead>
                        <tr className="table-row text-center">
                            <th scope='col'>ID</th>
                            <th scope='col'>Master Data Type</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>

                    <MDBTableBody>
                        {
                            currentTypeItems.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="fw-bold text-muted">
                                        {item.id}{"."}
                                    </td>
                                    <td>
                                        <p className='text-muted fw-bold mb-0'>{item.text}</p>
                                    </td>
                                    <td>
                                        <Box sx={{ display: 'flex', gap: '0.2rem' }}>
                                            <Tooltip title="Edit">
                                                <IconButton color="success" onClick={() => handleEdit(item)}>
                                                    <MdEditSquare />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton color="error" onClick={() => handleDelete(item)}>
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
            </div>

            <div className="border shadow rounded px-5 mx-5 my-4 py-4">
                <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
                    <h5 className="role-configure mb-0">Master Data Values</h5>
                    <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
                        New Master Value
                    </Button>
                </div>

                <MDBTable align='middle' bordered responsive>
                    <MDBTableHead>
                        <tr className="table-row text-center">
                            <th scope='col'>ID</th>
                            <th scope='col'>Master Data Type</th>
                            <th scope='col'>Master Values</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>

                    <MDBTableBody>
                        {
                            currentItems.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="fw-bold text-muted">
                                        {item.id}{"."}
                                    </td>
                                    <td>
                                        <p className='text-muted fw-bold mb-0'>
                                            {
                                                masterType.map((obj) => obj.id === item.masterValID && obj.text)
                                            }
                                        </p>
                                    </td>
                                    <td className="d-flex justify-content-center">
                                        <Paper
                                            elevation={6}
                                            sx={{
                                                width: "max-content",
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                listStyle: 'none',
                                                p: 0.5,
                                                m: 0
                                            }}
                                            component="ul"
                                        >
                                            {item.value.map((data, index) => {
                                                return (
                                                    <ListItem key={data.id}>
                                                        <Chip
                                                            className="fw-bold text-muted"
                                                            style={{ cursor: "pointer", fontWeight: "500" }}
                                                            label={data.text}
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
                                                <IconButton color="error" onClick={() => handleDelete(item)}>
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

                {/* Modal of Adding New Master Data */}
                <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>New Master Data</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <form className="px-4">
                                    <Divider className="mt-0 mb-4">
                                        <Chip label="Master Data Details" size="small" />
                                    </Divider>
                                    <div className="d-flex flex-column gap-3 align-items-start">
                                        <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                            <label className="mb-0 fw-bold" htmlFor="masterDataType">Master Data Type:</label>
                                            <input type="text" className="custom-input" placeholder="eg. Processor Manufacturer" id="masterDataType" value={newMasterData.dataTypeName} onChange={e => setNewMasterData({ ...newMasterData, dataTypeName: e.target.value })} />
                                        </div>
                                        <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                            <label className="mb-0 fw-bold" htmlFor="masterDataValues">Master Data Values:</label>
                                            <input type="text" className="custom-input" placeholder="eg. Intel, Cisco, IBM" id="masterDataValues" value={newMasterData.masterValues} onChange={e => handleChange(e)} />
                                            <span className="mt-1 text-danger fw-bold" style={{ fontSize: "13px" }}>If there are multiple values, separate them using commas ","</span>
                                        </div>
                                    </div>
                                </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={() => setOpenAddModal(false)}>
                                    Close
                                </MDBBtn>
                                <MDBBtn className="green-btn" onClick={handleSubmit}>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>

                {/* Modal for Editing new Master Values */}
                <MDBModal tabIndex='-1' open={openEditModal} setOpen={setOpenEditModal}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Edit Master Data</MDBModalTitle>
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
                                                <label className="mb-0 fw-bold" htmlFor="masterDataTypeName">Master Data Type:</label>
                                                <input type="text" className="custom-input" id="masterDataTypeName" value={selectedData.dataType} onChange={event => setSelectedData({ ...selectedData, dataType: event.target.value })} />
                                            </div>
                                        </div>
                                        <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                            <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                                <label className="mb-0 fw-bold" htmlFor="masterDataValuesName">Master Data Values:</label>

                                            </div>
                                        </div>
                                        {
                                            // console.log(selectedData.value)
                                        }
                                        <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                            <FormControl sx={{ width: "100%" }}>
                                                <InputLabel id="demo-multiple-chip-label">Master Values</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={selectedData.value ? selectedData.value : []}
                                                    onChange={handleEditChange}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Master Values" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => (
                                                                <Chip key={value.id} label={value.text} />
                                                            ))}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {selectedData.value && selectedData.value.length > 0 && selectedData.value.map((item) => (
                                                        <MenuItem
                                                            key={item.id}
                                                            value={item.text}
                                                            style={getStyles(item, selectedData.value, theme)}
                                                        >
                                                            {item.text}
                                                        </MenuItem>
                                                    ))}
                                                    <MenuItem>
                                                        <input type="text" placeholder="Add More Values" className="custom-input" id="masterDataValuesName" />
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
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
            </div>
        </>
    )
}

export default MasterData