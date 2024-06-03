import { PasswordRegex } from './constants'
import { JwtPayload } from '../interfaces/user.interface'

export const ValidatePassword = (password: string) => {
    return PasswordRegex.test(password)
}

export const decodeJwtToken = (token: string): JwtPayload => {
    var base64Payload = token.split(".")[1];
    var payload = decodeURIComponent(
      atob(base64Payload)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(payload);
  }