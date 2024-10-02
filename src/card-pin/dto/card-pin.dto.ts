import { IsString, IsNotEmpty } from "class-validator";
export class cardPinDto {
    @IsNotEmpty()
    @IsString()
    cardNo: string;
}