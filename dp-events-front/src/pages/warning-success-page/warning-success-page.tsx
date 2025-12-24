import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getEvents} from "../../store/data-process/selectors";
import {successWarningAction} from "../../store/api-actions";
import {getUser} from "../../store/user-process/selectors";
import {Helmet} from "react-helmet-async";
import {AppRoutes} from "../../constants";
import React from "react";
import BottomMenu from "../../components/bottom-menu/bottom-menu";
import {redirectToRoute} from "../../store/actions";
import classNames from "classnames";
import {EventStatuses} from "../../types/event.type";
import dayjs from "dayjs";

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
            dispatch(redirectToRoute(AppRoutes.Root))
        }
    }

    return (
        <div className="events-main-page">
            <Helmet>
                <title>Сотрудники</title>
            </Helmet>
            <header className="events-main-page__header">
                <Link to={AppRoutes.Root}><img src='../../imgs/dp-logo.svg' width={75}/></Link>
                <div className="events-main-page__title">Ключевые события "Деталь&nbsp;Проект"</div>
            </header>
            {currentEvent && eventId && <>
                <article className="event" key={currentEvent.id}>
                    <div className={classNames(
                        'event__status',
                        {'event__status--attention': currentEvent.status === EventStatuses.Attention},
                        {'event__status--warning': currentEvent.status === EventStatuses.Warning},
                        {'event__status--critical': currentEvent.status === EventStatuses.Critical},
                    )}></div>
                    <div className="event__name">{currentEvent.name}</div>
                    <div>{currentEvent.jobName}</div>
                    <div className="event__dates">
                        <div>{dayjs(currentEvent.deadLine).format("DD.MM.YYYY")}</div>
                        <div className="event__to-deadline">(осталось {dayjs(currentEvent.deadLine).diff(dayjs(), 'days')} дней)</div>
                    </div>
                    <div className="event__description event__description--active">
                        <div className="event__discription-row"><span>Наименование работ</span><span>{currentEvent.name}</span></div>
                        <div className="event__discription-row"><span>Наименование события</span><span>{currentEvent.jobName}</span></div>
                        <div className="event__discription-row"><span>Срок достижения</span><span>{currentEvent.deadLine}</span></div>
                        <div className="event__discription-row"><span>Отчетная документация</span><span>{currentEvent.documents}</span></div>
                        <div className="event__discription-row"><span>Ответственный</span><span>{currentEvent.mainPerson.surname} {currentEvent.mainPerson.name}</span></div>
                        {/*<div className="event__discription-row">*/}
                        {/*    <span>Кто уведомлен</span>*/}
                        {/*    {event.readPerson !== undefined && event.readPerson !== null &&*/}
                        {/*        <span>{event.readPerson[0].name}</span>*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>
                </article>
                {currentEvent !== null && currentEvent.readPerson !== undefined && !(currentEvent.readPerson?.filter(person => person.id === user.id).length > 0) &&
                    <button onClick={() => successWarningButtonClickHandler()}>Уведомлен</button>
                }
            </>
            }
            <BottomMenu />
        </div>
    );
}

export default WarningSuccessPage