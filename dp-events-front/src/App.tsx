import {Route, Routes} from 'react-router-dom';
import {AppRoutes, AuthorizationStatus, UserRoles} from "./constants";
import AuthorizationPage from "./pages/authorization-page/authorization-page";
import NotFoundPage from "./pages/not-found-page/not-found-page";
import PrivateRoute from "./components/private-route/private-route";
import {HelmetProvider} from "react-helmet-async";
import {useAppDispatch, useAppSelector} from "./hooks";
import {SyncLoader} from "react-spinners";
import {getAuthCheckedStatus, getAuthorizationStatus, getUser} from "./store/user-process/selectors";
import {getDataLoadingStatus, getErrorStatus} from "./store/data-process/selectors";
import {CSSProperties, useEffect} from "react";
import companyLogo from './imgs/dp-logo.svg';
import NetworkErrorPage from "./pages/network-error-page/network-error-page";
import {fetchEvents, fetchUsersAction} from "./store/api-actions";
import EventsMainPage from "./pages/events-main-page/events-main-page";
import EmployeesPage from "./pages/employees-page/employees-page";
import CreatableSelect from "react-select/creatable";
import CreateEventPage from "./pages/create-event-page/create-event-page";
import WarningSuccessPage from "./pages/warning-success-page/warning-success-page";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

function App () {
    const authorizationStatus = useAppSelector(getAuthorizationStatus);
    const isLoading = useAppSelector(getDataLoadingStatus);
    const isAuthChecked = useAppSelector(getAuthCheckedStatus);
    const hasError = useAppSelector(getErrorStatus);
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     if ('serviceWorker' in navigator) {
    //         //@ts-ignore
    //         navigator.setAppBadge(user.notificationsCount);
    //     }
    //     subscribe();
    // },[]);

    useEffect(() => {
        if (authorizationStatus === AuthorizationStatus.Auth){
            if (user.role.includes(UserRoles.Admins)) {
                dispatch(fetchUsersAction());
                dispatch(fetchEvents());
            } else {
                dispatch(fetchEvents());
                dispatch(fetchUsersAction());
            }
        }
    }, [authorizationStatus]);

    // const subscribe = async () => {
    //     const eventSource = new EventSource(`https://corp.severskcable.ru:4875/connect`)
    //     eventSource.onmessage = function (event) {
    //         const message = JSON.parse(event.data);
    //         dispatch(fetchAllData());
    //     }
    // }

    if (!isAuthChecked || isLoading) {
        return (
            <>
                <img src={companyLogo} className="app__load-img" alt="logo"/>
                <SyncLoader
                    color={"#EA753EFF"}
                    cssOverride={override}
                    size={15}
                    margin={8}
                />
            </>
        );
    }

    if (hasError) {
        return (
            <NetworkErrorPage />
        );
    }

    return(
        <HelmetProvider>
                <Routes>
                    <Route
                        path={AppRoutes.Root}
                        element={
                            <PrivateRoute authorizationStatus={authorizationStatus}>
                                <EventsMainPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={AppRoutes.EmployeesPage}
                        element={
                            <PrivateRoute authorizationStatus={authorizationStatus} roleAccess={[UserRoles.Admins]}>
                                <EmployeesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={AppRoutes.AddEvent}
                        element={
                            <PrivateRoute authorizationStatus={authorizationStatus} roleAccess={[UserRoles.Admins, UserRoles.Secretaries]}>
                                <CreateEventPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path={AppRoutes.SuccessWarning}>
                        <Route path=":eventId" element={
                            <PrivateRoute authorizationStatus={authorizationStatus}>
                                <WarningSuccessPage />
                            </PrivateRoute>} />
                    </Route>
                    <Route
                        path={AppRoutes.Login}
                        element={<AuthorizationPage />}
                    />
                    {/*<Route*/}
                    {/*    path={AppRoutes.Notifications}*/}
                    {/*    element={*/}
                    {/*        <PrivateRoute authorizationStatus={authorizationStatus}>*/}
                    {/*            <NotificationPage />*/}
                    {/*        </PrivateRoute>*/}
                    {/*    }*/}
                    {/*/>*/}
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Routes>
        </HelmetProvider>
    );
}

export default App;