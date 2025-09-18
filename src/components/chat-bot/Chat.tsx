"use client";
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import Image from "next/image";
import ChatInput from "@/components/chat-bot/chat-bot-input";
import {extractFileExtension, formatJobType} from "@/@core/utils/format";
import {conversationReply, fetchJobsConversion, IToolResponse, jobApply} from "@/redux/apps/chat-bot/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import {botResponse, botResponseLoading} from "@/redux/apps/chat-bot/chat.selector";
import {IBotResponse, IToolCalls, IToolCallsArgs} from "@/interfaces/bot-response.interface";
import InputTools, {ChatEndRemark, LinkInput} from "@/components/chat-bot/input-tools";
import dynamic from "next/dynamic";
import {Simulate} from "react-dom/test-utils";
import themeConfig from "@/configs/themeConfig";
/*import {Player} from "@lottiefiles/react-lottie-player";*/
import error = Simulate.error;
import PerfectScrollbar from "react-perfect-scrollbar";
import {setBotResponse} from "@/redux/apps/chat-bot/chat.slice";
import {Job} from "@/interfaces/get-all-jobs-response.interface";


interface Message {
    text: string;
    type: 'user' | 'bot';
}

interface ChatProps {
    job: Job;
    onClose: () => void;
}

const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), {
    ssr: false,
});

const ReactMarkdown = dynamic(() => import("react-markdown"), {ssr: false});


