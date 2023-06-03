

import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";


//CreateMovieDto랑 기본적으로 비슷하지만, 전부 필수사항은 아님
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}