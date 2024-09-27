import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
    @IsNotEmpty({message:"email ຫ້າມເປັນຄ່າວ່າງເປົ່າ"})
    @IsEmail({}, {message:"email ບໍ່ຖືກ"})
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    userAgent: string;

    // @IsNotEmpty()
    // userIp: string;

}
