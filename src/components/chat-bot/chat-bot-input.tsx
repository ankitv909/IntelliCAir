import {useState} from 'react';
import Image from "next/image";
import {IToolCalls, IToolCallsArgs} from "@/interfaces/bot-response.interface";

interface ChatInputProps extends IToolCallsArgs {
    onChange: (e: string, tool: IToolCalls, isFileUpload?: boolean) => void,
    tool: IToolCalls,
    inputType: "fileInput" | "textInput" | "dateInput" | "link";
}

const ChatInput = ({onChange, inputHint, inputType, tool}: ChatInputProps) => {
    const [userInput, setUserInput] = useState('');

    const handleSendMessage = () => {
        if (userInput.trim() === '') return;
        onChange(userInput, tool);
        setUserInput('');
    };
    const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (<div className="flex items-center input-chat-box rounded-full shadow-lg">
            <input
                type={inputType === "textInput" ? "text" : inputType}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow border-none bg-transparent p-2 text-gray-700"
                placeholder={inputHint}
            />
           {/* <button
                className="flex items-center justify-center text-white  rounded-full mr-2"
            >
                <Image src={'/images/microphone.svg'} width={32} height={32} alt={'Logo'}/>
            </button>*/}
            <button
                onClick={handleSendMessage}
                className="flex items-center justify-center text-gray-700  rounded-full"
            >
                <Image src={'/images/send.svg'} width={32} height={32} alt={'Logo'}/>
            </button>
        </div>);
};

export default ChatInput;
