import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Chip, Divider, ListItem, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { formData } from '../../../data/form/form';
import { productData } from '../../../data/product/product';

import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { statusData } from '../../../data/status/status';
import { attributeData, attributeMasterData } from '../../../data/attribute/attribute';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from 'mdb-react-ui-kit';

function Row(props) {
    const { row, index } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell className='border' align="center">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell style={{ fontWeight: "600", color: "#54595F" }} className='border fw-bold' align="center" component="th" scope="row">
                    {index}.
                </TableCell>
                <TableCell style={{ fontWeight: "600", color: "#54595F" }} className='border' align="center">
                    {
                        productData.map(obj => obj.id === row.productValId && obj.text)
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ marginX: 1, marginY: 5 }}>
                            <Table style={{ overflow: "auto" }} size="small" aria-label="purchases">
                                <TableHead className="table-heading-dark table-bordered">
                                    <TableRow>
                                        <TableCell style={{ width: "250px" }} className="border fw-bold" align="center">Product Name</TableCell>
                                        <TableCell style={{ width: "200px" }} className="border fw-bold" align="center">Form Name</TableCell>
                                        <TableCell style={{ width: "400px" }} className="border fw-bold" align="center">Attributes</TableCell>
                                        <TableCell style={{ width: "250px" }} className="border fw-bold" align="center">Status</TableCell>
                                        <TableCell style={{ width: "450px" }} className="border fw-bold" align="center">Description</TableCell>
                                        <TableCell style={{ width: "100px" }} className="border fw-bold" align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.forms.map((object) => (
                                        <TableRow key={object.id} style={{ minWidth: "800px" }}>
                                            <TableCell style={{ fontWeight: "600", color: "#54595F", minWidth: "250px" }} className="border" align="center">
                                                {
                                                    productData.map(obj => obj.id === row.productValId && obj.text)
                                                }
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }} className="border" align="center">{object.name}</TableCell>
                                            <TableCell align="center" style={{ display: "flex", minWidth: "400px" }}>
                                                {object.grouping.map((data, index) => {
                                                    return (
                                                        <ListItem key={index}>
                                                            <Chip
                                                                className="fw-bold text-muted"
                                                                style={{ cursor: "pointer", fontWeight: "500" }}
                                                                label={
                                                                    attributeMasterData.map(obj => obj.id == data && obj.text)
                                                                }
                                                            />
                                                        </ListItem>
                                                    )
                                                })}
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "600", color: "#54595F", minWidth: "250px" }} className="border" align="center">
                                                {
                                                    statusData.map(obj => obj.id === object.statusId && obj.text)
                                                }
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "600", color: "#54595F", minWidth: "450px" }} className="border" align="center">{object.desc}</TableCell>
                                            <TableCell width={100} className="border" align="center">
                                                <Box sx={{ display: 'flex', gap: '0.2rem', justifyContent: "center" }}>
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
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

export default function FormCopy() {
    const [openAddModal, setOpenAddModal] = React.useState(false);

    return (
        <div className="shadow rounded px-3 mt-3 mx-2 py-4 d-flex flex-column gap-5">
            {/* Table Header */}
            <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3 px-2">
                <h5 className="role-configure mb-0">New Form</h5>
                <Button className="create-btn" variant="contained" color="inherit" startIcon={<Add />} onClick={() => setOpenAddModal(!openAddModal)}>
                    New Form
                </Button>
            </div>

            {/* Table */}
            <div className="px-2">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer className="shadow-0" sx={{ maxHeight: "600px" }}>
                        <Table className="border" aria-label="collapsible table">
                            <TableHead className="table-heading table-bordered">
                                <TableRow>
                                    <TableCell style={{ minWidth: "100px" }} className="border fw-bold" align="center">Expand</TableCell>
                                    <TableCell style={{ minWidth: "150px" }} className="border fw-bold" align="center">S.No.</TableCell>
                                    <TableCell style={{ minWidth: "250px" }} className="border fw-bold" align="center">Product Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="">
                                {formData.map((row, index) => (
                                    <Row key={row.id} row={row} index={index + 1} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

            {/* Modal */}
            <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>New Form</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="px-4">
                                <Divider className="mt-0 mb-2">
                                    <Chip label="Form Details" size="small" />
                                </Divider>
                                <div className="d-flex flex-column gap-3 align-items-start">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                                        {/* <input type="text" className="custom-input" placeholder="eg. Can Create Admin" id="productName" /> */}
                                        <select className="custom-input px-1" id="productName">
                                            <option value="">Microsoft</option>
                                            <option value="">Google</option>
                                            <option value="">Infosys</option>
                                            <option value="">Delloite</option>
                                            <option value="">Apple</option>
                                        </select>
                                    </div>
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                                        {/* <input type="text" className="custom-input" placeholder="eg. Can Create Admin" id="productName" /> */}
                                        <select className="custom-input px-1" id="productName">
                                            <option value="">Microsoft</option>
                                            <option value="">Google</option>
                                            <option value="">Infosys</option>
                                            <option value="">Delloite</option>
                                            <option value="">Apple</option>
                                        </select>
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
        </div>
    );
}
