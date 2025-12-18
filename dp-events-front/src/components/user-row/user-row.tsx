import {UserType} from "../../types/initialState.type";
import React, {useState} from "react";
import {useAppDispatch} from "../../hooks";
import {UserRoles} from "../../constants";
import {deleteUserAction, updateUserAction} from "../../store/api-actions";
import {UpdateUserDataType} from "../../types/user-data.type";

type UserRowPropsType = {
    user: UserType;
}

function UserRow(props: UserRowPropsType) {
    const {user} = props;
    const [isChanging, setIsChanging] = useState(false);
    const dispatch = useAppDispatch();
    const [userSurname, setUserSurname] = useState<string>(`${user.surname}`);
    const [userName, setUserName] = useState<string>(`${user.name}`);
    const [userMiddleName, setUserMiddleName] = useState<string>(`${user.middleName}`);
    const [userJobTitle, setUserJobTitle] = useState<string>(`${user.jobTitle}`);
    const [userRole, setUserRole] = useState<string>(user.role[0]);

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

    const onSaveButtonClickHandler = () => {
        const newUserData: UpdateUserDataType = {id: user.id, data: {...user}}
        if (userSurname !== user.surname){
            newUserData.data.surname = userSurname;
        }
        if (userName !== user.name){
            newUserData.data.name = userName;
        }
        if (userMiddleName !== user.middleName){
            newUserData.data.middleName = userMiddleName;
        }
        if (userJobTitle !== user.jobTitle){
            newUserData.data.jobTitle = userJobTitle;
        }
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
            }
            newUserData.data.role = roles;
        }
        dispatch(updateUserAction({id: newUserData.id, data: newUserData.data}));
        setIsChanging(!isChanging);
    }

    return (
        <>
            {isChanging ? (
                <tr>
                    <>
                        <button onClick={() => setIsChanging(!isChanging)}>Отменить</button>
                        <button onClick={() => onSaveButtonClickHandler()}>Сохранить</button>
                    </>
                    <td><input type="text" value={userSurname} onChange={onSurnameChangeHandler} placeholder={userSurname} /></td>
                    <td><input type="text" value={userName} onChange={onNameChangeHandler} placeholder={userName}></input></td>
                    <td><input type="text" value={userMiddleName} onChange={onMiddleNameChangeHandler} placeholder={userMiddleName}></input></td>
                    <td><input type="text" value={userJobTitle} onChange={onJobTitleChangeHandler} placeholder={userJobTitle}></input></td>
                    <td>{user.email}</td>
                    <td><select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <option value={UserRoles.Admins}>{UserRoles.Admins}</option>
                        <option value={UserRoles.Secretaries}>{UserRoles.Secretaries}</option>
                        <option value={UserRoles.Users}>{UserRoles.Users}</option>
                    </select></td>
                </tr>
            ) : (
                <tr>
                    <button onClick={() => setIsChanging(!isChanging)}>Редактировать</button>
                    <td>{user.surname}</td>
                    <td>{user.name}</td>
                    <td>{user.middleName}</td>
                    <td>{user.jobTitle}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <button onClick={() => dispatch(deleteUserAction(user.id))}>Удалить</button>
                </tr>
            )}
        </>
    );
}

export default UserRow;