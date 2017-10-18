export interface RequestListInterface {
    order: string; // ASC || DESC
    column: string;
    rows: number;
    page: number;
}

export interface ResponseInterface {
    messages: string[];
    success: boolean;
    errors: Array<{}>;
}


// User

export interface UserInterface {
    id: number;
    phone?: string;
    name?: string;
    login?: string;
    email?: string;
}

export interface UserResponseInterface extends ResponseInterface, UserInterface {
}

export interface UsersResponseInterface extends ResponseInterface {
    users: UserInterface[];
}
