export const TIMEOUT_SHOW_ERROR = 2000;
export const publicVapidKey = 'BG2M57wQ4s6MhyXhryYdfpmaPGUSWhZgbWGf7kHkNTfMaVbIC7HIRaeq5h4wr9BmREx_toP0DvJAkPTfuVBgTP8';

export enum AppRoutes {
    Login = '/login',
    Root = '/',
    GoodSend = '/good-send',
    NotFound = '*',
    Notifications = '/notifications',
    EmployeesPage = '/empoyees',
    AddEvent = '/add-event',
    SuccessWarning = '/success-warning',
}

export enum MachinesStatus {
    Work = "Работает",
    Warning = "Работает нештатно",
    Inspection = "Требует внимания",
    Wrong = "Линия стоит"
}

export enum MachinesStatusPriority {
    "Работает",
    "Работает нештатно",
    "Требует внимания",
    "Поломка"
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum RepairPriority {
    High = 1,
    Medium = 2,
    Low = 3,
    Stop
}

export enum CommentType {
    RegisterComment ,
    SuccessComment,
    RepairingComment ,
    RepairCompletedComment ,
    RepairEndComment ,
}

export enum RepairStage {
    Register = "Зарегистрирована",
    RepairSuccess = "Поломка потверждена",
    Repairing = "Ремонт",
    RepairCompleted = "Ремонт выполнен",
    Supply = "Ожидает снабжения"
}

export enum UserRoles {
    Admins = "Администраторы",
    Secretaries = "Секретари",
    Users = "Пользователи"
}

export const Priority = ['Высокий - Неработает', 'Средний - Работает нештатно','Низкий - Требует внимания'];

export enum APIRoute{
    Machines = '/machines',
    Breaks = '/breaks',
    Events = '/events',
    BreaksTypeByMachine = '/break-types-by-machine',
    Login = '/users/login',
    Register = '/users/register',
    Images = '/upload/',
    Logout = '/logout',
    Notifications = '/notifications',
    Users = '/users',
    SuccessWarning = '/events/success-warning',
}

export enum NameSpace {
    Data = 'DATA',
    User = 'USER',
}

export const StopedTypes = [
    "Отсутствует сырьё или ТМЦ",
    "Отсутствие заказов",
    "Плановые остановки",
    "Отсутствие оператора",
    "На оборудовании работает стажер",
    "Отсутствие ПФ",
    "Отсутствие свободной тары",
    "Поломка оборудования",
    "Качество ПФ с предыдущей линии",
    "Качество сырья",
    "Снижение скорости",
    "Сбои в процессе",
    "Отсутствие задания на линию",
    "Потери по причине не соблюдения оператором своих ДИ",
    "М.В. всех дополнительных работ",
    "Проведение опытных работ",
    "Производство брака"
]