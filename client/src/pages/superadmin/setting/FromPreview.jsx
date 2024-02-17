import React from "react";

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { productData } from "../../../data/product/product";
import { statusData } from "../../../data/status/status";
import { Chip, Divider } from "@mui/joy";

// for accordian
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion, { accordionClasses } from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import { questionData } from "../../../data/question/questions";
import { environmentData } from "../../../data/environment/environment";

const FromPreview = ({ open, handleClose, previewData }) => {
  // various states for storing several information...
  const [statusName, setStatusName] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [groups, setGroups] = React.useState([]);
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [aIndex, setAIndex] = React.useState(null);

  const fetchProductData = () => {
    const gotProductData = productData.filter(item => item.id === previewData?.productId && item);
    if (gotProductData.length > 0) {
      setProductName(gotProductData[0].text);
    }
  };

  const fetchStatusData = () => {
    const gotStatusData = statusData.filter(item => item.id === previewData?.statusId && item);
    if (gotStatusData.length > 0) {
      setStatusName(gotStatusData[0].text);
    }
  };

  const fetchAllQuestions = () => {
    // const gotGroups = questionData && questionData.length > 0 && questionData.filter(item => item?.formId == previewData?.id);
    // setAllQuestions(gotGroups);

    // first get all Questions
    const filteredQuestions = questionData && previewData && questionData?.length > 0 && questionData?.filter(question => question?.formId === previewData?.id);
    console.log("Questions", filteredQuestions)
    setAllQuestions(filteredQuestions);
  };

  const fetchGroupNameFromQuestion = () => {
    // const allGroups = allQuestions && allQuestions.length > 0 && allQuestions.map(item => {
    //   return environmentData && environmentData.length > 0 && environmentData.filter(element => element?.id == item?.grpId)
    // });
    // setGroups(allGroups);

    // now get environment name
    const extractedEnvironments = allQuestions && Array.from(new Set(allQuestions.map(question => {
      const environment = environmentData.find(env => env.id === question.grpId);
      return environment ? environment : {};
    }))).sort((a, b) => a.id - b.id);
    console.log("Extracted", extractedEnvironments);
    setGroups(extractedEnvironments);
  };

  React.useEffect(() => {
    fetchAllQuestions();
  }, []);

  React.useEffect(() => {
    fetchProductData();
    fetchStatusData();
    fetchAllQuestions();
    // fetchGroupNameFromQuestion();
  }, [open]);

  React.useEffect(() => {
    fetchGroupNameFromQuestion()
  }, [allQuestions]);

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: "60%",
            maxWidth: "70%",
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {productName}
          </Typography>
          <Divider />
          <div id="modal-desc" className="product-status-container">
            {/* Header Part */}
            {/* <div className="product-status">
              <Typography component="h2" textColor="inherit" fontWeight="lg">
                {productName}
              </Typography>
              <Typography className="status-container" component="h4" textColor="inherit" fontWeight="lg">
                {statusName}
              </Typography>
            </div> */}

            {
              groups && groups.length > 0 && groups.map(element => (
                <>
                  <div className="my-3">
                    <Divider>
                      <Chip variant="soft" color="neutral" size="lg">
                        Questions {element.name}
                      </Chip>
                    </Divider>
                  </div>

                  <div className="question-container">
                    <AccordionGroup
                      variant="soft"
                      sx={{
                        maxWidth: "100%",
                        minWidth: "70%",
                        [`& .${accordionSummaryClasses.indicator}`]: {
                          transition: '0.2s ease',
                        },
                        [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                          transform: 'rotate(45deg)',
                        },
                        [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                          bgcolor: 'background.level1',
                          borderRadius: 'md',
                          borderBottom: '1px solid',
                          borderColor: 'background.level2',
                        },
                      }}
                      transition="0.2s ease"
                    >
                      {console.log(allQuestions)}
                      {
                        allQuestions && allQuestions.length > 0 && allQuestions.map((question, index) => question.grpId == element.id && (
                          <>
                            <Accordion expanded={aIndex === index}
                              onChange={(event, expanded) => {
                                setAIndex(expanded ? index : null);
                              }}>
                              <AccordionSummary indicator={<AddIcon />}>{question.title}</AccordionSummary>
                              <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.
                              </AccordionDetails>
                            </Accordion>
                          </>
                        )
                        )
                      }
                      {/* <Accordion expanded={index === 0}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 0 : null);
                        }}>
                        <AccordionSummary indicator={<AddIcon />}>First accordion</AccordionSummary>
                        <AccordionDetails>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={index === 1}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 1 : null);
                        }}>
                        <AccordionSummary indicator={<AddIcon />}>Second accordion</AccordionSummary>
                        <AccordionDetails>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={index === 2}
                        onChange={(event, expanded) => {
                          setIndex(expanded ? 2 : null);
                        }}>
                        <AccordionSummary indicator={<AddIcon />}>Third accordion</AccordionSummary>
                        <AccordionDetails>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                        </AccordionDetails>
                      </Accordion> */}
                    </AccordionGroup>
                  </div>
                </>
              ))
              // console.log(groups)
            }

            {/* <div className="my-3">
              <Divider>
                <Chip variant="soft" color="neutral" size="lg">
                  Questions
                </Chip>
              </Divider>
            </div> */}

            {/* Question Data */}

          </div>
        </Sheet>
      </Modal>
    </>
  )
}

export default FromPreview