import React, {useContext, useEffect, useRef, useState} from "react";
import {formatYear, getAbbreviation} from "@/@core/utils/format";
import { FaEdit } from "react-icons/fa";
import {uploadProfileImage} from "@/redux/apps/profile-image-upload/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
    fileUploadStatus,
    previousFilePathSelector,
    setPreviousFilePath
} from "@/redux/apps/profile-image-upload/profile-image.slice";
import {fileUploadProgress} from "@/redux/apps/chat-bot/chat.slice";
import Image from "next/image";
import toast from "react-hot-toast";
import {AuthContext} from "@/context/AuthContext";
import authConfig from '@/configs/auth';



const ProfileSummary = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const formattedDate = userData?.createdAt ? formatYear(userData.createdAt) : '';
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const [fileUploading, setFileUploading] = useState(false);
    const uploadStatus = useAppSelector(fileUploadStatus);
    const uploadPercent = useAppSelector(fileUploadProgress);
    const previousFilePath = useAppSelector(previousFilePathSelector);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { fetchUserData } = useContext(AuthContext);


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
        setIsLoading(false);
    }, []);

    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileUploading(true);
        setErrorMessage(null);
        const file = e.target.files?.[0];
        if (file) {
            if (file.name === previousFilePath) {
                setErrorMessage('Already uploaded image');
                toast.error('Already uploaded image');
                setFileUploading(false);
                return;
            }
            try {
                await dispatch(uploadProfileImage({ file, email: userData?.email as string })).unwrap();
                dispatch(setPreviousFilePath(file.name));
                const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
                if (token) {
                    await fetchUserData(token);
                    const updatedUserData = localStorage.getItem('userData');
                    if (updatedUserData) {
                        setUserData(JSON.parse(updatedUserData));
                    }
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                setFileUploading(false);
            }
        }
    };



    if (isLoading) {
        return <div>Loading...</div>;
    }



    return <div className={'card flex flex-col '}>
        {/*<div className={'flex flex-row justify-end gap-1.5'}>
            <Image src={'/images/heart.svg'} width={20} height={20} alt={'heart'}/>
            <span className={'full-time-text'}>10</span>
        </div>*/}
        <div className={'flex flex-row gap-4 items-center'}>
            <div  onClick={handleEditClick}  className={`relative inline-flex items-center justify-center overflow-hidden bg-fuchsia-600 rounded-full ${userData?.role === 'HOSPITAL' ? 'w-16 h-16' : 'w-[60px] h-[60px]'}`}>
                {fileUploading ? (
                    <span className={'text-white text-xs'}>{'Loading..'}</span>
                ) : (
                    userData?.logo ? (
                        <Image src={userData.logo} alt={''} layout="fill" />
                    ) : (
                        <span className="font-medium text-gray-600 dark:text-gray-300">{getAbbreviation(userData?.hospital?.name || '')}</span>
                    )
                )}
               {/* <div className="absolute top-0 right-0 w-6 h-6  rounded-full flex items-center justify-center" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <FaEdit className="text-white" />
                </div>*/}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <div className={'flex flex-col max-w-52 '}>
                <h6> {userData?.role ==='HOSPITAL'?userData?.hospital?.name :userData?.email}</h6>
                <span>Member since {formattedDate}</span>
            </div>
        </div>
        {/*<div className={'profile-complete'}>
            <span>Profile Completion</span>
            <span>67%</span>
        </div>*/}
    </div>
}

const ForumsList = () => {
    return <div className={'flex flex-col'}>
        <div className={'flex flex-row items-center gap-2 forums-card'}>
            <Image src={'/images/bowls-icon.svg'} width={36} height={36} alt={'Logo'}/>
            <h6>Forums</h6>
        </div>
        <div className={'forums-second-card flex flex-col gap-8'}>
            <div className={'flex flex-row items-center gap-2'}>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green rounded-full">
                    <Image src={'/images/medical-cross.svg'} width={20} height={20} alt={'Logo'}/>
                </div>
                <h6>Critical Care Nurse</h6>
            </div>
            <div className={'flex flex-row items-center gap-2'}>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green rounded-full">
                    <Image src={'/images/medical-cross.svg'} width={20} height={20} alt={'Logo'}/>
                </div>
                <h6>Emergency Room (ER)</h6>
            </div>
            <div className={'flex flex-row items-center gap-2'}>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green rounded-full">
                    <Image src={'/images/medical-cross.svg'} width={20} height={20} alt={'Logo'}/>
                </div>
                <h6>Medical-Surgical Nurse</h6>
            </div>
            <div className={'flex flex-row items-center gap-2'}>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green rounded-full">
                    <Image src={'/images/medical-cross.svg'} width={20} height={20} alt={'Logo'}/>
                </div>
                <h6>Pediatric Nurse</h6>
            </div>
            <div className={'flex flex-row items-center gap-2'}>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green rounded-full">
                    <Image src={'/images/medical-cross.svg'} width={20} height={20} alt={'Logo'}/>
                </div>
                <h6>Obstetric and Gynecologic</h6>
            </div>
        </div>
    </div>
}

const Sidenav = () => {
    return (
       <div className={'flex flex-col gap-6'}>
           <ProfileSummary />
           {/*<ForumsList />*/}
       </div>
    );
};

export default Sidenav;
