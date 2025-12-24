import BottomMenu from "../../components/bottom-menu/bottom-menu";
import {Helmet} from "react-helmet-async";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getUsers} from "../../store/data-process/selectors";
import UserRow from "../../components/user-row/user-row";
import {AppRoutes, UserRoles} from "../../constants";
import {CreateUserDataType, UpdateUserDataType} from "../../types/user-data.type";
import {createUserAction, updateUserAction} from "../../store/api-actions";
import {MdClose} from "react-icons/md";
import {Link} from "react-router-dom";

function EmployeesPage() {
    const users = useAppSelector(getUsers);
    const [isAddUser, setIsAddUser] = useState(false);
    const [userSurname, setUserSurname] = useState<string>(``);
    const [userName, setUserName] = useState<string>(``);
    const [userMiddleName, setUserMiddleName] = useState<string>(``);
    const [userJobTitle, setUserJobTitle] = useState<string>(``);
    const [userRole, setUserRole] = useState<string>(UserRoles.Users);
    const [userPassword, setUserPassword] = useState<string>(``);
    const [userEmail, setUserEmail] = useState<string>(``);
    const [isError, setIsError] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onSurnameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserSurname(e.target.value);
    }

    const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const onMiddleNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMiddleName(e.target.value);
    }

    const onJobTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserJobTitle(e.target.value);
    }

    const onPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value);
    }
    const onEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value);
    }

    const onSaveButtonClickHandler = () => {
        const newUserData: CreateUserDataType = {
            surname: '',
            name: '',
            middleName: '',
            email: '',
            jobTitle: '',
            role: [],
            password: ''
        }
        newUserData.surname = userSurname;
        newUserData.name = userName;
        newUserData.middleName = userMiddleName;
        newUserData.jobTitle = userJobTitle;
        newUserData.email = userEmail;
        newUserData.password = userPassword;

        if (userRole){
            const roles: UserRoles[] = [];
            switch (userRole) {
                case UserRoles.Users:
                    roles.push(UserRoles.Users);
                    break;
                case UserRoles.Admins:
                    roles.push(UserRoles.Admins);
                    break;
                case UserRoles.Secretaries:
                    roles.push(UserRoles.Secretaries);
                    break;
                default:
                    roles.push(UserRoles.Users);
            }
            newUserData.role = roles;
        }
        if (
            userName !== "" &&
            userMiddleName !== "" &&
            userJobTitle !== "" &&
            userSurname !== "" &&
            userEmail !== "" &&
            userRole.length > 0 &&
            userPassword !== ""
        ) {
            dispatch(createUserAction(newUserData));
            setIsAddUser(false);
        } else {
            setIsError(true);
        }
    }

    return (
        <div className="employees-page">
            <Helmet>
                <title>Сотрудники</title>
            </Helmet>
            <header className="events-main-page__header">
                <Link to={AppRoutes.Root}><img src='../../imgs/dp-logo.svg' width={75}/></Link>
                <div className="events-main-page__title">Ключевые события "Деталь&nbsp;Проект"</div>
            </header>
            <button className="employees-page__button" onClick={() => setIsAddUser(!isAddUser)}>Добавить пользователя</button>
            {users.map((user) => (
                <UserRow user={user} key={user.id} />
            ))}
            <BottomMenu />
            {isAddUser && (
                <div className="employees-page__add-user-block">
                    <span className="employees-page__close-button" onClick={() => setIsAddUser(!isAddUser)}><MdClose/></span>
                    <label htmlFor="name">Фамилия</label>
                    <input type="text" name="name" onChange={onSurnameChangeHandler}/>
                    <label htmlFor="surname">Имя</label>
                    <input type="text" name="surname" onChange={onNameChangeHandler}/>
                    <label htmlFor="middle-name">Отчество</label>
                    <input type="text" name="middle-name" onChange={onMiddleNameChangeHandler}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={onEmailChangeHandler}/>
                    <label htmlFor="job-title">Должность</label>
                    <input type="text" name="job-title" onChange={onJobTitleChangeHandler}/>
                    <label htmlFor="role">Роль</label>
                    <select value={userRole} name="role" onChange={(e) => setUserRole(e.target.value)}>
                        <option value={UserRoles.Admins}>{UserRoles.Admins}</option>
                        <option value={UserRoles.Secretaries}>{UserRoles.Secretaries}</option>
                        <option value={UserRoles.Users}>{UserRoles.Users}</option>
                    </select>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" name="password" onChange={onPasswordChangeHandler}/>
                    {isError && (<h3>Не все поля заполнены</h3>)}
                    <button onClick={() => onSaveButtonClickHandler()}>Отправить</button>
                </div>
            )}
        </div>
    );
}

export default EmployeesPage;