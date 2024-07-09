export type Participant = {
    id: number;
    name: string;
    organization: string;
    phone: string;
    photo?: any;
    position: string;
    registered: boolean;
    secondName: string;
    table: string;
    thirdName: string;
};

export type ParticipantResponse = {
    letters: string[];
    participant: Participant[];
    participantCount: {
        all: number;
        arrived: number;
        nonArrived: number;
    };
    table: string[];
};

export type updateResponse = {
    "IS_ATTENDED": boolean,
    "ELEMENT_ID": number,
    "STATUS": "success" | "error",
    "MESSAGE": string

}