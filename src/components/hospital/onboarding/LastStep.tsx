// @flow
import * as React from 'react';
import Box from "@mui/material/Box";
import Image from 'next/image'
import ThankyouImg from '@public/thankyou.png'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useRouter} from "next/router";



export const LastStep = (props: any) => {
    const {currentStep, setCurrentStep} = props;
    const router=useRouter()

    return (
        <Box component={'div'} sx={{
            backgroundColor: '#008059',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: '12px',
            p: 20,
            pb: 10,
            my: 20
        }}>
            <Box component={'h2'} sx={{color: 'white', fontWeight: "bold"}}>
                Thank you for joining IntellicAIr!
            </Box>
            <Image style={{width: "10rem", margin: "10px"}} src={ThankyouImg} alt={"Thankyou"} />
            <Typography sx={{color: 'white', pb: 5 }}>
                Your Hospital has been successfully onboarded on IntellicAIr Platform
            </Typography>
            <Typography  sx={{color: 'white', pb: 5  }}>
                You will receive a confirmation email    with login instructions on PoC email address Authorized Person email address
            </Typography>
            <Button sx={{backgroundColor: "white", color: "#008059", fontSize: '1rem',my: 5, py: 2, px: 16,
                '&:hover': {
                    backgroundColor: "white !important", color: "#008059 !important",
                },


            }} onClick={()=> router.replace('/login')} size="large">
                Okay
            </Button>

        </Box>
    );
};
