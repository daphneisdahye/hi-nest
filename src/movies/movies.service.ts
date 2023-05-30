import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] =[];

    getAll(): Movie[] {
        return this.movies;
    } 

    getOne(id: number):Movie {
        const movie = this.movies.find(movie=>movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID: ${id} not found. `);
        }
        return movie;
    }

    deleteOne(id:number) {
        this.getOne(id); //예외처리
        this.movies = this.movies.filter(movie =>movie.id !== id);     
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id:this.movies.length +1,
            ...movieData,
        });
    }

    update(id:number, updateData) {
        const movie = this.getOne(id); //예외처리 or movie가 존재할경우 불러오기
        this.deleteOne(id) // 기존 movie정보를 삭제하기
        this.movies.push({...movie,...updateData});  // 과거 data에 새로운 movie 더하기, insomnia를 쓰기 때문에 설정한 로직
    }
}
