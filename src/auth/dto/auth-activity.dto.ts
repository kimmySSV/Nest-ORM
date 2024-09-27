import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthActivityDto {


    @IsNotEmpty()
    USERID: string;

    @IsNotEmpty()
    USER_AGENT: string;

    @IsNotEmpty()
    USER_IP: string;

    @IsNotEmpty()
    AUTH_MODE: string;

}
