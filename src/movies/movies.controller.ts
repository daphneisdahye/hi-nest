import { Controller, Delete, Get, Param, Put, Post, Patch, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';


@Controller('movies')
export class MoviesController {
        //moviesService 의존성주입 받기위해 
        constructor(private readonly moviesService: MoviesService) {}


    @Get()
    getAll():Movie[] {
        return this.moviesService.getAll();
    }



    @Get("/:id")
    getOne(@Param("id") id: string):Movie {
        return this.moviesService.getOne(id);
    }

    @Post()
    creat(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Delete("/:id") 
    remove(@Param("id") id:string) {
        return this.moviesService.deleteOne(id);
    }

    @Patch('/:id')
    patchMovie(@Param("id") id:string, @Body() updateData) {
        return {
            updatedMovie: id,
            ...updateData,
        }};
    

    }


    
    




