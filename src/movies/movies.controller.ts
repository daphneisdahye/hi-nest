import { Controller, Delete, Get, Param, Put, Post, Patch } from '@nestjs/common';


@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return "This will return all movies";
    }

    @Get("/:id")
    getOne(@Param("id") id: string) {
        return `This will return one movie with the id: ${id}`;
    }

    @Post()
    creat() {
        return "this will creat a movie";
    }

    @Delete("/:id") 
    remove(@Param("id") id:string) {
        return `this will delete a movie with the id: ${id}`;
    }

    @Patch('/:id')
    patchMovie(@Param("id") id:string) {
        return `this will update a movie wit the id: ${id}`;
    }


    
    



}
