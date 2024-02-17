import React from "react";
import { Box, Button, Chip, Divider, FormControl, FormControlLabel, IconButton, InputBase, MenuItem, Paper, Select, Switch, Tooltip, styled } from "@mui/material"
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { AiFillDelete } from "react-icons/ai"
import { MdEditSquare } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const TableHeading = [
    "S.No.",
    "Action",
    "GCG Super Admin",
    "GCG Author",
    "GCG Editor",
    "GCG Reviewer",
    "GCG Housekeeping",
    "Client Admin",
    "Client Author",
    "Client API User",
];

const TableBody1 = [
    {
        "id": "1",
        action: "Access the dashboard",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": true,
        "gcgReviewer": true,
        "gcgHousekeeping": true,
        "clientAdmin": true,
        "clientAuthor": true,
        "clientApiUser": true,
    },
    {
        "id": "2",
        action: "Access the clients list",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": true,
        "gcgReviewer": true,
        "gcgHousekeeping": true,
        "clientAdmin": false,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "3",
        action: "Access the users list",
        superAdmin: true,
        "gcgAuthor": false,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": true,
        "clientAdmin": true,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "4",
        action: "Access the settings",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": true,
        "clientAdmin": true,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "5",
        action: "Access a profile section",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": true,
        "gcgReviewer": true,
        "gcgHousekeeping": true,
        "clientAdmin": true,
        "clientAuthor": true,
        "clientApiUser": true,
    },
    {
        "id": "6",
        action: "Create a client",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": false,
        "clientAdmin": false,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "7",
        action: "Create a user",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": false,
        "clientAdmin": true,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "8",
        action: "Upload an excel file/fill in a form",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": true,
        "gcgReviewer": false,
        "gcgHousekeeping": false,
        "clientAdmin": true,
        "clientAuthor": true,
        "clientApiUser": true,
    },
    {
        "id": "9",
        action: "Read/edit/delete a submitted excel file/a webform/a report",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": true,
        "gcgReviewer": true,
        "gcgHousekeeping": true,
        "clientAdmin": true,
        "clientAuthor": true,
        "clientApiUser": true,
    },
    {
        "id": "10",
        action: "Read/edit/delete a client/a user",
        superAdmin: true,
        "gcgAuthor": false,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": true,
        "clientAdmin": true,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "11",
        action: "Publish a report in the client’s profile",
        superAdmin: true,
        "gcgAuthor": false,
        "gcgEditor": false,
        "gcgReviewer": true,
        "gcgHousekeeping": false,
        "clientAdmin": false,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "12",
        action: "Archive a submitted excel file/a webform/client’s data/reports",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": true,
        "clientAdmin": false,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "13",
        action: "Modify any master data in the database",
        superAdmin: true,
        "gcgAuthor": false,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": true,
        "clientAdmin": false,
        "clientAuthor": false,
        "clientApiUser": false,
    },
    {
        "id": "14",
        action: "Search client, self-assessment, report (clients/users?)",
        superAdmin: true,
        "gcgAuthor": true,
        "gcgEditor": true,
        "gcgReviewer": true,
        "gcgHousekeeping": true,
        "clientAdmin": true,
        "clientAuthor": true,
        "clientApiUser": true,
    },
    {
        "id": "15",
        action: "Submit a JSON file directly to the endpoint",
        superAdmin: false,
        "gcgAuthor": false,
        "gcgEditor": false,
        "gcgReviewer": false,
        "gcgHousekeeping": false,
        "clientAdmin": false,
        "clientAuthor": false,
        "clientApiUser": true,
    },
];

