import React from "react";

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Button, DialogActions, DialogContent } from "@mui/joy";

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from "@mui/joy/DialogTitle"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Divider } from "@mui/material";


// Radio Button
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import Apartment from '@mui/icons-material/Apartment';

const Summary_Data = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mx-auto py-5">
                    <div className="shadow rounded px-4 py-5 bg-light">
                        <h3 className="mb-5 text-dark fw-bold">Summary Data</h3>
                        <div className="field">
                            <FormControl>
                                <FormLabel>Please provide your Company Name</FormLabel>
                                <Input color="neutral" size="md" variant="outlined" placeholder="Enter Details" />
                            </FormControl>
                        </div>

                        <div className="field my-4">
                            <FormControl>
                                <FormLabel>Please provide the name of your software product/platform</FormLabel>
                                <Input color="neutral" size="md" variant="outlined" placeholder="Enter Details" />
                            </FormControl>
                        </div>

                        <div className="field my-4">
                            <FormControl>
                                <FormLabel>Please state the type of software product being assessed - please select</FormLabel>
                                <Select
                                    placeholder="Please Select"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        width: "100%",
                                        [`& .${selectClasses.indicator}`]: {
                                            transition: '0.2s',
                                            [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Option value="system">System</Option>
                                    <Option value="general">General</Option>
                                    <Option value="entertainment">Entertainment</Option>
                                    <Option value="web-application">Web Application</Option>
                                    <Option value="channel-layer">Channel Layer</Option>
                                    <Option value="crm">CRM</Option>
                                    <Option value="erp">ERP</Option>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="field my-4">
                            <FormControl>
                                <FormLabel>Please add the date of the assessment</FormLabel>
                                <Input color="neutral" size="md" variant="outlined" placeholder="Enter Details" />
                            </FormControl>
                        </div>

                        <div className="field my-4">
                            <FormControl>
                                <FormLabel>Scope Mapping Category</FormLabel>
                                <Select
                                    placeholder="Please Select"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        width: "100%",
                                        [`& .${selectClasses.indicator}`]: {
                                            transition: '0.2s',
                                            [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Option value="cb0ppc">Client Build On-Prem/Private Cloud</Option>
                                    <Option value="cbpc">Client Build Public Cloud</Option>
                                    <Option value="pbcop">Partner Build / Client On-Prem</Option>
                                    <Option value="pbppc">Partner Build / Partner / Public Cloud</Option>
                                    <Option value="hbcoppc">Hybrid Build Client On-Prem / Private Cloud</Option>
                                    <Option value="hboppc">Hybrid Build on Partner / Public Cloud</Option>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="field d-flex align-items-center gap-2 mt-5">
                            <Button color="danger" size="md" variant="outlined">Reset</Button>
                            <Button color="success" size="md" variant="solid" onClick={() => setOpen(true)}>Submit</Button>
                        </div>
                    </div>

                    {/* Modal for Confirming */}
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <ModalDialog variant="outlined" role="alertdialog">
                            <DialogTitle>
                                <WarningRoundedIcon />
                                You have to choose either of the two
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
                                    <List
                                        sx={{
                                            minWidth: 240,
                                            '--List-gap': '0.5rem',
                                            '--ListItem-paddingY': '1rem',
                                            '--ListItem-radius': '8px',
                                            '--ListItemDecorator-size': '32px',
                                        }}
                                    >
                                        {['Original Build Estimate', 'Full Assessment'].map((item, index) => (
                                            <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm' }}>
                                                <ListItemDecorator>
                                                    {[<Person />, <People />, <Apartment />][index]}
                                                </ListItemDecorator>
                                                <Radio
                                                    overlay
                                                    value={item}
                                                    label={item}
                                                    sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                                    slotProps={{
                                                        action: ({ checked }) => ({
                                                            sx: (theme) => ({
                                                                ...(checked && {
                                                                    inset: -1,
                                                                    border: '2px solid',
                                                                    borderColor: theme.vars.palette.primary[500],
                                                                }),
                                                            }),
                                                        }),
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </RadioGroup>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="solid" color="success" onClick={() => setOpen(false)}>
                                    Continue
                                </Button>
                            </DialogActions>
                        </ModalDialog>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Summary_Data