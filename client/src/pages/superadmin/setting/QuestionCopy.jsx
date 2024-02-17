import * as React from "react";
import { environmentData } from "../../../data/environment/environment";
import { questionData } from "../../../data/question/questions";
import { Box, Button, Chip, Divider, FormControl, IconButton, InputBase, InputLabel, ListItem, MenuItem, OutlinedInput, Paper, Select, Tooltip, styled, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { masterType } from "../../../data/master/masterData";
import { productData } from "../../../data/product/product";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { attributeMasterData } from "../../../data/attribute/attribute";
import { forms } from "../../../data/form/form";

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

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 4;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TestEnvironment = ({ id, name }) => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [environment, setEnvironment] = React.useState(id);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const [inputQuestionData, setInputQuestionData] = React.useState({
    title: "", formName: "", attributes: [], orderId: "", masterType: ""
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [filteredItems, setFilterItems] = React.useState(questionData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const testQuestions = filteredItems.filter((item) => item.grpId === environment);
  const sortedQuestions = testQuestions.sort((a, b) => a.questionOrderId - b.questionOrderId)
  const currentItems = sortedQuestions.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = event => {
    setInputQuestionData({
      ...inputQuestionData,
      attributes: event.target.value
    })    
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full d-flex align-items-center justify-content-between mb-4 mt-3">
        <h5 className="role-configure mb-0">Add a new Question in the {name}</h5>
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
                <th className="table-border text-center">Attribute</th>
                <th className="table-border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "50px" }}>{index + 1}.</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "300px" }}>{item.title}</td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }}>
                      {masterType.map((obj) => obj.id == item.masterId && obj.text)}
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "200px" }}>
                      {productData.map((obj) => obj.id === item.formId && obj.text)}
                    </td>
                    <td className="table-border text-center" style={{ fontWeight: "600", color: "#54595F", minWidth: "230px", display: "flex", justifyContent: "center" }}>
                      <Paper
                        elevation={6}
                        sx={{
                          width: "200px",
                          display: 'flex',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          listStyle: 'none',
                          // marginX: "auto",
                          p: 0.5,
                          m: 0
                        }}
                        component="ul"
                      >
                        {item.attributeId.map((data, index) => {
                          return attributeMasterData.map(obj => obj.id == data && (
                            <ListItem key={data.id}>
                              <Chip
                                className="fw-bold text-muted"
                                style={{ cursor: "pointer", fontWeight: "500" }}
                                label={obj.text}
                              />
                            </ListItem>
                          ))
                        })}
                      </Paper>
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
                    <label className="mb-0 fw-bold" htmlFor="formName">Form Name:</label>
                    <select className="custom-input px-1" id="formName">
                      <option selected>Select Form</option>
                      {
                        forms.map(item => (
                          <option value={item.id}>{item.desc}</option>
                        ))
                      }
                    </select>
                  </div>

                  {/* here modify */}
                  <div className="field w-100 d-flex flex-column align-items-start gap-0">
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-multiple-chip-label" className="">Attribute Name</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={inputQuestionData.attributes}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Attribute Name" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                              return (
                                <Chip key={value} label={value} />
                              )
                            })}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {attributeMasterData.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name.text}
                            style={getStyles(name.id, attributeMasterData, theme)}
                          >
                            {name.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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

const QuestionCopy = () => {
  return (
    <div className="mx-3 px-4 shadow rounded my-4 py-4 d-flex flex-column gap-5">
      {/* this will be mapped according to the grouping */}
      {
        environmentData.map(item => (
          <div className="border shadow rounded px-3 py-4">
            <TestEnvironment id={item.id} name={item.name} />
          </div>
        ))
      }
    </div>
  )
}

export default QuestionCopy;