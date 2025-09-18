import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Box from '@mui/material/Box';
import ThankyouImg from '@public/thankyou.png'
import Image from 'next/image'


const SixthHospital = ({setOpen, handleNext, handleBack, jobType, handleClose}: any) => {
    const [checked, setChecked,] = React.useState(false);


    const handleCheckedChange = (e: any) => {
        setChecked(e.target.checked);
    };
    return (
        <Box component={'div'} sx={{
            backgroundColor: '#008059',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: '0px',
            padding:'4rem'
        }}>
            <Box component={'h2'} sx={{color: 'white', fontWeight: "bold"}}>
                Congratulations!
            </Box>
            <Image style={{width: "10rem", margin: "10px"}} src={ThankyouImg} alt={"Thank-you"}/>
            <Typography sx={{color: 'white', pb: 5}}>
                Your {jobType} Job Created successfully
            </Typography>

            <Button sx={{
                backgroundColor: "white", color: "#008059", fontSize: '1rem', my: 5, py: 2, px: 16,
                '&:hover': {
                    backgroundColor: "white !important", color: "#008059 !important",
                },


            }} onClick={() => {
                handleClose()
            }} size="large">
                Continue
            </Button>

        </Box>
    )

}
export default SixthHospital
