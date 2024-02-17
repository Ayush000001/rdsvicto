import React from "react";

import { Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, IconButton, InputBase, MenuItem, Select, Tooltip, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaExternalLinkAlt } from "react-icons/fa";
import FromPreview from "./FromPreview";
import { productData } from "../../../data/product/product";
import { statusData } from "../../../data/status/status";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

const Product = () => {
    const [openAddProductModal, setOpenAddProductModal] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [filteredItems, setFilteredItems] = React.useState(productData);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
                <h5 className="role-configure mb-0">Add a New Product</h5>
                <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddProductModal(!openAddProductModal)}>
                    New Product
                </Button>
            </div>

            {/* <MDBTable align='middle' bordered responsive>
                <MDBTableHead>
                    <tr className="table-row">
                        <th scope='col' className="text-center">ID</th>
                        <th scope='col' className="text-center">Product Name</th>
                        <th scope='col' className="text-center">Status</th>
                        <th scope='col' className="text-center">Description</th>
                        <th scope='col' className="text-center">Actions</th>
                        <th scope='col' className="text-center">Preview</th>
                    </tr>
                </MDBTableHead>

                <MDBTableBody>
                    {
                        PRODUCT_DATA.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center">
                                    {item.id}{"."}
                                </td>
                                <td className="text-center">
                                    <p className='fw-normal mb-1'>{item.name}</p>
                                </td>
                                <td className="text-center">
                                    <MDBBadge color={item.status === "Active" ? "success" : "danger"} pill>
                                        {item.status}
                                    </MDBBadge>
                                </td>
                                <td className="text-center">
                                    <p className='fw-normal mb-1'>{item.desc}</p>
                                </td>
                                <td className="text-center">
                                    <Box sx={{ display: 'flex', gap: '0.2rem', justifyContent: "center" }}>
                                        <Tooltip title="Edit">
                                            <IconButton color="default">
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
                                <td className="text-center">
                                    <Tooltip title="Preview">
                                        <IconButton size={"20"} color="info">
                                            <FaExternalLinkAlt />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))
                    }
                </MDBTableBody>
            </MDBTable> */}

            <section className="content-area-table mt-3">
                <div className="data-table-diagram border-0">
                    <table>
                        <thead>
                            <tr>
                                <th className="table-border text-center">S.No.</th>
                                <th className="table-border text-center">Product Name</th>
                                <th className="table-border text-center">Status</th>
                                <th className="table-border text-center">Description</th>
                                <th className="table-border text-center">Actions</th>
                                {/* <th className="table-border text-center">Preview</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentItems.map((item, index) => (
                                    <tr className="" key={index}>
                                        <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F" }}>{item.id}.</td>
                                        <td className="table-border text-center" style={{ minWidth: "150px", fontWeight: "600", color: "#54595F" }}>
                                            {item.text}
                                        </td>
                                        <td className="table-border text-center" style={{ minWidth: "200px" }}>
                                            {
                                                statusData.map(obj => obj.id === item.statusId && (
                                                    <p style={{ fontWeight: "600", color: "#54595F", }}>
                                                        {obj.text}
                                                    </p>
                                                ))
                                            }
                                        </td>
                                        <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>{item.desc}</td>
                                        <td className="table-border">
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
                                        </td>
                                        {/* <td className="text-center table-border">
                                            <Tooltip title="Preview">
                                                <IconButton size={"20"} color="info">
                                                    <FaExternalLinkAlt />
                                                </IconButton>
                                            </Tooltip>
                                        </td> */}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
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

            {/* Modal for adding new Product */}
            <MDBModal tabIndex='-1' open={openAddProductModal} setOpen={setOpenAddProductModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>New Product</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddProductModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="px-4">
                                <Divider className="mt-0 mb-2">
                                    <Chip label="Product Details" size="small" />
                                </Divider>
                                <div className="d-flex flex-column gap-3 align-items-start">
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                                        <input type="text" className="custom-input" placeholder="eg. CEDAR" id="productName" />
                                    </div>
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="productDesc">Product Description:</label>
                                        <input type="email" className="custom-input" placeholder="eg. Sustainable IT for future" id="productDesc" />
                                    </div>
                                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                                        <label className="mb-0 fw-bold" htmlFor="productStatus">Set Product Status:</label>
                                        <FormControlLabel id="productStatus" className="checkbox" control={<Checkbox defaultChecked />} label="Is Active" />
                                    </div>
                                </div>
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => setOpenAddProductModal(false)}>
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

export default Product