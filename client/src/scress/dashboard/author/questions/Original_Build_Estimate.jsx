import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { environmentData } from "../../../../data/environment/environment";
import { questionData } from "../../../../data/question/questions";

const steps = [
    {
        label: "Development Environment",
        targetId: 1
    },
    {
        label: "Test Environment",
        targetId: 2
    },
    {
        label: "Engineering Factors",
        targetId: 3
    },
    {
        label: "People",
        targetId: 4
    }
];

const Development_Environment = ({ step }) => {
    const [questions, setQuestions] = React.useState([]);

    const fetchAllQuestions = () => {
        const filteredQuestions = questionData.filter(question => question.grpId === step);
        setQuestions(filteredQuestions);
    };

    React.useEffect(() => {
        fetchAllQuestions();
    }, [step]);

    return (
        <>
            {questions.map(question => (
                <p>{question.title}</p>
            ))}
        </>
    )
};

const Original_Build_Estimate = () => {
    const [groups, setGroups] = React.useState(environmentData);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const getActiveStep = step => {
        return (
            <Development_Environment step={step + 1} />
        )
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mx-auto py-5">
                    <div className="shadow rounded px-4 py-5 bg-light">
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep}>
                                {groups.map((grp) => {
                                    return (
                                        <Step key={grp.id}>
                                            <StepLabel>{grp.name}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length + 1 ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Box sx={{ maxWidth: "100%", marginY: "20px", marginX: "20px", border: "2px solid #E9E7E7", padding: "30px 10px" }}>
                                        {getActiveStep(activeStep)}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Original_Build_Estimate