import React, {useState} from "react";
import {AppRoutes, UserRoles} from "../../constants";
import {CreateEventType, EventStatuses} from "../../types/event.type";
import {createNewEventAction} from "../../store/api-actions";
import {useAppDispatch, useAppSelector} from "../../hooks";
import BottomMenu from "../../components/bottom-menu/bottom-menu";
import {Helmet} from "react-helmet-async";
import {redirectToRoute} from "../../store/actions";
import {getUser} from "../../store/user-process/selectors";
import {getUsers} from "../../store/data-process/selectors";
import dayjs from "dayjs";

function CreateEventPage() {
    const user = useAppSelector(getUser);
    const users = useAppSelector(getUsers);
    const [eventName, setEventName] = useState<string>(``);
    const [eventJobName, setEventJobName] = useState<string>(``);
    const [eventDeadLine, setEventDeadLine] = useState<string>(``);
    const [eventDocuments, setEventDocuments] = useState<string>(``);
    const [eventMainPerson, setEventMainPerson] = useState<string>(UserRoles.Users);
    const [isError, setIsError] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onEventNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value);
    }

    const onEventJobNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventJobName(e.target.value);
    }

    const onEventDeadLineChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventDeadLine(e.target.value);
    }

    const onEventDocumentsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventDocuments(e.target.value);
    }

    const onSaveButtonClickHandler = () => {
        const newMainPerson = users.find(el => el.surname === eventMainPerson);
        const newEventData: CreateEventType = {
            name: '',
            jobName: '',
            deadLine: '',
            documents: '',
            mainPerson:newMainPerson !== undefined ? newMainPerson.id : user.id,
            createPerson: user.id,
            readPerson: null,
            status: EventStatuses.Planed
        }

        newEventData.name = eventName;
        newEventData.jobName = eventJobName;
        newEventData.deadLine = eventDeadLine;
        newEventData.documents = eventDocuments;
        newEventData.mainPerson = newMainPerson !== undefined ? newMainPerson.id : user.id;
        const dayLost = dayjs(eventDeadLine).diff(dayjs(), 'days');
        if (dayLost <= 45 && dayLost > 30) {
            newEventData.status = EventStatuses.Attention;
        }
        if (dayLost <= 30 && dayLost > 15) {
            newEventData.status = EventStatuses.Warning;
        }
        if (dayLost <= 15) {
            newEventData.status = EventStatuses.Critical;
        }

        if (
            eventName !== "" &&
            eventJobName !== "" &&
            eventDeadLine !== "" &&
            eventDocuments !== "" &&
            eventMainPerson !== ""
        ) {
            dispatch(createNewEventAction(newEventData));
            dispatch(redirectToRoute(AppRoutes.Root));
            // setIsAddUser(false);
        } else {
            setIsError(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>Создать новое ключевое событие</title>
            </Helmet>
            <h1 className="status-page__title">Создать новое ключевое событие</h1>
            <div>
                <label htmlFor="">Наименование работ</label>
                <input type="text" onChange={onEventNameChangeHandler}/>
                <label htmlFor="">Наименование события</label>
                <input type="text" onChange={onEventJobNameChangeHandler}/>
                <label htmlFor="">Срок достижения</label>
                <input type="date" onChange={onEventDeadLineChangeHandler}/>
                <label htmlFor="">Отчетная документация</label>
                <input type="text" onChange={onEventDocumentsChangeHandler}/>
                <select value={''} onChange={(e) => setEventMainPerson(e.target.value)}>
                    {users.map(el => (<option value={el.surname}>{el.surname} {el.name}</option>))}
                </select>
                {isError && (<h3>Не все поля заполнены</h3>)}
                <button onClick={() => onSaveButtonClickHandler()}>Отправить</button>
            </div>

            <BottomMenu />
        </>
    );
}


export default CreateEventPage;