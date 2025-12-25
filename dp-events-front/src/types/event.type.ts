import {UserType} from "./initialState.type";

export enum EventStatuses {
    Planed = "Запланировано",
    Attention = "Требует внимания",
    Warning = "Важно",
    Critical = "Критический"
}

export type EventType = {
    id: string,
    jobName: string;
    name: string;
    deadLine: string;
    documents: string;
    mainPerson: UserType;
    readPerson?: UserType[];
    createPerson: UserType;
    status: EventStatuses | null;
    completedTime?: string;
    completedComment?: string;
    completedFile?: string;
    completedPerson?: UserType;
}

export type EventsType = EventType[];

export type CreateEventType = {
    jobName: string;
    name: string;
    deadLine: string;
    documents: string;
    mainPerson: string;
    createPerson: string;
    readPerson: null;
    status: EventStatuses;
    completedComment?: string;
    completedFile?: string;
}

export type SuccessWarningEventType = {
    userId: string,
    eventId: string,
}