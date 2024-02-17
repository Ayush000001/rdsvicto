import React from "react";
import { Box, Button, Chip, Divider, FormControl, IconButton, InputBase, MenuItem, Select, Tooltip, styled } from "@mui/material";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

import { Add } from "@mui/icons-material";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import { formData, forms } from "../../../data/form/form";
import { productData } from "../../../data/product/product";
import { statusData } from "../../../data/status/status";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FromPreview from "./FromPreview";
import FormPreview from "./FormPreview";

// Useful Data.
const TableHeading = [
  "S.No.", "Form Name", "Product Name", "Form Description", "Actions", "Preview"
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

const Form = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilteredItems] = React.useState(forms);

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [previewData, setPreviewData] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const [layout, setLayout] = React.useState(undefined);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const navigatePage = item => {
    setPreviewData(item);
    setLayout("fullscreen");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseLayout = (dataReceived) => {
    setLayout(dataReceived);
  };

  return (
    <div className="shadow rounded px-3 mt-3 mx-5 py-4 d-flex flex-column gap-3">
      {/* Table Header */}
      <div className="w-full d-flex align-items-center justify-content-between mt-3">
        <h5 className="role-configure mb-0">New Form</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<Add />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Form
        </Button>
      </div>

      {/* Table */}
      <section className="content-area-table mt-3">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                {TableHeading?.map((th, index) => (
                  <th className="table-border text-center" key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ minWidth: "150px", fontWeight: "600", color: "#54595F" }}>
                      {
                        productData.map(obj => obj.id === item.productId && obj.text)
                      }
                    </td>
                    <td className="table-border text-center" style={{ minWidth: "200px" }}>
                      {
                        productData.map(obj => obj.id === item.productId && (
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
                    <td className="table-border text-center">
                      <Tooltip title="Preview">
                        <IconButton size={"20"} color="info" onClick={() => navigatePage(item)}>
                          <FaExternalLinkAlt />
                        </IconButton>
                      </Tooltip>
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

      {/* Modal for adding Form */}
      <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create a new Form</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Form Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="formName">Form Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. CEDAR v1.0" id="formName" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="statusName">Status:</label>
                    {/* <input type="text" className="custom-input" placeholder="eg. CEDAR v1.0" id="formName" /> */}
                    <select className="custom-input px-1 py-2" id="statusName">
                      <option selected>Select Status</option>
                      {
                        statusData.map(item => (
                          <option value="">{item.text}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="formDesc">Form Description:</label>
                    {/* <input type="text" className="custom-input" placeholder="eg. These are the form for Cedar v1.0" id="formDesc" /> */}
                    <textarea className="custom-input" id="formDesc" placeholder="eg. These are the form for Cedar v1.0" cols="30" rows="6"></textarea>
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

      {/* Preview Modal */}
      {/* <FromPreview open={open} handleClose={handleClose} previewData={previewData} /> */}
      <FormPreview layout={layout} handleCloseLayout={handleCloseLayout} previewData={previewData} />
    </div>
  )
}

export default Form