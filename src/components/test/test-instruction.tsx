"use client"
import React from 'react';


const TestInstruction = () => {

    return (
        <div className="testInstruction">
            <div className={'flex flex-col justify-center gap-4'}>
                <span className={'text-black font-bold'}>Please read the following instructions carefully</span>
                <span className={'text-black font-bold underline'}>General Instructions:</span>

                <ul className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400">
                    <li className={'text-black font-medium text-sm'}>The clock has been set at the server and the
                        countdown timer at the top right corner of your screen will display the time remaining for you
                        to complete the exam. When the clock runs out the exam ends by default - you are not required to
                        end or submit your exam.
                    </li>
                    <li className={'text-black font-medium text-sm pb-4'}>
                        The question palette at the right of screen shows one of the following statuses of each of the
                        questions numbered:
                        <ul className="ps-5 mt-2 space-y-1 list-none list-inside">
                            <li className={'text-black font-medium flex flex-row gap-4 part-1 items-center'}>You have
                                not visited the question yet.
                            </li>
                            <li className={'text-black font-medium flex flex-row gap-4 part-2 items-center'}>You have
                                not answered the question.
                            </li>
                            <li className={'text-black font-medium flex flex-row gap-4 part-3 items-center'}>You have
                                answered the question.
                            </li>
                            {/* <li className={'text-black font-medium flex flex-row gap-4 part-4 items-center'}>You have NOT answered the question but have marked the question for review.</li>
                            <li className={'text-black font-medium flex flex-row gap-4 part-4 items-center'}>You have answered the question but marked it for review.</li>*/}
                            <li className={'text-black font-medium '}>The Marked for Review status simply acts as a
                                reminder that you have set to look at the question again.
                                <span className={'font-bold text-red-500'}>If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.</span>
                            </li>
                        </ul>
                    </li>
                    <span className={'text-black font-bold underline '}>Navigating to a question:</span>
                    <li className={'text-black font-medium text-sm'}>
                        To select a question to answer, you can do one of the following:
                        <ul className="ps-5 mt-2 space-y-1 list-none list-inside">
                            <li className={'text-black font-medium text-sm'}>
                                Click on the question number on the question palette at the right of your screen to go
                                to that numbered question directly. Note that using this option does NOT save your
                                answer to the current question.
                            </li>
                            <li className={'text-black font-medium text-sm'}>
                                Click on Save and Next to save answer to current question and to go to the next question
                                in sequence.
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>

    );
}


export default TestInstruction;