const Chat: React.FC<ChatProps> = ({job, onClose}) => {
    const dispatch = useAppDispatch();
    const response: IBotResponse | null = useAppSelector(botResponse);
    const loading: boolean = useAppSelector(botResponseLoading);
    /* const [isLoading, setIsLoading] = useState(false);*/
    const toolCalls: IToolCalls[] = Object.assign([], response?.toolCalls);
    const scrollbarRef = useRef<any | HTMLElement>(null);
    const [submittedExamData, setSubmittedExamData] = useState(undefined)
    const chatBoxRef = useRef<LegacyRef<HTMLDivElement> | undefined | null>(null);

    const channel = new BroadcastChannel("test-channel");
    channel.addEventListener("message", (event) => {
        setSubmittedExamData(event.data)
    });


    function scrollToBottom() {
        // const curr = scrollbarRef.current

        const box = document.querySelector('.chat-bot-box')

        if (box) {
            box.scrollTo(100, box.scrollHeight)
        }
        // if (curr) {
        //     console.log(curr.scrollTop, curr.clientHeight);
        //     curr.scrollTop = curr.scrollHeight;
        //     curr.scrollIntoView({behavior: "smooth"});
        // }
    }

    useEffect(() => {

        scrollToBottom()
        // const chatBox=  document.getElementById('#scrollBox')
        // console.log('chat box--',chatBoxRef.current.)
    }, [response, loading]);

    useEffect(() => {
        (async () => {
            if (job.id) {
                try {
                    const response = await dispatch(fetchJobsConversion({jobId: job.id}));
                    const oldConversionResult = unwrapResult(response);
                    console.log('oldConversionResult::', oldConversionResult.conversation);
                    if (oldConversionResult.conversation === null || oldConversionResult.messages.length === 0) {
                        const result = await dispatch(jobApply({
                            jobPostId: job.id
                        })).then(unwrapResult);
                        if (result) {

                            console.log('Job apply result', result);
                        }
                    }
                } catch {
                    console.log(error);
                }
            }
        })()
    }, [submittedExamData]);

    const handleSendMessage = async (messageText: string, tool: IToolCalls, isFileUpload:boolean =false) => {
        try {
            /*const _toolArgs: IToolCallsArgs = JSON.parse(tool.toolCallArgs);*/
            const payload: IToolResponse = {
                agent: tool.agent as string,
                toolCallId: tool.toolCallId as string,
                toolResponse: isFileUpload ? "" : messageText,
            }
            if (isFileUpload) {
                payload.filePath = messageText;
            }
            const resultAction = await dispatch(conversationReply({
                conversationId: response?.conversation?.id as string, toolResponses: [payload]
            }));
            const res = unwrapResult(resultAction);
            if (res) {
                console.log('now scroll')
                scrollToBottom();
            }
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    return (<div className={'chat-overflow px-48'}>
            <div className="bg-white chat_box rounded-lg pt-2 pb-2 w-full lg:w-2/3 xl:w-1/2">
                <div className="flex flex-row gap-4 items-center p-4 pl-8 divider2x">
                    <Image src={'/images/arrow-back.svg'} onClick={onClose} width={24} height={24} alt={'Logo'}/>
                    <Image src={'/images/logo.svg'} width={28} height={28} alt={'Logo'}/>
                    <div className="flex flex-col gap-2 ">
                        <Image src={'/images/intellic.svg'} width={80} height={60} alt={'Logo'}/>
                        <div className="flex items-center flex-row gap-1 ">
                            <div className={'online'}></div>
                            <h6 className={'online-text'}>Online</h6>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-7 justify-between items-start p-4 chatbox-job-id ">
                    <div className="flex flex-col ">
                        <h6>{job.speciality}</h6>
                        <h6>Job ID - #{job.id}</h6>
                        <div className={'flex flex-row items-center gap-2 mt-1'}>
                            <span
                                className={`${formatJobType(job.jobType) === 'FULL-TIME' ? 'full-time-shade' : 'part-time-shade'}`}>{formatJobType(job.jobType)}</span>
                            {job.jobType === 'FULL_TIME' ?
                                <span>Salary: ${job?.jobDetails?.salaryLowerLimit}-${job?.jobDetails?.salaryUpperLimit}</span> :
                                <span>Hourly Average: ${job?.jobDetails?.hourlyPay}</span>}
                        </div>
                    </div>
                   {/* <div className={'expand-icon'}>
                        <Image src={'/images/expand-icon.svg'} width={16} height={16} alt={'Logo'}/>
                    </div>*/}
                </div>
                <div className="mb-4 max-h-96 overflow-y-auto chat-bot-box" ref={chatBoxRef.current}>
                    {/*<PerfectScrollbar id={'scrollBox'}*/}
                    {/*    containerRef={(ref) => {*/}
                    {/*            scrollbarRef.current = ref;*/}
                    {/*    }}*/}
                    {/*>*/}


                       {response && response.messages && response.messages.length > 0 && response.messages.map((msg, index) => (
                           <div
                               key={index}
                               className={`rounded-lg ${msg.role === 'USER' ? 'flex justify-end' : 'flex flex-row justify-start gap-2 items-end'}`}
                           >
                               {msg.role === 'BOT' && (<div className={'rounded-lg icon-shadow'}>
                                   <Image src={'/images/logo.svg'} width={24} height={24} alt="Bot Icon"/>
                               </div>)}
                               <div className={`rounded-lg ${msg.role === 'USER' ? extractFileExtension(msg.content).includes('pdf') ? 'm-2' : `${formatJobType(job.jobType) === 'FULL-TIME' ? 'chat-bot-user-message-full-time' : 'chat-bot-user-message'}` : 'chat-bot-message m-2'}
                                ${extractFileExtension(msg.content).includes('pdf') ? `file-upload-user-${msg.role.toLowerCase()}` : ''}`}>
                                   {extractFileExtension(msg.content).includes('pdf') ? <div
                                       className={'file-upload-preview-show flex flex-row gap-4 items-center'}>
                                       <div className={'uploaded-file-bg '}>
                                           <Image alt={themeConfig.templateName} priority={false}
                                                  src={'/images/pdf.svg'} width={20} height={20}/>
                                           {/*<div className={'close-icon-position'}><Image
                                               alt={themeConfig.templateName} priority={false}
                                               src={'/images/close-icon.svg'} width={12} height={12}/></div>*/}
                                       </div>
                                       <span>{`uploaded file`}</span>
                                   </div> : <ReactMarkdown className={"markdownClass"}
                                       // remarkPlugins={[remarkGfm]}
                                   >{msg.content}</ReactMarkdown>}
                               </div>
                           </div>))}
                       {(loading) && <span className="flex justify-start items-center max-h-12">
                            <Player
                                autoplay
                                loop
                                src="/images/typing-bubble.json"
                                style={{height: '80px', width: '80px', transform: 'rotateY(180deg)'}}>
                            </Player>
                        </span>}

                    {/*</PerfectScrollbar>*/}
                </div>
                <div className="flex px-8 justify-end">
                    {toolCalls && toolCalls.length > 0 && toolCalls.reverse().map((tool: IToolCalls, index: number) => {
                        return index === 0 ? tool?.toolToBeCalled.toLowerCase().includes('input') ?
                            <InputTools key={index} tool={tool}
                                        onChange={handleSendMessage}/> : tool?.toolToBeCalled.toLowerCase().includes('prompt') ?
                                <ChatInput key={index} tool={tool} inputHint={''} inputType={'fileInput'}
                                           onChange={handleSendMessage}/> : tool?.toolToBeCalled.toLowerCase().includes('taker') ?
                                    <LinkInput key={index} tool={tool} inputHint={''} inputType={'link'}
                                               jobApplicationId={response?.conversation?.subjectId}
                                               conversationId={response?.conversation?.id}
                                               onChange={handleSendMessage}/> : tool?.toolToBeCalled.toLowerCase().includes('endconversation') ?
                                    <ChatEndRemark tool={tool}/> : null : null
                    })}
                </div>


            </div>
        </div>);
};

export default Chat;
