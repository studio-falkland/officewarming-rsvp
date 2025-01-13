export interface RSVPProps {
    response: Response | false;
}

export interface Response {
    name: string;
    persons?: number;
    email?: string;
    update?: boolean;
}