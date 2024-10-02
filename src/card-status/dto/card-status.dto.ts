import { IsString, IsNotEmpty } from "class-validator";
export class cardStatusDto {
    @IsNotEmpty()
    @IsString()
    cardNo: string;

    @IsNotEmpty()
    @IsString()
    statusUpdate: string;
}