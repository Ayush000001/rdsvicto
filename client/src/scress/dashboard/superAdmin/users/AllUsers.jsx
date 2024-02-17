import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TotalUsers from '../../../../components/dashboard/table/TotalUsers';
import AddIcon from "@mui/icons-material/Add"
import { useState } from 'react';

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';

export default function UserPage() {
    const [addClientModal, setAddClientModal] = useState(false);

    return (
        <TotalUsers />
    );
}