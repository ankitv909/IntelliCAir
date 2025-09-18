"use client"
import React, {ReactNode, useEffect, useState} from 'react';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import BlankLayoutWithoutFooter from "@/@core/layouts/BlankLayoutWithoutFooter";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {checkAnswer, initExamination, startExam, submitExam} from "@/redux/apps/chat-bot/actions";
import {useSearchParams} from "next/navigation";
import authConfig from "@/configs/auth";
import {examData, examDataLoading} from "@/redux/apps/chat-bot/chat.selector";
import CircularProgress from "@mui/material/CircularProgress";
import TestInstruction from "@/components/test/test-instruction";
import {unwrapResult} from "@reduxjs/toolkit";
import {examQuestionSelectors} from "@/redux/apps/exam/exam.selector";
import {questionsList} from "@/redux/apps/exam/actions";
import toast from "react-hot-toast";
import TestResultDialog from "@/components/test-result-dialog";
import ConfirmationDialog from "@/components/test/test-confirm";
import Timer from "@/components/test/timer";

const Test = () => {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams()
    const token = searchParams.get('token');
    const jobApplicationId = searchParams.get('jobApplicationId');
    const conversationId = searchParams.get('conversationId');
    const toolCallId = searchParams.get('toolCallId');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const questions = useAppSelector(examQuestionSelectors.selectAll);
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(''));
    const [questionStatuses, setQuestionStatuses] = useState(["Not Answered", ...Array((questions.length - 1) <= 0 ? 0 : (questions.length - 1)).fill('Not Visited')]);
    const handle = useFullScreenHandle();
    const [isMarkedForReview, setIsMarkedForReview] = useState(Array(questions.length).fill(false));
    const [instructionShow, setInstructionShow] = useState(false);
    const loading = useAppSelector(examDataLoading);
    const _examData = useAppSelector(examData);
    console.log('_examData', _examData);
    const answer = searchParams.get('answer');
    const [testResult, setTestResult] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
    const [isAutoSubmitDialogOpen, setIsAutoSubmitDialogOpen] = useState(false);



    const channel = new BroadcastChannel("test-channel");


    useEffect(() => {
        if (token) {
            localStorage.setItem(authConfig.storageTokenKeyName, token);
        }
    }, [token]);

    const handleOptionChange = (optionText: string, index: number) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = optionText;
        setSelectedOptions(newSelectedOptions);

        const newQuestionStatuses = [...questionStatuses];
        newQuestionStatuses[index] = 'Answered';
        setQuestionStatuses(newQuestionStatuses);
    };
    const clearResponse = () => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[currentQuestionIndex] = '';
        setSelectedOptions(newSelectedOptions);

        const newQuestionStatuses = [...questionStatuses];
        newQuestionStatuses[currentQuestionIndex] = 'Not Answered';
        setQuestionStatuses(newQuestionStatuses);
    };

    /*const markForReview = () => {
        const newIsMarkedForReview = [...isMarkedForReview];
        newIsMarkedForReview[currentQuestionIndex] = !isMarkedForReview[currentQuestionIndex];
        setIsMarkedForReview(newIsMarkedForReview);
    };*/

    const navigateQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
        if (questionStatuses[index] === 'Not Visited') {
            const newQuestionStatuses = [...questionStatuses];
            newQuestionStatuses[index] = 'Not Answered';
            setQuestionStatuses(newQuestionStatuses);
        }
    };
    /* const saveAndNext = async () => {
        const userAnswers = selectedOptions[currentQuestionIndex];
        if (userAnswers) {
            const result = await dispatch(checkAnswer({
                answer: [userAnswers], params: {
                    examId: _examData?.id as string, questionNumber: currentQuestion.questionId as string
                }
            })).then(unwrapResult);
            if (result) {
                const nextQuestionIndex = currentQuestionIndex + 1;
                if (nextQuestionIndex < questions.length) {
                    setCurrentQuestionIndex(nextQuestionIndex);
                }
                toast.success('Answer saved successfully.');
            }
        } else {
            toast.error('Please select the option to submit');
        }
    };*/
    const saveAndNext = async () => {
        const userAnswer = selectedOptions[currentQuestionIndex];
        if (userAnswer) {
            try {
                const result = await dispatch(checkAnswer({
                    answer: [userAnswer],
                    params: {
                        examId: _examData?.id as string,
                        questionNumber: currentQuestion.questionId as string
                    }
                })).then(unwrapResult);
                if (result) {
                    toast.success('Answer saved successfully.');
                    const nextQuestionIndex = currentQuestionIndex + 1;
                    if (nextQuestionIndex < questions.length) {
                        setCurrentQuestionIndex(nextQuestionIndex);
                    }
                }
            } catch (error) {
                toast.error('Error saving answer');
            }
        } else {
            toast.error('Please select an option to submit');
        }
    };


    const handleConfirmDialogClose = (confirm: boolean) => {
        setIsConfirmDialogOpen(false);
        if (confirm) {
            submitTest();
        }
    };

    const handleSubmitTestClick = () => {
        const unanswered = selectedOptions
            .map((option, index) => option === '' ? index + 1 : null)
            .filter(index => index !== null) as number[];

        setUnansweredQuestions(unanswered);
        setIsConfirmDialogOpen(true);
    };


    const submitTest = async () => {
        setIsSubmitting(true);
        const result = await dispatch(submitExam({
            examId: _examData?.id as string,
        })).then(unwrapResult);
        setIsSubmitting(false);

        if (result) {
            setTestResult(true);
            channel.postMessage(result);
        }
    };

    const handleAutoSubmit = async () => {
        await submitTest();
        setIsAutoSubmitDialogOpen(true);
    };


    const handleSubmit = () => {
        console.log('Final Answers:', selectedOptions);
    };

    const toggleFullScreen = () => {
        handle.active ? handle.exit() : handle.enter();
    };

    const currentQuestion = questions[currentQuestionIndex];

    const [counts, setCounts] = useState({
        answered: 0, notAnswered: 0, notVisited: 0, markedForReview: 0, answeredAndMarkedForReview: 0
    });

    useEffect(() => {
        const newCounts = {
            answered: 0, notAnswered: 0, notVisited: 0, markedForReview: 0, answeredAndMarkedForReview: 0
        };

        questionStatuses.forEach((status, index) => {
            if (status === 'Answered' && isMarkedForReview[index]) {
                newCounts.answeredAndMarkedForReview++;
            } else if (status === 'Answered') {
                newCounts.answered++;
            } else if (status === 'Not Answered') {
                newCounts.notAnswered++;
            } else if (status === 'Not Visited') {
                newCounts.notVisited++;
            }

            if (isMarkedForReview[index] && status !== 'Answered') {
                newCounts.markedForReview++;
            }
        });

        setCounts(newCounts);
    }, [questionStatuses, isMarkedForReview]);

    const getButtonClass = (index: number) => {
        if (isMarkedForReview[index] && selectedOptions[index]) {
            return "test-review-button";
        } else if (isMarkedForReview[index]) {
            return "test-review-button";
        } else if (selectedOptions[index]) {
            return "test-answered-button";
        } else if (questionStatuses[index] === 'Not Answered') {
            return "test-not-answered-button";
        } else if (questionStatuses[index] === 'Not Visited') {
            return "not-visited-button";
        }
    };
    useEffect(() => {
        setSelectedOptions(Array(questions.length).fill(''));
        setIsMarkedForReview(Array(questions.length).fill(false));
        const length = Math.max(0, questions.length - 1);
        setQuestionStatuses(["Not Answered", ...Array(length).fill('Not Visited')]);
    }, [questions]);

    useEffect(() => {
        if (token && conversationId && jobApplicationId && toolCallId) {
            dispatch(initExamination({
                jobApplicationId, conversationId, toolCallId
            })).then(unwrapResult)
                .then(result => {
                    if (result) {
                        setInstructionShow(true);
                    }
                });
        }
    }, [token, conversationId, jobApplicationId, toolCallId,dispatch]);
    const handleContinue = async () => {
        const startExamResult = await dispatch(startExam({
            examId: _examData?.id as string
        })).then(unwrapResult);
        if (startExamResult) {
            const questionListResult = await dispatch(questionsList({
                examId: _examData?.id as string
            })).then(unwrapResult);
            if (questionListResult) {
                setInstructionShow(false);
                setCurrentQuestionIndex(0);
            }
            console.log('questionListResult', questionListResult)
        }

    }
    const renderQuestionButtons = () => {
        return questions.length > 0 ? (questions.map((_, idx) => (
            <button type="button" className={`${getButtonClass(idx)}`} key={idx}
                    onClick={() => navigateQuestion(idx)}
                    style={{fontWeight: currentQuestionIndex === idx ? 'bold' : 'normal'}}>
                <span className="text-white">{idx + 1}</span>
            </button>))) : (<div>Loading questions...</div>);
    };

    return (testResult ? <div className={'flex justify-center items-center h-screen'}>
        <TestResultDialog open={testResult}/>
    </div> : <FullScreen handle={handle}>

        {loading ? <CircularProgress/> : <div className="testContainer">

            <header className="testHeader flex flex-row">
                <div className={`${instructionShow ? "w-[100%]" : "w-[74%]"} px-4 py-4 flex flex-row justify-between`}>
                    <h6 className={'font-bold'}> MCQ-Clinical Competency Test</h6>
                    <svg onClick={toggleFullScreen} className="h-5 w-5 text-blue-500" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                              d="M0.69654 6.04467C1.08131 6.04467 1.39308 5.73281 1.39308 5.34813V2.37827L5.87927 6.86352C6.01532 6.99949 6.19354 7.06747 6.37177 7.06747C6.55008 7.06747 6.7284 6.99949 6.86436 6.86343C7.13638 6.59141 7.13638 6.15036 6.86427 5.87843L2.3779 1.39308H5.34841C5.73309 1.39308 6.04495 1.08122 6.04495 0.69654C6.04495 0.311864 5.73318 0 5.34841 0H0.69654C0.311771 0 0 0.311864 0 0.69654V5.34822C0 5.73281 0.311771 6.04467 0.69654 6.04467Z"></path>
                        <path fill="currentColor"
                              d="M19.3034 13.9548C18.9186 13.9548 18.6068 14.2666 18.6068 14.6513V17.6213L13.9826 12.997C13.7105 12.725 13.2695 12.725 12.9975 12.997C12.7255 13.269 12.7255 13.7101 12.9975 13.982L17.6217 18.6062H14.6519C14.2671 18.6062 13.9554 18.918 13.9554 19.3027C13.9554 19.6874 14.2671 19.9993 14.6519 19.9993H19.3035C19.6882 19.9993 20 19.6874 20 19.3027V14.6513C19.9999 14.2666 19.6881 13.9548 19.3034 13.9548Z"></path>
                        <path fill="currentColor"
                              d="M6.01739 12.997L1.39357 17.6212V14.6513C1.39357 14.2666 1.0818 13.9548 0.697029 13.9548C0.31226 13.9548 0.000488281 14.2666 0.000488281 14.6513V19.3029C0.000488281 19.6876 0.31226 19.9995 0.697029 19.9995H5.34843C5.73311 19.9995 6.04498 19.6876 6.04498 19.3029C6.04498 18.9182 5.7332 18.6064 5.34843 18.6064H2.37857L7.00249 13.982C7.27451 13.71 7.27451 13.2689 7.00239 12.9969C6.73056 12.725 6.28951 12.725 6.01739 12.997Z"></path>
                        <path fill="currentColor"
                              d="M19.3033 0H14.6517C14.2669 0 13.9552 0.311864 13.9552 0.696541C13.9552 1.08122 14.2669 1.39308 14.6517 1.39308H17.6217L13.1361 5.8789C12.8641 6.15092 12.8641 6.59197 13.1362 6.86399C13.2722 6.99996 13.4505 7.06794 13.6287 7.06794C13.8069 7.06794 13.9853 6.99986 14.1213 6.8639L18.6068 2.37808V5.34813C18.6068 5.73281 18.9186 6.04467 19.3034 6.04467C19.6882 6.04467 19.9999 5.73281 19.9999 5.34813V0.696541C19.9998 0.311772 19.688 0 19.3033 0Z"></path>
                    </svg>

                </div>
                {!instructionShow && (
                    <div style={{width: '1px', backgroundColor: '#ccc', alignSelf: 'stretch'}}></div>)}
                {!instructionShow && (<div className={'w-[26%] px-4 py-4'}>
                    <div className={'flex flex-row justify-between'}>
                        <div className={'flex flex-row gap-2'}>
                            <h5 className={'font-medium'}> Time Left :</h5>
                            {_examData?.start_time && _examData?.end_time ? (
                                <Timer startTime={_examData.start_time} endTime={_examData.end_time} onTimeEnd={handleAutoSubmit} />
                            ) : null}
                        </div>
                        {/* <h5 className={'font-medium'}> Time Left</h5>*/}
                    </div>
                </div>)}
            </header>

            {instructionShow ? (<div className={'flex flex-col justify-center gap-4'}>
                <TestInstruction/>
            </div>) : (<>
                <div className={'flex flex-row'}>
                    <div className="questionContainer w-[74%] px-8 py-4">
                        <div className="flex justify-between question-no-header py-2 px-8">
                            <div className={'flex flex-row gap-4 items-center'}>
                                <span
                                    className="text-black font-medium mr-0-50-l mr2">Question {currentQuestionIndex + 1}:</span>
                                <span
                                    className="mr2 flex items-center single-correct-text">{currentQuestion?.question.answer_type}</span>
                            </div>
                            <span className="flex items-center ml-auto-l pointer justify-end flex-grow-1">
                                    <span
                                        className="font-medium body-5-m body-7-d">Marks: {_examData?.per_question_marks}</span>
                                {/*<svg className="db w1-l h1-l w1-5 h1-5 flex" viewBox="0 0 18 16" width="20px" height="20px"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g fill="#333" fillRule="nonzero" opacity=".3">
                                    <g transform="translate(-1017 -132) translate(2 124) translate(1015 8)">
                                        <path
                                            d="M17.593 13.856L9.964.643C9.738.252 9.334.018 8.881.018c-.452 0-.857.234-1.083.625L.17 13.856c-.227.392-.227.86 0 1.25.226.392.63.626 1.082.626H16.51c.452 0 .857-.234 1.083-.625.226-.392.226-.86 0-1.25zm-.903.73c-.022.039-.076.104-.18.104H1.252c-.104 0-.158-.065-.18-.104-.022-.04-.052-.118 0-.209L8.701 1.164c.052-.09.135-.104.18-.104.045 0 .128.014.18.104l7.63 13.213c.052.091.022.17 0 .209z"></path>
                                        <path d="M8.36 4.756H9.402V10.313H8.36z"></path>
                                        <circle cx="8.881" cy="12.05" r="1"></circle>
                                    </g>
                                </g>
                            </svg>
                            <span className="very-lightest-gray ml-1 underline">Report</span>*/}
                        </span>
                        </div>
                        <div className={'question-container'}>
                            <h6 className={'font-semiBold'}>{currentQuestion?.question?.question}</h6>
                            {/*<h6 className={'font-semiBold'}>{currentQuestion.series}</h6>*/}
                            <form onSubmit={handleSubmit}>
                                {currentQuestion?.question?.options.map((option, idx) => (
                                    <label key={idx} className="option font-semiBold ">
                                        <input type="radio"
                                               name={`question_${currentQuestionIndex}`}
                                               value={option.id}
                                               checked={selectedOptions[currentQuestionIndex] === option.id}
                                               onChange={() => handleOptionChange(option.id, currentQuestionIndex)}
                                        /> {option.content}
                                    </label>))}
                            </form>
                        </div>
                    </div>

                    <div style={{width: '1px', backgroundColor: '#ccc', alignSelf: 'stretch'}}></div>

                    <div className="Profile-Container w-[26%]">
                        <div className={'px-4 py-4 test-profile flex flex-row items-center justify-between'}>
                            <h5 className={'font-bold'}>{_examData?.jobApplicationId}</h5>
                            <div
                                className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>

                        <div className={'px-4 py-6 flex flex-row flex-wrap gap-4 items-center justify-start'}>
                            <div className={'flex items-center flex-row gap-2'}>
                                <div className={'test-answered'}>{counts.answered}</div>
                                <span className={'text-xs font-semiBold'}>Answered</span>
                            </div>
                            <div className={'flex items-center flex-row gap-2'}>
                                <div className={'test-not-answered'}>{counts.notAnswered}</div>
                                <span className={'text-xs font-semiBold'}>Not Answered</span>
                            </div>
                            <div className={'flex items-center flex-row gap-2'}>
                                <div className={'not-visited'}>{counts.notVisited}</div>
                                <span className={'text-xs font-semiBold'}>Not Visited</span>
                            </div>
                            {/* <div className={'flex items-center flex-row gap-2'}>
                                    <div className={'test-review'}>{counts.markedForReview}</div>
                                    <span className={'text-xs font-semiBold'}>Marked for Review</span>
                                </div>
                                <div className={'flex items-center flex-row gap-2'}>
                                    <div className={'test-review'}>{counts.answeredAndMarkedForReview}</div>
                                    <span className={'text-xs font-semiBold'}>Answered & Marked for Review</span>
                                </div>*/}
                        </div>

                        <div className={'px-4 py-2 flex flex-row items-center'} style={{background: '#e6e6e6'}}>
                            <span className={'font-normal text-black'}>Section: &nbsp;</span>
                            <span
                                className={'font-semiBold text-black'}>General Intelligence and Reasoning</span>
                        </div>
                        <div className={'px-6 py-6 test-profile'} style={{height: 'calc(70vh - 60px)'}}>
                            <div className={'flex flex-row items-start flex-wrap gap-7'}>
                                {renderQuestionButtons()}
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmationDialog
                    open={isConfirmDialogOpen}
                    onClose={handleConfirmDialogClose}
                    title="Confirm ?"
                    message={`You have not answered the following questions: ${unansweredQuestions.join(', ')}. Are you sure you want to submit the test?`}
                />
                <ConfirmationDialog
                    open={isAutoSubmitDialogOpen}
                    onClose={() => setIsAutoSubmitDialogOpen(false)}
                    title="Test Submitted"
                    message="Time is up! Your test has been submitted automatically."
                />
            </>)}
            <footer
                className={`${instructionShow ? "instructionFooter" : "testFooter"} flex flex-row justify-between gap-4 shadow-8`}>
                {instructionShow ? <div className="buttons flex flex-row gap-4">
                    <button className="button-submitTest" aria-label="Submit Test"
                            onClick={() => handleContinue()}>Continue
                    </button>
                </div> : (<>
                    <div className="buttons flex flex-row  gap-4">
                        <button className="button-clear " aria-label="Clear Response"
                                onClick={clearResponse}>Clear
                            Response
                        </button>
                        {/* <button className="button-unmark" aria-label="Unmark" onClick={markForReview}>Mark for
                                Review
                            </button>*/}
                        <button className="button-saveNext" aria-label="Save & Next" onClick={saveAndNext}>Save
                            & Next
                        </button>
                    </div>
                    <div className="buttons flex flex-row gap-4">
                        <button className="button-submitTest" aria-label="Submit Test"
                                onClick={handleSubmitTestClick}>{isSubmitting ? 'Loading...' : 'Submit Test'}
                        </button>
                    </div>
                </>)}
            </footer>
        </div>}
    </FullScreen>);
}

/*Test.guestGuard = false
Test.middleware = 'guest'*/
Test.getLayout = (page: ReactNode) => <BlankLayoutWithoutFooter>{page}</BlankLayoutWithoutFooter>

Test.acl = {
    action: 'manage',
    subject: 'all'
}
export default Test;
