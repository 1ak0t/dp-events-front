import {AppRoutes, AuthorizationStatus, UserRoles} from "../../constants";
import {JSX} from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {getUser} from "../../store/user-process/selectors";

type PrivateRouteProps = {
    authorizationStatus: AuthorizationStatus;
    children: JSX.Element;
    roleAccess?: UserRoles[]
}

function PrivateRoute({authorizationStatus, children, roleAccess}: PrivateRouteProps) {
    const user = useAppSelector(getUser);
    if (authorizationStatus === AuthorizationStatus.Auth) {
        if (user.role.includes(UserRoles.Admins)) {
            return children;
        }

        if (roleAccess === undefined) {
            return children;
        }

        if ((roleAccess !== undefined && (roleAccess.filter(element => user.role.includes(element)).length > 0))) {
            return children;
        } else {
            return (<Navigate to={AppRoutes.Root} />);
        }
    }

    return(<Navigate to={AppRoutes.Login} />);
}

export default PrivateRoute;