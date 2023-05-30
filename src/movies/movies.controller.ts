import { Controller, Delete, Get, Param, Put, Post, Patch, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';


@Controller('movies')
export class MoviesController {
        //moviesService 의존성주입 받기위해 
        constructor(private readonly moviesService: MoviesService) {}


    @Get()
    getAll():Movie[] {
        return this.moviesService.getAll();
    }



    @Get("/:id")
    getOne(@Param("id") id: number):Movie {
        return this.moviesService.getOne(id);
    }

    @Post()
    creat(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete("/:id") 
    remove(@Param("id") id:number) {
        return this.moviesService.deleteOne(id);
    }

    @Patch('/:id')
    patchMovie(@Param("id") id:number, @Body() updateData) {
        return this.moviesService.update(id, updateData)
    
    };
    

    }


    
    




