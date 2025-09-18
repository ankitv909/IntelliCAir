import React from 'react';
import Button from "@mui/material/Button";
import Image from "next/image";
interface TestResultDialogProps {
    open:boolean
}
const TestResultDialog = (props:TestResultDialogProps) => {
    const {open=true}=props
    return (
        <dialog open={open} className={'z-20 h-[60%] w-[60%] bg-green shadow-2xl shadow-gray-600 rounded-xl p-6 flex items-center align-middle justify-center'}>

            <div className={'flex flex-col items-center justify-center gap-4'}>
                <Image src={'/images/sucess-white.svg'} width={80} height={80} alt={'heart'}/>
                <p className={'text-2xl text-center text-white font-semibold'}>Yay! You just completed the test</p>


            <Button onClick={()=>window.close()} sx={{
                backgroundColor: "#CEFDE5", color: "green", fontSize: "14px", mt: 5, px: 5, borderRadius: '2rem',
                '&:hover': {
                    backgroundColor: "#CEFDE5",
                    color: "white",
                }
            }}>Know your Result</Button>
            </div>

        </dialog>
    );
};

export default TestResultDialog;
