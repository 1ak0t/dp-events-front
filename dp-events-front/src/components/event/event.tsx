import React from "react";
import {EventStatuses, EventType} from "../../types/event.type";
import dayjs from "dayjs";
import classNames from "classnames";

type EventPropsType = {
    event: EventType;
}

function Event(props: EventPropsType): React.ReactElement {
    const {event} = props;
    const [isOpen, setIsOpen] = React.useState(false);

      return (
          <article className="event" onClick={() => setIsOpen(!isOpen)} key={event.id}>
              <div className={classNames(
                  'event__status',
                  {'event__status--attention': event.status === EventStatuses.Attention},
                  {'event__status--warning': event.status === EventStatuses.Warning},
                  {'event__status--critical': event.status === EventStatuses.Critical},
              )}></div>
              <div className="event__name">{event.name}</div>
              <div>{event.jobName}</div>
              <div className="event__dates">
                  <div>{dayjs(event.deadLine).format("DD.MM.YYYY")}</div>
                  <div className="event__to-deadline">(осталось {dayjs(event.deadLine).diff(dayjs(), 'days')} дней)</div>
              </div>
              <div className={classNames(
                  "event__description",
                  {"event__description--active": isOpen}
              )}>
                  <div className="event__discription-row"><span>Наименование работ</span><span>{event.name}</span></div>
                  <div className="event__discription-row"><span>Наименование события</span><span>{event.jobName}</span></div>
                  <div className="event__discription-row"><span>Срок достижения</span><span>{event.deadLine}</span></div>
                  <div className="event__discription-row"><span>Отчетная документация</span><span>{event.documents}</span></div>
                  <div className="event__discription-row"><span>Ответственный</span><span>{event.mainPerson.surname} {event.mainPerson.name}</span></div>
                  {/*<div className="event__discription-row">*/}
                  {/*    <span>Кто уведомлен</span>*/}
                  {/*    {event.readPerson !== undefined && event.readPerson !== null &&*/}
                  {/*        <span>{event.readPerson[0].name}</span>*/}
                  {/*    }*/}
                  {/*</div>*/}
              </div>
          </article>
      );
}

export default Event;