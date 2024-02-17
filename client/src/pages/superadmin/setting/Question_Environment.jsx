import React from "react";

import { Box, Button, Chip, Divider, FormControl, IconButton, InputBase, MenuItem, Select, Tooltip, styled } from "@mui/material";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Add } from "@mui/icons-material";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { environmentData } from "../../../data/environment/environment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { forms } from "../../../data/form/form";

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

const Question_Environment = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const [selectedData, setSelectedData] = React.useState({});

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilteredItems] = React.useState(environmentData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditFunc = rawData => {
    setSelectedData(rawData);
    setOpenEditModal(!openEditModal);
  };

  const handleDeleteFunc = rawData => {
    Swal.fire({
      title: "Error",
      html: `Do you want to delete this <b>${rawData.name}</b>  ?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Sure",
      confirmButtonColor: "#11DD29",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yess, delete it!"
    });
  };

  return (
    <div className="rounded shadow px-4 py-4 mx-4 my-3">

      {/* For Parent Grouping Table */}
      <div>

      </div>

      {/* For Grouping Table */}
      <div>
        {/* Header */}
        <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
          <h5 className="role-configure mb-0">New Group</h5>
          <Button className="create-btn" variant="contained" color="inherit" startIcon={<Add />} onClick={() => setOpenAddModal(!openAddModal)}>
            New Group
          </Button>
        </div>

        {/* Table Showing Data with Pagination */}
        <section className="content-area-table mt-5">
          <div className="data-table-diagram border-0">
            <table>
              <thead>
                <tr>
                  <th className="table-border text-center" style={{ minWidth: "150px" }}>Group Id</th>
                  <th className="table-border text-center">Group Name</th>
                  <th className="table-border text-center">Form</th>
                  <th className="table-border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((item) => (
                    <tr className="" key={item.id}>
                      <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{item.id}.</td>
                      <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{item.name}</td>
                      <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "300px" }}>
                        {
                          forms.map(obj => obj.id === item.formId && obj.desc)
                        }
                      </td>
                      <td className="table-border text-center">
                        <Box sx={{ display: 'flex', gap: '0.2rem', justifyContent: "center" }}>
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

        {/* Modal for adding New Environment */}
        <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Create a new Environment</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form className="px-4">
                  <Divider className="mt-0 mb-4">
                    <Chip label="Environment Details" size="small" />
                  </Divider>
                  <div className="d-flex flex-column gap-3 align-items-start">
                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                      <label className="mb-0 fw-bold" htmlFor="environmentName">Environment Name:</label>
                      <input type="text" className="custom-input" placeholder="eg. Development Environment" id="environmentName" />
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

        {/* Modal for editing Environment */}
        <MDBModal tabIndex='-1' open={openEditModal} setOpen={setOpenEditModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Edit Environment</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setOpenEditModal(false)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form className="px-4">
                  <Divider className="mt-0 mb-4">
                    <Chip label="Environment Details" size="small" />
                  </Divider>
                  <div className="d-flex flex-column gap-3 align-items-start">
                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                      <label className="mb-0 fw-bold" htmlFor="environmentName">Environment Name:</label>
                      <input type="text" className="custom-input" value={selectedData.name} onChange={event => setSelectedData({ ...selectedData, name: event.target.value })} placeholder="eg. Development Environment" id="environmentName" />
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
    </div>
  )
}

export default Question_Environment