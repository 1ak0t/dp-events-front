import {Helmet} from "react-helmet-async";
import React, {useState} from "react";
import BottomMenu from "../../components/bottom-menu/bottom-menu";
import {getEvents, getUsers} from "../../store/data-process/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getUser} from "../../store/user-process/selectors";
import Event from "../../components/event/event";
import dayjs from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale';
import {UserRoles} from "../../constants";
import {EventStatuses} from "../../types/event.type";

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
    months: [
        "Январь", "Ферваль", "Март", "Апрель", "Май", "Июнь", "Июль",
        "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ]
})

function EventsMainPage () {
    const user = useAppSelector(getUser);
    const users = useAppSelector(getUsers);
    const events = useAppSelector(getEvents);
    const dispatch = useAppDispatch();
    const [monthFilter, setMonthFilter] = useState<string>("Все месяцы");
    const [statusFilter, setStatusFilter] = useState<string>("Все статусы");

    let monthsYearsArray: string[] = [];
    let monthsYearsByOptionsArray: string[] = [];
    let statusesArray: EventStatuses[] = [];
    let statusesForOptionArray: EventStatuses[] = [];

    const filteredEventsByDate = [...events].sort((a,b) => {
        if (dayjs(a.deadLine).diff(dayjs()) > dayjs(b.deadLine).diff(dayjs())) {
            return 1;
        }
        if (dayjs(a.deadLine).diff(dayjs()) < dayjs(b.deadLine).diff(dayjs())) {
            return -1;
        }

        return 0;
    });

    const filteredEventsByMonthAndStatuses = filteredEventsByDate.filter((event) => {
        if (monthFilter !== "Все месяцы" || statusFilter !== "Все статусы") {
            if (monthFilter !== "Все месяцы" || statusFilter === "Все статусы") {
                return dayjs(event.deadLine).format("MMMM YYYY") === monthFilter;
            }
            if (monthFilter === "Все месяцы" || statusFilter !== "Все статусы") {
                return event.status === statusFilter;
            }
            if (monthFilter !== "Все месяцы" && statusFilter !== "Все статусы") {
                return (dayjs(event.deadLine).format("MMMM YYYY") === monthFilter) && (event.status === statusFilter);
            }
        }
        else {
            return true;
        }
    });

    const getMonthsYearsArray = filteredEventsByMonthAndStatuses.map(event => {
       const monthYear = dayjs(event.deadLine).format("MMMM YYYY");
       monthsYearsArray.push(monthYear);
    });

    const getMonthsYearsForOptionsArray = filteredEventsByDate.map(event => {
        const monthYear = dayjs(event.deadLine).format("MMMM YYYY");
        monthsYearsByOptionsArray.push(monthYear);
    });

    const getStatusesArray = filteredEventsByMonthAndStatuses.map(event => {
        const status = event.status;

        if (status !== null) {
            statusesArray.push(status);
        }
    });

    const getStatusesForOptionArray = filteredEventsByDate.map(event => {
        const status = event.status;

        if (status !== null) {
            statusesArray.push(status);
        }
    });

    monthsYearsArray = monthsYearsArray.filter((item, index) => (monthsYearsArray.indexOf(item) === index));
    monthsYearsByOptionsArray = monthsYearsByOptionsArray.filter((item, index) => (monthsYearsByOptionsArray.indexOf(item) === index));
    statusesArray = statusesArray.filter((item, index) => (statusesArray.indexOf(item) === index));
    statusesForOptionArray = statusesForOptionArray.filter((item, index) => (statusesForOptionArray.indexOf(item) === index));

    return (
        <div className="events-main-page">
            <Helmet>
                <title>Ключевые события "Деталь Проект"</title>
            </Helmet>
            <header className="events-main-page__header">
                <img src='../../imgs/dp-logo.svg' width={75}/>
                <div className="events-main-page__title">Ключевые события "Деталь&nbsp;Проект"</div>
            </header>
            <select value={monthFilter} name="months" onChange={(e) => setMonthFilter(e.target.value)}>
                <option value="Все месяцы">Все месяцы ({filteredEventsByMonthAndStatuses.length})</option>
                {monthsYearsByOptionsArray.map((item) => (<option value={item}>{item} ({[...events].filter(event => dayjs(event.deadLine).format("MMMM YYYY") === item).length})</option>))}
            </select>
            <select value={statusFilter} name="statuses" onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="Все статусы">Все статусы ({filteredEventsByMonthAndStatuses.length})</option>
                {statusesArray.map((item) => (<option value={item}>{item} ({filteredEventsByDate.filter(event => event.status === item).length})</option>))}
            </select>
            <section className="events-main-page__events">
                {monthsYearsArray.map(monthYear => {
                    const currentMonthYearEvents = filteredEventsByMonthAndStatuses.filter(event => dayjs(event.deadLine).format("MMMM YYYY") === monthYear);
                    return (<>
                        <h3 className="events-main-page__months">{monthYear}</h3>
                        {currentMonthYearEvents.map(event => <Event event={event} key={event.id}/>)}
                    </>);
                })}
            </section>
            <BottomMenu />
        </div>
    );
}

export default EventsMainPage;