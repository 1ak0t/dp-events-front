import {Link} from "react-router-dom";
import {AppRoutes, UserRoles} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getUser} from "../../store/user-process/selectors";
import {getBreaks} from "../../store/data-process/selectors";
import {
    logoutAction,
} from "../../store/api-actions";
import {useState} from "react";
import classNames from "classnames";
import {
    MdOutlineDescription,
    MdOutlineDifference,
    MdOutlineLogout, MdOutlinePeople, MdOutlinePeopleAlt,
    MdOutlinePermIdentity,
    MdOutlinePersonAddAlt
} from "react-icons/md";

function BottomMenu () {
    const user = useAppSelector(getUser);
    const breaks = useAppSelector(getBreaks);
    const currentBreaks = breaks.filter(el => !el.status);
    const dispatch = useAppDispatch();

    const [isProfileSubmenu, setIsProfileSubmenu] = useState(false);

    return(
        <>
            <div className="bottom-menu">
                <Link to={AppRoutes.Root} className="bottom-menu__button">
                    <MdOutlineDescription className="bottom-menu__button--profile" />
                    Ключевые<br></br>события
                </Link>
                {user.role.find(role => role === UserRoles.Admins) &&
                    <Link to={AppRoutes.EmployeesPage} className="bottom-menu__button">
                    <MdOutlinePeopleAlt className="bottom-menu__button--profile" />
                    Сотрудники
                    </Link>
                }
                {(user.role.find(role => role === UserRoles.Secretaries) || user.role.find(role => role === UserRoles.Admins)) &&
                    <Link to={AppRoutes.AddEvent} className="bottom-menu__button">
                    <MdOutlineDifference className="bottom-menu__button--profile" />
                    Добавить<br></br>событие
                    </Link>
                }
                <button className="bottom-menu__button" onClick={() => setIsProfileSubmenu(!isProfileSubmenu)}>
                    {user.notificationsCount > 0 && <span className="bottom-menu__breaks-counter">{user.notificationsCount}</span>}
                    <MdOutlinePermIdentity className="bottom-menu__button--profile"/>
                    Профиль
                </button>
                <div className={classNames(
                    "bottom-menu__submenu",
                    {"bottom-menu__submenu--inactive": !isProfileSubmenu}
                )}>
                    {/*<Link to={AppRoutes.Notifications} className="bottom-menu__button" onClick={() => dispatch(fetchNotifications())}>*/}
                    {/*    {user.notificationsCount > 0 && <span className="bottom-menu__breaks-counter">{user.notificationsCount}</span>}*/}
                    {/*    <img src="/icons/menu-icon/menu-notification-icon.svg" alt=""/>*/}
                    {/*    <br></br>Уведомления*/}
                    {/*</Link>*/}
                    <button className="bottom-menu__button" onClick={() => dispatch(logoutAction())}>
                        <MdOutlineLogout className="bottom-menu__button--profile"/>
                        Выйти
                    </button>
                </div>
            </div>
        </>
    );
}

export default BottomMenu;