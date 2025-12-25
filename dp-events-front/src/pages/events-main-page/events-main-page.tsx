import {Helmet} from "react-helmet-async";
import React, {useState} from "react";
import BottomMenu from "../../components/bottom-menu/bottom-menu";
import {getEvents, getUsers} from "../../store/data-process/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getUser} from "../../store/user-process/selectors";
import Event from "../../components/event/event";
import dayjs from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale';
import {EventStatuses} from "../../types/event.type";
import Select, {MultiValue} from "react-select";
import {MdFilterAlt} from "react-icons/md";

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
    const [monthFilter, setMonthFilter] = useState<MultiValue<{
        value: string;
        label: string;
    }>>([]);
    const [statusFilter, setStatusFilter] = useState<MultiValue<{
        value: string;
        label: string;
    }>>([]);
    const [isMonthHidden, setIsMonthHidden] = useState<boolean>(true);
    const [isFilter, setIsFilter] = useState<boolean>(false);

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
        if (monthFilter.length > 0 || statusFilter.length > 0) {
            if (monthFilter.length > 0 || statusFilter.length === 0) {
                return monthFilter.some(month => month.value === dayjs(event.deadLine).format("MMMM YYYY"));
            }
            if (monthFilter.length === 0 || statusFilter.length > 0) {
                return statusFilter.some(status => status.value === event.status);
            }
            if (monthFilter.length > 0 && statusFilter.length > 0) {
                return monthFilter.some(month => month.value === dayjs(event.deadLine).format("MMMM YYYY")) && (statusFilter.some(status => status.value === event.status));
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
            statusesForOptionArray.push(status);
        }
    });

    monthsYearsArray = monthsYearsArray.filter((item, index) => (monthsYearsArray.indexOf(item) === index));
    monthsYearsByOptionsArray = monthsYearsByOptionsArray.filter((item, index) => (monthsYearsByOptionsArray.indexOf(item) === index));
    statusesArray = statusesArray.filter((item, index) => (statusesArray.indexOf(item) === index));
    statusesForOptionArray = statusesForOptionArray.filter((item, index) => (statusesForOptionArray.indexOf(item) === index));
    const selectMonthsOptions: {value: string, label: string}[] = [];
    monthsYearsByOptionsArray.forEach(month => {selectMonthsOptions.push({value: month, label: `${month} (${[...events].filter(event => dayjs(event.deadLine).format("MMMM YYYY") === month).length})`});});
    const selectStatusOptions: {value: string, label: string}[] = [];
    statusesForOptionArray.forEach(status => {selectStatusOptions.push({value: status, label: `${status} (${filteredEventsByDate.filter(event => event.status === status).length})`});});

    return (
        <div className="events-main-page">
            <Helmet>
                <title>Ключевые события "Деталь Проект"</title>
            </Helmet>
            <header className="events-main-page__header">
                <img src='../../imgs/dp-logo.svg' width={75}/>
                <div className="events-main-page__title">Ключевые события "Деталь&nbsp;Проект"</div>
            </header>
            <button className="events-main-page__filter" onClick={() => setIsFilter(!isFilter)}>
                <MdFilterAlt />
                <span>{isFilter ? "Закрыть" : "Открыть"} фильтр</span>
            </button>
            {isFilter &&
                <>
                    <Select
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        options={selectMonthsOptions}
                        isMulti={true}
                        onChange={(event) => {setMonthFilter(event)}}
                        value={monthFilter}
                        placeholder={"Выбирите месяц..."}
                        isDisabled={statusFilter.length > 0}
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                width: "100%",
                                marginBottom: "15px"
                            })
                        }}
                    />
                    <Select
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        isMulti={true}
                        options={selectStatusOptions}
                        onChange={(event) => {setStatusFilter(event)}}
                        value={statusFilter}
                        placeholder={"Выбирите статус..."}
                        isDisabled={monthFilter.length > 0}
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                width: "100%",
                                marginBottom: "15px"
                            })
                        }}
                    />
                </>
            }
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