//data transter object 데이터 전송 객체

import { IsString, IsNumber, IsOptional } from "class-validator"; //유효성검사

export class CreateMovieDto{

    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;
    @IsString({each: true})  //array의 경우, each: true
    @IsOptional()
    readonly genres: string[];
}