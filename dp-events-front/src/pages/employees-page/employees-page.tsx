import BottomMenu from "../../components/bottom-menu/bottom-menu";
import {Helmet} from "react-helmet-async";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getUsers} from "../../store/data-process/selectors";
import UserRow from "../../components/user-row/user-row";
import {UserRoles} from "../../constants";
import {CreateUserDataType, UpdateUserDataType} from "../../types/user-data.type";
import {createUserAction, updateUserAction} from "../../store/api-actions";

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
            <h1 className="employees-page__title">Сотрудники</h1>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Должность</th>
                    <th>Почта</th>
                    <th>Роль</th>
                </tr>
                {users.map((user) => (
                    <UserRow user={user} key={user.id} />
                ))}
                </tbody>
            </table>
            <button onClick={() => setIsAddUser(!isAddUser)}>+ Добавить пользователя</button>
            <BottomMenu />
            {isAddUser && (
                <div>
                    <label htmlFor="">Фамилия</label>
                    <input type="text" onChange={onSurnameChangeHandler}/>
                    <label htmlFor="">Имя</label>
                    <input type="text" onChange={onNameChangeHandler}/>
                    <label htmlFor="">Отчество</label>
                    <input type="text" onChange={onMiddleNameChangeHandler}/>
                    <label htmlFor="">Email</label>
                    <input type="email" onChange={onEmailChangeHandler}/>
                    <label htmlFor="">Должность</label>
                    <input type="text" onChange={onJobTitleChangeHandler}/>
                    <label htmlFor="">Роль</label>
                    <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <option value={UserRoles.Admins}>{UserRoles.Admins}</option>
                        <option value={UserRoles.Secretaries}>{UserRoles.Secretaries}</option>
                        <option value={UserRoles.Users}>{UserRoles.Users}</option>
                    </select>
                    <label htmlFor="">Пароль</label>
                    <input type="password" onChange={onPasswordChangeHandler}/>
                    {isError && (<h3>Не все поля заполнены</h3>)}
                    <button onClick={() => onSaveButtonClickHandler()}>Отправить</button>
                </div>
            )}
        </div>
    );
}

export default EmployeesPage;