export interface IJob {
    "id": string;
    "title": string | null,
    "description": string | null,
    "location": string | null,
    "salaryRange": string | null,
    "jobType": null,
    "status": string;
    "userId": string;
    "createdAt": string;
    "updatedAt": string;
}
export interface IConversation {
    "id": string;
    "userId": string;
    "subjectId": string;
    "subjectType": string;
    "createdAt": string;
    "updatedAt": string;
}
export interface IMessages {
    content: string;
    role: "BOT" | "USER"
}
export interface IToolCalls {
    "agent": string;
    "toolCallId": string;
    "toolToBeCalled": string;
    "toolCallArgs": string;
}
export interface IToolCallsArgs {
    "inputType":"textInput" | "fileInput" | "dateInput" | "link",
    "inputHint":string
}

export interface IBotResponse {
    "job": IJob | null
    "conversation": IConversation | null,
    "messages": IMessages[] | [],
    "toolCalls": IToolCalls[] | []
}
