import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import {Close} from "@mui/icons-material";

import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, {useState} from "react";
import useClipboard from "../../../hooks/useClipboard";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';




const BbbCheckModal=({open,setIsOpen, setSubmitModal}:any)=>{
    const [checked, setChecked, ] = React.useState(false);
    

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleCheckedChange = (e: any) => {
        setChecked(e.target.checked);
    };
    return(
        <Dialog sx={{padding: "0px 0px", }} open={open} PaperProps={{ sx: { borderRadius: "20px" } }}>
            <DialogTitle sx={{padding: 0}}>
                <Typography component={"h2"} sx={{
                    backgroundColor: '#008059',
                    color:  'white',
                    padding: 5,
                    fontWeight: "bold"
                }}>Agent Onboarding</Typography>
            </DialogTitle>
            <DialogContent sx={{paddingX:'40px'}}>
                <Typography sx={{paddingY: "1rem", color: 'black'}} fontWeight={600} >BBB Company Existence & Rating Check Aggrement</Typography>
                <Box sx={{border: "4px solid rgba(0, 128, 89, 0.5)", borderRadius: "0.5rem" ,height: "200px", padding:  3,overflowY: "overlay"}}>
                    <ul>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>
                        <li><Typography fontWeight={500} fontSize={"0.8rem"} >BBB Company Existence & Rating Check Aggrement BBB Company Existence &</Typography></li>

                    </ul>
                </Box>
                <Box sx={{paddingY: "1rem"}}>
                    <Box sx={{display: 'flex', justifyContent: 'start', alignItems: "center"}}>
                        <Box>
                            <Checkbox
                                sx={{ paddingRight: '12px', height: '12px' }}
                                onChange={handleCheckedChange}
                                checked={checked}
                            />
                        </Box>
                        <Box >
                            <Typography fontWeight={500} fontSize={"0.8rem"} >I/ We agree for BBB Verification of our company</Typography>
                        </Box>
                    </Box>
                    <Box sx={{paddingTop: "1rem"}}>
                        <Button sx={{backgroundColor: "#FFBA53", color: "white",
                            '&:hover': {
                                color: 'white !important',
                                backgroundColor: '#FFBA53 !important',

                            }}} onClick={()=> {
                            setIsOpen(false)
                        }}><WestIcon/> Cancel </Button>
                        <Button sx={{backgroundColor: "#008059", color: "white",  marginLeft: "1rem",
                            '&:hover': {
                                color: 'white !important',
                                backgroundColor: '#008059 !important',
                            },
                            '&:disabled': {
                                color: 'white',
                                backgroundColor: '#008059',
                                opacity: 0.5, // Adjust opacity as needed
                                cursor: 'not-allowed',
                            }
                            }}
                            disabled={!checked}

                            onClick={()=> {
                                setIsOpen(false)
                                setSubmitModal(true)
                            }

                        }>
                            Submit <EastIcon/>
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )

}
export default BbbCheckModal
