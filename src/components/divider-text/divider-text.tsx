const DividerWithText = ({text}: { text: string }) => {
    return (
        <div className="flex items-center w-4/5 mt-10">
            <div className="flex-grow h-px divider-color"></div>
            <span className="mx-4 divider-text-color text-sm">{text}</span>
            <div className="flex-grow h-px divider-color"></div>
        </div>
    );
};

export default DividerWithText;
