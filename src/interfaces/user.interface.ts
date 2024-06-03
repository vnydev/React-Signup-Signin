export interface User {
    readonly name?: string;
    readonly username?:  string;
    readonly password?: string;
}

export interface JwtPayload {
    readonly name: string;
    readonly email: string;
    readonly id: string;
    readonly exp: number;
    readonly iat: number;
}

export interface LoginResponse {
    readonly accessToken: string;
}

export interface SignupResponse {
    readonly message: string;
    readonly status: number;
    readonly error: string;
}

