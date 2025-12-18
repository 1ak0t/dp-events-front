import {Helmet} from "react-helmet-async";
import React from "react";
import BottomMenu from "../../components/bottom-menu/bottom-menu";
import {getEvents, getUsers} from "../../store/data-process/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getUser} from "../../store/user-process/selectors";
import Event from "../../components/event/event";

function EventsMainPage () {
    const user = useAppSelector(getUser);
    const users = useAppSelector(getUsers);
    const events = useAppSelector(getEvents);
    const dispatch = useAppDispatch();



    return (
        <div className="events-main-page">
            <Helmet>
                <title>Ключевые события "Деталь Проект"</title>
            </Helmet>
            <header className="events-main-page__header">
                <img src='../../imgs/dp-logo.svg' width={75}/>
                <div className="events-main-page__title">Ключевые события "Деталь&nbsp;Проект"</div>
            </header>
            <section className="events-main-page__events">
                {events.map(event => (
                    <Event event={event} />
                ))}
            </section>
            <BottomMenu />
        </div>
    );
}

export default EventsMainPage;