import React from "react";
import { questionData } from "../../../data/question/questions";

import { Box, Button, Chip, Divider, FormControl, IconButton, InputBase, MenuItem, Select, Tooltip, styled } from "@mui/material";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

import { Add as AddIcon } from "@mui/icons-material";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { productData } from "../../../data/product/product";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { masterType } from "../../../data/master/masterData";
import { environmentData } from "../../../data/environment/environment";


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

// Component for Test Environment Questions.
const TestEnvironment = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [environment, setEnvironment] = React.useState(2);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilterItems] = React.useState(questionData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const testQuestions = filteredItems.filter((item) => item.grpId == environment);
  const sortedQuestions = testQuestions.sort((a, b) => a.questionOrderId - b.questionOrderId)
  const currentItems = sortedQuestions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
        <h5 className="role-configure mb-0">Add a new Question in the Test Environment</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Question
        </Button>
      </div>

      <section className="content-area-table mt-5">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                <th className="table-border text-center" style={{ minWidth: "150px" }}>S.No.</th>
                <th className="table-border text-center">Question Name</th>
                <th className="table-border text-center">Master Data Type</th>
                <th className="table-border text-center">Form Name</th>
                <th className="table-border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>{item.title}</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }}>
                      {masterType.map((obj) => obj.id == item.masterId && obj.text)}
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }}>
                      {productData.map((obj) => obj.id === item.formId && obj.text)}
                    </td>
                    <td className="table-border text-center">
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
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {
          sortedQuestions.length > 0 && (
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
                  Page {currentPage} of {Math.ceil(sortedQuestions.length / itemsPerPage)}
                </span>
                <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedQuestions.length / itemsPerPage)}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )
        }
      </section>

      {/* Modal for adding new question */}
      <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create a new Question</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Question Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Environment:</label>
                    {/* <input type="text" className="custom-input" value={environmentData.map((item) => item.id === environment ? item.name : "").join("")} id="questionTitle" disabled /> */}
                    <select className="custom-input px-1" id="productName" disabled>
                      {
                        environmentData.map(item => item.id === environment && (
                          <option value={item.id} selected>{item.name}</option>
                        ))
                      }
                    </select>
                    <span className="d-inline-block mt-1 text-danger text-end fw-bold" style={{ fontSize: "13px" }}>selected*</span>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Question Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. State the total working days" id="questionTitle" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                    {/* <input type="text" className="custom-input" placeholder="eg. CEDAR V1.0" id="productName" /> */}
                    <select className="custom-input px-1" id="productName">
                      <option selected>Select Product</option>
                      {
                        productData.map(item => (
                          <option value={item.id}>{item.text}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="orderNumber">Question Order Number:</label>
                    <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="dataTypeName">Master Data Type:</label>
                    {/* <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" /> */}
                    <select className="custom-input px-1" id="dataTypeName">
                      <option selected>Select Master Data Type</option>
                      {
                        masterType.map(item => (
                          <option value="">{item.text}</option>
                        ))
                      }
                      <option defaultValue="">None</option>
                    </select>
                  </div>
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setOpenAddModal(false)}>
                Close
              </MDBBtn>
              <MDBBtn color="success" className="">Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
};

// Component for Dev Environment Questions.
const DevEnvironment = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [environment, setEnvironment] = React.useState(1);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilterItems] = React.useState(questionData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const devQuestions = filteredItems.filter((item) => item.grpId == environment);
  const sortedQuestions = devQuestions.sort((a, b) => a.questionOrderId - b.questionOrderId)
  const currentItems = sortedQuestions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
        <h5 className="role-configure mb-0">Add a new Question in the Development Environment</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Question
        </Button>
      </div>

      <section className="content-area-table mt-5">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                <th className="table-border text-center" style={{ minWidth: "150px" }}>S.No.</th>
                <th className="table-border text-center">Question Name</th>
                <th className="table-border text-center">Master Data Type</th>
                <th className="table-border text-center">Form Name</th>
                <th className="table-border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>{item.title}</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }}>
                      {masterType.map((obj) => obj.id == item.masterId && obj.text)}
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>
                      {productData.map((obj) => obj.id === item.formId && obj.text)}
                    </td>
                    <td className="table-border text-center">
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
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {
          sortedQuestions.length > 0 && (
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
                  Page {currentPage} of {Math.ceil(sortedQuestions.length / itemsPerPage)}
                </span>
                <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedQuestions.length / itemsPerPage)}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )
        }
      </section>

      {/* Modal for adding new question */}
      <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create a new Question</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Question Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Environment:</label>
                    {/* <input type="text" className="custom-input" value={environmentData.map((item) => item.id === environment ? item.name : "").join("")} id="questionTitle" disabled /> */}
                    <select className="custom-input px-1" id="productName" disabled>
                      {
                        environmentData.map(item => item.id === environment && (
                          <option value={item.id} selected>{item.name}</option>
                        ))
                      }
                    </select>
                    <span className="d-inline-block mt-1 text-danger text-end fw-bold" style={{ fontSize: "13px" }}>selected*</span>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Question Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. State the total working days" id="questionTitle" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                    {/* <input type="text" className="custom-input" placeholder="eg. CEDAR V1.0" id="productName" /> */}
                    <select className="custom-input px-1" id="productName">
                      <option selected>Select Product</option>
                      {
                        productData.map(item => (
                          <option value={item.id}>{item.text}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="orderNumber">Question Order Number:</label>
                    <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="dataTypeName">Master Data Type:</label>
                    {/* <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" /> */}
                    <select className="custom-input px-1" id="dataTypeName">
                      <option selected>Select Master Data Type</option>
                      {
                        masterType.map(item => (
                          <option value="">{item.text}</option>
                        ))
                      }
                      <option defaultValue="">None</option>
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
    </>
  )
};

// Component for Dev Environment Questions.
const ProdEnvironment = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [environment, setEnvironment] = React.useState(3);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilterItems] = React.useState(questionData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const prodQuestions = filteredItems.filter((item) => item.grpId == environment);
  const sortedQuestions = prodQuestions.sort((a, b) => a.questionOrderId - b.questionOrderId)
  const currentItems = sortedQuestions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
        <h5 className="role-configure mb-0">Add a new Question in the Production Environment</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Question
        </Button>
      </div>

      <section className="content-area-table mt-5">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                <th className="table-border text-center" style={{ minWidth: "150px" }}>S.No.</th>
                <th className="table-border text-center">Question Name</th>
                <th className="table-border text-center">Master Data Type</th>
                <th className="table-border text-center">Form Name</th>
                <th className="table-border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>{item.title}</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "250px" }}>
                      {masterType.map((obj) => obj.id == item.masterId && obj.text)}
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>
                      {productData.map((obj) => obj.id === item.formId && obj.text)}
                    </td>
                    <td className="table-border text-center">
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
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {
          sortedQuestions.length > 0 && (
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
                  Page {currentPage} of {Math.ceil(sortedQuestions.length / itemsPerPage)}
                </span>
                <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedQuestions.length / itemsPerPage)}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )
        }
      </section>

      {/* Modal for adding new question */}
      <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create a new Question</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Question Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Environment:</label>
                    {/* <input type="text" className="custom-input" value={environmentData.map((item) => item.id === environment ? item.name : "").join("")} id="questionTitle" disabled /> */}
                    <select className="custom-input px-1" id="productName" disabled>
                      {
                        environmentData.map(item => item.id === environment && (
                          <option value={item.id} selected>{item.name}</option>
                        ))
                      }
                    </select>
                    <span className="d-inline-block mt-1 text-danger text-end fw-bold" style={{ fontSize: "13px" }}>selected*</span>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Question Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. State the total working days" id="questionTitle" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                    {/* <input type="text" className="custom-input" placeholder="eg. CEDAR V1.0" id="productName" /> */}
                    <select className="custom-input px-1" id="productName">
                      <option selected>Select Product</option>
                      {
                        productData.map(item => (
                          <option value={item.id}>{item.text}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="orderNumber">Question Order Number:</label>
                    <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="dataTypeName">Master Data Type:</label>
                    {/* <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" /> */}
                    <select className="custom-input px-1" id="dataTypeName">
                      <option selected>Select Master Data Type</option>
                      {
                        masterType.map(item => (
                          <option value="">{item.text}</option>
                        ))
                      }
                      <option defaultValue="">None</option>
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
    </>
  )
};

// Component for Dev Environment Questions.
const InternalEnvironment = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [environment, setEnvironment] = React.useState(4);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilterItems] = React.useState(questionData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const InternalQuestions = filteredItems.filter((item) => item.grpId == environment);
  const sortedQuestions = InternalQuestions.sort((a, b) => a.questionOrderId - b.questionOrderId);
  const currentItems = sortedQuestions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
        <h5 className="role-configure mb-0">Add a new Question in the Internal FTE Environment</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Question
        </Button>
      </div>

      <section className="content-area-table mt-5">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                <th className="table-border text-center" style={{ minWidth: "150px" }}>S.No.</th>
                <th className="table-border text-center">Question Name</th>
                <th className="table-border text-center">Master Data Type</th>
                <th className="table-border text-center">Form Name</th>
                <th className="table-border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>{item.title}</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }}>
                      {masterType.map((obj) => obj.id == item.masterId && obj.text)}
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>
                      {productData.map((obj) => obj.id === item.formId && obj.text)}
                    </td>
                    <td className="table-border text-center">
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
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {
          sortedQuestions.length > 0 && (
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
                  Page {currentPage} of {Math.ceil(sortedQuestions.length / itemsPerPage)}
                </span>
                <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedQuestions.length / itemsPerPage)}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )
        }
      </section>

      {/* Modal for adding new question */}
      <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create a new Question</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Question Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Environment:</label>
                    {/* <input type="text" className="custom-input" value={environmentData.map((item) => item.id === environment ? item.name : "").join("")} id="questionTitle" disabled /> */}
                    <select className="custom-input px-1" id="productName" disabled>
                      {
                        environmentData.map(item => item.id === environment && (
                          <option value={item.id} selected>{item.name}</option>
                        ))
                      }
                    </select>
                    <span className="d-inline-block mt-1 text-danger text-end fw-bold" style={{ fontSize: "13px" }}>selected*</span>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Question Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. State the total working days" id="questionTitle" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                    {/* <input type="text" className="custom-input" placeholder="eg. CEDAR V1.0" id="productName" /> */}
                    <select className="custom-input px-1" id="productName">
                      <option selected>Select Product</option>
                      {
                        productData.map(item => (
                          <option value={item.id}>{item.text}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="orderNumber">Question Order Number:</label>
                    <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="dataTypeName">Master Data Type:</label>
                    {/* <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" /> */}
                    <select className="custom-input px-1" id="dataTypeName">
                      <option selected>Select Master Data Type</option>
                      {
                        masterType.map(item => (
                          <option value="">{item.text}</option>
                        ))
                      }
                      <option defaultValue="">None</option>
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
    </>
  )
};

// Component for Dev Environment Questions.
const ExternalEnvironment = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [environment, setEnvironment] = React.useState(5);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilterItems] = React.useState(questionData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const externalQuestions = filteredItems.filter((item) => item.grpId == environment);
  const sortedQuestions = externalQuestions.sort((a, b) => a.questionOrderId - b.questionOrderId)
  const currentItems = sortedQuestions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
        <h5 className="role-configure mb-0">Add a new Question in the External FTE Environment</h5>
        <Button className="create-btn" variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenAddModal(!openAddModal)}>
          New Question
        </Button>
      </div>

      <section className="content-area-table mt-5">
        <div className="data-table-diagram border-0">
          <table>
            <thead>
              <tr>
                <th className="table-border text-center" style={{ minWidth: "150px" }}>S.No.</th>
                <th className="table-border text-center">Question Name</th>
                <th className="table-border text-center">Master Data Type</th>
                <th className="table-border text-center">Form Name</th>
                <th className="table-border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "150px" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>{item.title}</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }}>
                      {masterType.map((obj) => obj.id == item.masterId && obj.text)}
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "400px" }}>
                      {productData.map((obj) => obj.id === item.formId && obj.text)}
                    </td>
                    <td className="table-border text-center">
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
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {
          sortedQuestions.length > 0 && (
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
                  Page {currentPage} of {Math.ceil(sortedQuestions.length / itemsPerPage)}
                </span>
                <button className="border bg-white px-3 py-2 fs-4 d-flex align-items-center justify-content-center" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedQuestions.length / itemsPerPage)}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )
        }
      </section>

      {/* Modal for adding new question */}
      <MDBModal tabIndex='-1' open={openAddModal} setOpen={setOpenAddModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create a new Question</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOpenAddModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form className="px-4">
                <Divider className="mt-0 mb-4">
                  <Chip label="Question Details" size="small" />
                </Divider>
                <div className="d-flex flex-column gap-3 align-items-start">
                  <div className="field w-100 d-flex flex-column gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Environment:</label>
                    {/* <input type="text" className="custom-input" value={environmentData.map((item) => item.id === environment ? item.name : "").join("")} id="questionTitle" disabled /> */}
                    <select className="custom-input px-1" id="productName" disabled>
                      {
                        environmentData.map(item => item.id === environment && (
                          <option value={item.id} selected>{item.name}</option>
                        ))
                      }
                    </select>
                    <span className="d-inline-block mt-1 text-danger text-end fw-bold" style={{ fontSize: "13px" }}>selected*</span>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="questionTitle">Question Name:</label>
                    <input type="text" className="custom-input" placeholder="eg. State the total working days" id="questionTitle" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="productName">Product Name:</label>
                    {/* <input type="text" className="custom-input" placeholder="eg. CEDAR V1.0" id="productName" /> */}
                    <select className="custom-input px-1" id="productName">
                      <option selected>Select Product</option>
                      {
                        productData.map(item => (
                          <option value={item.id}>{item.text}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="orderNumber">Question Order Number:</label>
                    <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" />
                  </div>
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <label className="mb-0 fw-bold" htmlFor="dataTypeName">Master Data Type:</label>
                    {/* <input type="number" className="custom-input" placeholder="Question Order Number" id="orderNumber" /> */}
                    <select className="custom-input px-1" id="dataTypeName">
                      <option selected>Select Master Data Type</option>
                      {
                        masterType.map(item => (
                          <option value="">{item.text}</option>
                        ))
                      }
                      <option defaultValue="">None</option>
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
    </>
  )
};

const Question = () => {
  return (
    <div className="mx-3 px-4 shadow rounded my-4 py-4 d-flex flex-column gap-5">
      {/* This will be for Test Environment Configuration */}
      <div className="border shadow rounded px-3 py-4">
        <TestEnvironment />
      </div>

      {/* This will be for Dev Environment Configuration */}
      <div className="border rounded px-3 py-4">
        <DevEnvironment />
      </div>

      {/* This will be for Prod Environment Configuration */}
      <div className="border rounded px-3 py-4">
        <ProdEnvironment />
      </div>

      {/* This will be for Internal FTE Environment Configuration */}
      <div className="border rounded px-3 py-4">
        <InternalEnvironment />
      </div>

      {/* This will be for External FTE Environment Configuration */}
      <div className="border rounded px-3 py-4">
        <ExternalEnvironment />
      </div>
    </div>
  )
}

export default Question