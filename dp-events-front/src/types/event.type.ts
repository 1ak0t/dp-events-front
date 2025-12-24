import {UserType} from "./initialState.type";

export enum EventStatuses {
    Planed = "Запланировано (> 45 к.д.)",
    Attention = "Требует внимания (< 45 к.д.)",
    Warning = "Важно (< 30 к.д.)",
    Critical = "Критический (< 15 к.д.)"
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