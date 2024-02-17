import React from "react";

import { Box, Button, Chip, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, OutlinedInput, Select, Tooltip, styled, useTheme } from "@mui/material";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Add } from "@mui/icons-material";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { environmentData } from "../../../data/environment/environment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { attributeData, attributeMasterData } from "../../../data/attribute/attribute";
import { questionData } from "../../../data/question/questions";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const ITEM_HEIGHT = 130;
const ITEM_WIDTH = 400;
const ITEM_PADDING_TOP = 4;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      maxWidth: ITEM_WIDTH * 2.5 + ITEM_PADDING_TOP,
    },
  },
};

const AttributeMasterData = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const [selectedData, setSelectedData] = React.useState({});

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilteredItems] = React.useState(attributeMasterData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedArray = filteredItems.sort((a, b) => a.orderId - b.orderId);
  const currentItems = sortedArray.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditFunc = rawData => {
    setSelectedData(rawData);
    setOpenEditModal(true);
  }

  const handleDeleteFunc = rawData => {
    Swal.fire({
      title: "Error",
      html: `Do you want to delete this <b>${rawData.text}</b>  ?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Sure",
      confirmButtonColor: "#11DD29",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yess, delete it!"
    });
  };

  return (
    <>
      <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
        <h5 className="role-configure mb-0">Add a new Attribute here</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<Add />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Attribute
        </Button>
      </div>

      {/* Table Showing Data with Pagination */}
      <section className="content-area-table mt-5">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                <th className="table-border text-center" style={{ minWidth: "150px" }}>S.No.</th>
                <th className="table-border text-center" style={{ minWidth: "250px" }}>Attribute Name</th>
                <th className="table-border text-center" style={{ minWidth: "200px" }}>Attribute Order Number</th>
                <th className="table-border text-center" style={{ minWidth: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{item.id}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{item.text}</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{item.orderId}</td>
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
          sortedArray.length > 0 && (
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
                  Page {currentPage} of {Math.ceil(sortedArray.length / itemsPerPage)}
                </span>
                <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedArray.length / itemsPerPage)}>
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
              <MDBModalTitle>Create a new Attribute</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Attribute Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="attributeName">Attribute Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. Core Phase" id="attributeName" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="attributeOrderNumber">Attribute Order Number:</label>
                    <input type="number" className="custom-input" placeholder="eg. 3" id="attributeOrderNumber" />
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

      {/* Modal for Editing Attribute */}
      <MDBModal tabIndex='-1' open={openEditModal} setOpen={setOpenEditModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Attribute</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenEditModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Attribute Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="attributeName">Attribute Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. Core Phase" value={selectedData.text} id="attributeName" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="attributeOrderNumber">Attribute Order Number:</label>
                    <input type="number" className="custom-input" placeholder="eg. 3" value={selectedData.orderId} id="attributeOrderNumber" />
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
};

const Attribute = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const theme = useTheme();

  const [selectedData, setSelectedData] = React.useState({});

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilteredItems] = React.useState(attributeData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedArray = filteredItems.sort((a, b) => a.orderId - b.orderId);
  const currentItems = sortedArray.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditFunc = rawData => {
    setSelectedData(rawData);
    setOpenEditModal(true);
  };

  const handleDeleteFunc = rawData => {
    Swal.fire({
      title: "Error",
      html: `Do you want to delete this Mapping  ?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Sure",
      confirmButtonColor: "#11DD29",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yess, delete it!"
    });
  };

  const handleEditSubmit = () => {
    console.log(selectedData);
  }

  return (
    <div className="rounded shadow px-4 py-4 mx-4 my-3">

      {/* ===== For Attribute Master Data ===== */}
      <AttributeMasterData />

      {/* <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-5">
        <h5 className="role-configure mb-0">Map Question with Attribute</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<Add />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Mapping
        </Button>
      </div>

      <section className="content-area-table mt-5">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                <th className="table-border text-center" style={{ minWidth: "150px" }}>S.No.</th>
                <th className="table-border text-center" style={{ minWidth: "350px" }}>Question Title</th>
                <th className="table-border text-center" style={{ minWidth: "250px" }}>Attribute Name</th>
                <th className="table-border text-center" style={{ minWidth: "200px" }}>Attribute Order Number</th>
                <th className="table-border text-center" style={{ minWidth: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={item.id}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>
                      {
                        questionData.map(obj => obj.id === item.questionId && obj.title)
                      }
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>
                      {
                        attributeMasterData.map(obj => obj.id === item.attributeId && obj.text)
                      }
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{item.orderId}</td>
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
          sortedArray.length > 0 && (
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
                  Page {currentPage} of {Math.ceil(sortedArray.length / itemsPerPage)}
                </span>
                <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedArray.length / itemsPerPage)}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )
        }
      </section>

      <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create new Mapping</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Mapping Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <FormControl sx={{ width: "100%" }} size="small">
                      <InputLabel id="demo-multiple-chip-label">Question Title</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        input={<OutlinedInput id="select-multiple-chip" label="Question Title" />}
                        MenuProps={MenuProps}
                      >
                        {questionData.map((data, index) => (
                          <MenuItem
                            key={index}
                            value={data.id}
                            style={getStyles(data.title, questionData, theme)}
                          >
                            {data.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <FormControl sx={{ width: "100%" }} size="small">
                      <InputLabel id="demo-multiple-chip-label">Attribute Name</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        input={<OutlinedInput id="select-multiple-chip" label="Attribute Name" />}
                        MenuProps={MenuProps}
                      >
                        {attributeMasterData.map((data, index) => (
                          <MenuItem
                            key={index}
                            value={data.id}
                            style={getStyles(data.text, questionData, theme)}
                          >
                            {data.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                      <label className="mb-0 fw-bold" htmlFor="attributeOrderNumber">Attribute Order Number:</label>
                      <input type="number" className="custom-input" placeholder="eg. 3" id="attributeOrderNumber" />
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

      <MDBModal tabIndex='-1' open={openEditModal} setOpen={setOpenEditModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Question-Attribute</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenEditModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Attribute Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <FormControl sx={{ width: "100%" }} size="small">
                      <InputLabel id="demo-multiple-chip-label">Question Title</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        input={<OutlinedInput id="select-multiple-chip" label="Question Title" />}
                        value={selectedData.questionId}
                        MenuProps={MenuProps}
                      >
                        {questionData.map((data, index) => (
                          <MenuItem
                            key={index}
                            value={data.id}
                            style={getStyles(data.title, questionData, theme)}
                          >
                            {data.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <FormControl sx={{ width: "100%" }} size="small">
                      <InputLabel id="demo-multiple-chip-label">Attribute Name</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        input={<OutlinedInput id="select-multiple-chip" label="Attribute Name" />}
                        value={
                          selectedData.attributeId
                        }
                        onChange={event => setSelectedData({ ...selectedData, attributeId: event.target.value })}
                        MenuProps={MenuProps}
                      >
                        {attributeMasterData.map((data, index) => (
                          <MenuItem
                            key={index}
                            value={data.id}
                            style={getStyles(data.text, attributeMasterData, theme)}
                          >
                            {data.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <div className="field w-100 d-flex flex-column align-items-start gap-0">
                      <label className="mb-0 fw-bold" htmlFor="attributeOrderNumber">Attribute Order Number:</label>
                      <input type="number" className="custom-input" placeholder="eg. 3" value={selectedData.orderId} id="attributeOrderNumber" />
                    </div>
                  </div>
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setOpenEditModal(false)}>
                Close
              </MDBBtn>
              <MDBBtn color="success" onClick={handleEditSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}
    </div>
  )
};

export default Attribute