const TableBody = [
    {
        id: 1,
        action: "Access the dashboard",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: true,
        gcgReviewer: true,
        gcgHousekeeping: true,
        clientAdmin: true,
        clientAuthor: true,
        clientApiUser: true,
    },
    {
        id: 2,
        action: "Access the clients list",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: true,
        gcgReviewer: true,
        gcgHousekeeping: true,
        clientAdmin: false,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 3,
        action: "Access the users list",
        superAdmin: true,
        gcgAuthor: false,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: true,
        clientAdmin: true,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 4,
        action: "Access the settings",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: true,
        clientAdmin: true,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 5,
        action: "Access a profile section",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: true,
        gcgReviewer: true,
        gcgHousekeeping: true,
        clientAdmin: true,
        clientAuthor: true,
        clientApiUser: true,
    },
    {
        id: 6,
        action: "Create a client",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: false,
        clientAdmin: false,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 7,
        action: "Create a user",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: false,
        clientAdmin: true,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 8,
        action: "Upload an excel file/fill in a form",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: true,
        gcgReviewer: false,
        gcgHousekeeping: false,
        clientAdmin: true,
        clientAuthor: true,
        clientApiUser: true,
    },
    {
        id: 9,
        action: "Read/edit/delete a submitted excel file/a webform/a report",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: true,
        gcgReviewer: true,
        gcgHousekeeping: true,
        clientAdmin: true,
        clientAuthor: true,
        clientApiUser: true,
    },
    {
        id: 10,
        action: "Read/edit/delete a client/a user",
        superAdmin: true,
        gcgAuthor: false,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: true,
        clientAdmin: true,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 11,
        action: "Publish a report in the client’s profile",
        superAdmin: true,
        gcgAuthor: false,
        gcgEditor: false,
        gcgReviewer: true,
        gcgHousekeeping: false,
        clientAdmin: false,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 12,
        action: "Archive a submitted excel file/a webform/client’s data/reports",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: true,
        clientAdmin: false,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 13,
        action: "Modify any master data in the database",
        superAdmin: true,
        gcgAuthor: false,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: true,
        clientAdmin: false,
        clientAuthor: false,
        clientApiUser: false,
    },
    {
        id: 14,
        action: "Search client, self-assessment, report (clients/users?)",
        superAdmin: true,
        gcgAuthor: true,
        gcgEditor: true,
        gcgReviewer: true,
        gcgHousekeeping: true,
        clientAdmin: true,
        clientAuthor: true,
        clientApiUser: true,
    },
    {
        id: 15,
        action: "Submit a JSON file directly to the endpoint",
        superAdmin: false,
        gcgAuthor: false,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: false,
        clientAdmin: false,
        clientAuthor: false,
        clientApiUser: true,
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

// For Switch.
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Role_Privilege = () => {
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [filteredItems, setFilteredItems] = React.useState(TableBody);

    const [rolePriData, setRolePriData] = React.useState({
        action: "",
        superAdmin: false,
        gcgAuthor: false,
        gcgEditor: false,
        gcgReviewer: false,
        gcgHousekeeping: false,
        clientAdmin: false,
        clientAuthor: false,
        clientApiUser: false,
    });
    const [editRoleData, setEditRoleData] = React.useState({});

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleEditFunc = rawData => {
        setEditRoleData(rawData);
        setOpenEditModal(true);
    };

    const handleDeleteFunc = rawData => {
        Swal.fire({
            title: "Error",
            text: `Do you want to delete this privilege ${rawData.action} ?`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Sure",
            confirmButtonColor: "#11DD29",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yess, delete it!"
        });
    };

    const handleValidation = () => {
        console.log(rolePriData);
        if (!rolePriData.action) {
            toast.error("Privilege Name is required !", { position: "bottom-center" });
            return false;
        }
        const regexExp = /^[a-zA-Z\-_ ]+$/;
        if (!regexExp.test(rolePriData.action)) {
            toast.error("Privilege Name can't be Number !", { position: "bottom-center" });
            return false
        }
        return true
    }

    const handleSubmit = () => {
        if (handleValidation()) {
            console.log(rolePriData)
        }
    };

    return (
        <>
            {/* Table Header */}
            <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
                <h5 className="role-configure mb-0">Assign a product to organization</h5>
                <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
                    Assignee New Privilege
                </Button>
            </div>

            {/* Table Showing Data with Pagination */}
            <section className="content-area-table mt-5">
                <div className="data-table-diagram border-0">
                    <table>
                        <thead>
                            <tr>
                                {TableHeading?.map((th, index) => (
                                    <th className="table-border" key={index}>{th}</th>
                                ))}
                                <th className="table-border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((item) => (
                                    <tr className="" key={item.id}>
                                        <td className="table-border" style={{ fontWeight: "600", color: "#54595F" }}>{item.id}.</td>
                                        <td className="table-border" style={{ width: "260px", fontWeight: "600", color: "#54595F" }}>{item.action}</td>
                                        {item.superAdmin ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        {item.gcgEditor ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        {item.gcgAuthor ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        {item.gcgReviewer ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        {item.gcgHousekeeping ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        {item.clientAdmin ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        {item.clientAuthor ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        {item.clientApiUser ? <td className="table-border" style={{ color: "green", fontWeight: "700" }}>Y</td> : <td className="table-border" style={{ color: "red", fontWeight: "700" }}>N</td>}
                                        <td className="table-border">
                                            <Box sx={{ display: 'flex', gap: '0.2rem' }}>
                                                <Tooltip title="Edit">
                                                    <IconButton color="success" onClick={() => handleEditFunc(item)}>
                                                        <MdEditSquare />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton color="error" onClick={() => handleDeleteFunc(item)}>
                                                        <AiFillDelete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {
                    filteredItems.length > 0 && (
                        <div className="mt-3 d-flex align-items-center justify-content-center gap-2 pagination">
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
            </section>

            {/* New Data Modal */}
            <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Assign New Privilege to a Role</MDBModalTitle>
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
                                        <input type="text" className="custom-input" placeholder="eg. Can Create Admin" id="privilegeName" value={rolePriData.action} onChange={e => setRolePriData({ ...rolePriData, action: e.target.value })} />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Super Admin:</label>
                                        <FormControlLabel
                                            checked={rolePriData.superAdmin}
                                            onChange={e => setRolePriData({ ...rolePriData, superAdmin: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.superAdmin ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Author:</label>
                                        <FormControlLabel
                                            checked={rolePriData.gcgAuthor}
                                            onChange={e => setRolePriData({ ...rolePriData, gcgAuthor: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.gcgAuthor ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Editor:</label>
                                        <FormControlLabel
                                            checked={rolePriData.gcgEditor}
                                            onChange={e => setRolePriData({ ...rolePriData, gcgEditor: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.gcgEditor ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Housekeeping:</label>
                                        <FormControlLabel
                                            checked={rolePriData.gcgHousekeeping}
                                            onChange={e => setRolePriData({ ...rolePriData, gcgHousekeeping: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.gcgHousekeeping ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Reviewer:</label>
                                        <FormControlLabel
                                            checked={rolePriData.gcgReviewer}
                                            onChange={e => setRolePriData({ ...rolePriData, gcgReviewer: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.gcgReviewer ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Client Admin:</label>
                                        <FormControlLabel
                                            checked={rolePriData.clientAdmin}
                                            onChange={e => setRolePriData({ ...rolePriData, clientAdmin: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.clientAdmin ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Client Author:</label>
                                        <FormControlLabel
                                            checked={rolePriData.clientAuthor}
                                            onChange={e => setRolePriData({ ...rolePriData, clientAuthor: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.clientAuthor ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Client API User:</label>
                                        <FormControlLabel
                                            checked={rolePriData.clientApiUser}
                                            onChange={e => setRolePriData({ ...rolePriData, clientApiUser: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={rolePriData.clientApiUser ? "Yes" : "No"}
                                        />
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

            {/* Edit Data Modal */}
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
                                <div className="d-flex flex-column gap-3 align-items-start">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="privilegeName">Privilege Name:</label>
                                        <input type="text" className="custom-input" placeholder="eg. Can Create Admin" id="privilegeName" />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Super Admin:</label>
                                        <FormControlLabel
                                            checked={editRoleData.superAdmin}
                                            onChange={e => setEditRoleData({ ...editRoleData, superAdmin: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.superAdmin ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Author:</label>
                                        <FormControlLabel
                                            checked={editRoleData.gcgAuthor}
                                            onChange={e => setEditRoleData({ ...editRoleData, gcgAuthor: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.gcgAuthor ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Editor:</label>
                                        <FormControlLabel
                                            checked={editRoleData.gcgEditor}
                                            onChange={e => setEditRoleData({ ...editRoleData, gcgEditor: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.gcgEditor ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Housekeeping:</label>
                                        <FormControlLabel
                                            checked={editRoleData.gcgHousekeeping}
                                            onChange={e => setEditRoleData({ ...editRoleData, gcgHousekeeping: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.gcgHousekeeping ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">GCG Reviewer:</label>
                                        <FormControlLabel
                                            checked={editRoleData.gcgReviewer}
                                            onChange={e => setEditRoleData({ ...editRoleData, gcgReviewer: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.gcgReviewer ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Client Admin:</label>
                                        <FormControlLabel
                                            checked={editRoleData.clientAdmin}
                                            onChange={e => setEditRoleData({ ...editRoleData, clientAdmin: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.clientAdmin ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Client Author:</label>
                                        <FormControlLabel
                                            checked={editRoleData.clientAuthor}
                                            onChange={e => setEditRoleData({ ...editRoleData, clientAuthor: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.clientAuthor ? "Yes" : "No"}
                                        />
                                    </div>
                                    <div className="field w-100 d-flex align-items-center justify-content-between gap-0 pe-2">
                                        <label className="mb-0 fw-bold w-50">Client API User:</label>
                                        <FormControlLabel
                                            checked={editRoleData.clientApiUser}
                                            onChange={e => setEditRoleData({ ...editRoleData, clientApiUser: e.target.checked })}
                                            control={<IOSSwitch sx={{ mr: 1 }} />}
                                            label={editRoleData.clientApiUser ? "Yes" : "No"}
                                        />
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

export default Role_Privilege