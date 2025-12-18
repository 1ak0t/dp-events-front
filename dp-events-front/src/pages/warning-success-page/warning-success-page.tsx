import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getEvents} from "../../store/data-process/selectors";
import {successWarningAction} from "../../store/api-actions";
import {getUser} from "../../store/user-process/selectors";

function WarningSuccessPage() {
    const {eventId} = useParams();
    const events = useAppSelector(getEvents);
    console.log(events)
    const user = useAppSelector(getUser);
    const currentEvent = events.find((event) => event.id === eventId);
    console.log(currentEvent);
    const dispatch = useAppDispatch();

    const successWarningButtonClickHandler = () => {
        if (eventId !== undefined) {
            dispatch(successWarningAction({userId: user.id, eventId: eventId}));
        }
    }

    return (
        <>
            {/*{currentEvent && eventId && <>*/}
            {/*    <h1>{currentEvent.name} - {currentEvent.jobName}</h1>*/}
            {/*    {currentEvent !== null && currentEvent.readPerson !== undefined && !(currentEvent.readPerson?.filter(person => person.id === user.id).length > 0) &&*/}
            {/*        <button onClick={() => successWarningButtonClickHandler()}>Уведомлен</button>*/}
            {/*    }*/}

            {/*</>*/}
            {/*}*/}
            <button onClick={() => successWarningButtonClickHandler()}>Уведомлен</button>
        </>
    );
}

export default WarningSuccessPage