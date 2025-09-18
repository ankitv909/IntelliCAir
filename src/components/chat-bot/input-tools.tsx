import {IToolCalls, IToolCallsArgs} from "@/interfaces/bot-response.interface";
import ChatInput from "@/components/chat-bot/chat-bot-input";
import React, {ChangeEvent, useState} from "react";
import {uploadResume} from "@/redux/apps/chat-bot/actions";
import {useAppDispatch} from "@/redux/hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {loginTokenStorage} from "@/@core/utils/axios";

interface InputToolsProps {
    tool: IToolCalls;
    onChange: (e: string, tool: IToolCalls, isFileUpload?: boolean) => void;
}

interface ITextInput extends IToolCallsArgs {
    onChange: (e: string, tool: IToolCalls, isFileUpload?: boolean) => void,
    tool: IToolCalls,
}

interface ILinkInput extends IToolCallsArgs {
    onChange: (e: string, tool: IToolCalls, isFileUpload?: boolean) => void,
    tool: IToolCalls,
    jobApplicationId: string | undefined,
    conversationId: string | undefined,
}

interface IChatEndRemark {
    tool: IToolCalls,
}

interface IEndToolCallsArgs {
    result: string,
    toolCallId: string,
}


const FileInput = ({inputHint, inputType, onChange, tool}: ITextInput) => {
    const [fileUploading, setFileUploading] = useState(false);
    const dispatch = useAppDispatch();
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setFileUploading(true);
        if (files && files.length > 0) {
            const file: File = files[0];
            if (!(file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("txt") || file.type.includes("docx"))) {
                alert("Please upload a PDF file.");
                setFileUploading(false);
                return;
            }
            if (file.size > 2097152) {
                alert("File size should not exceed 2 MB.");
                setFileUploading(false);
                return;
            }

            const response = await dispatch(uploadResume({
                file: file, toolCallId: tool.toolCallId, messageId: ''
            })).then(unwrapResult);
            if (response) {
                console.log('response after file upload', response.filePath)
                onChange(response.filePath, tool, true);
            }
            setFileUploading(false);
        }
    };

    return <div className={'flex flex-col gap-2 py-2'}>
        <Box className={'flex flex-col gap-2'}>
            <button
                className="chat-upload rounded-full"
            ><input
                onChange={handleFileChange}
                className={'file-upload-input'}
                type="file"
                id="file-upload"
                accept=".doc, .docx,.txt,.pdf"
            />
                {fileUploading ? 'uploading...' : 'Click here to upload'}
            </button>
            <button
                className="chat-upload-no rounded-full"
                onClick={() => {
                    onChange('No, I want to upload manually', tool)
                }}
            >
                No, I want to upload manually
            </button>
        </Box>
        <Box className={'file-uploaded-suggest'}>
            <Typography sx={{color: '#0746DD', fontSize: 13}}>
                Tip:
            </Typography>
            <Typography sx={{color: '#5F5F5F', fontSize: 13}}>
                File should be in PDF format and maximum limit is 2 MB in size
            </Typography>
        </Box>
        {/*<button className={'chat-upload-no rounded-full'} onClick={() => { onChange('No, I want to add manually', tool) }}>*/}
        {/*    No, I want to add manually*/}
        {/*</button>*/}
    </div>
}

const TextInput = ({inputHint, inputType, onChange, tool}: ITextInput) => {
    return (<ChatInput tool={tool} inputHint={inputHint} inputType={inputType} onChange={onChange}/>)
}

const DateInput = ({inputHint, inputType, onChange, tool}: ITextInput) => {
    return <ChatInput tool={tool} inputHint={inputHint} inputType={inputType} onChange={onChange}/>
}

export const LinkInput = ({inputHint, inputType, onChange, tool, jobApplicationId, conversationId,}: ILinkInput) => {
    const token = loginTokenStorage();
    const onLinkClick = () => {
        const newWindow = window.open(`/test?token=${token}&jobApplicationId=${jobApplicationId}&conversationId=${conversationId}&toolCallId=${tool.toolCallId}`, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    }
    return <div className={'flex flex-col gap-2 py-2'}>
        <Box className={'flex flex-col gap-2'}>
            <button onClick={onLinkClick}
                    className="chat-upload rounded-full"
            >
                Click here take our evaluation test.
            </button>
        </Box>
    </div>
}
export const ChatEndRemark = ({tool}: IChatEndRemark) => {
    const _toolArgs: IEndToolCallsArgs = JSON.parse(tool.toolCallArgs);

    return <div className={'flex flex-col justify-center w-full gap-2 py-2'}>
        <p className={'font-semibold text-[12px] leading-[1.2]'}>{_toolArgs.result}</p>
        <p
            className="rounded-full text-center italic text-xs"
        >
            *** This Chat has been ended ***
        </p>

    </div>
}

const InputTools = ({tool, onChange}: InputToolsProps) => {
    try {
        const _toolArgs: IToolCallsArgs = JSON.parse(tool.toolCallArgs);
        return (<>
                {_toolArgs.inputType === 'textInput' ?
                    <TextInput onChange={onChange} {..._toolArgs} tool={tool}/> : _toolArgs.inputType === 'fileInput' ?
                        <FileInput onChange={onChange} {..._toolArgs}
                                   tool={tool}/> : _toolArgs.inputType === 'dateInput' ?
                            <DateInput onChange={onChange} {..._toolArgs} tool={tool}/> : null}
            </>);
    } catch (error) {
        console.error("Failed to parse toolCallArgs", error);
        return <div>Error parsing input configuration.</div>;
    }
};


export default InputTools;
