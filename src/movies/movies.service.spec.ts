import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';


describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => { // 테스트를 하기 전에 실행됨
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();
    //service를 통해서 MovieService의 메소드 접근
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => { //이게 테스트임
    expect(service).toBeDefined();
  });

  describe("getAll", ()=>{
    //getAll이 array를 리턴하는지 테스트
    it("should return an array", () =>{      
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne", ()=>{
    it("should return a movie",()=>{
      //테스트용 movie 생성
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year:2000,
      });
      //test용 movie 불러오기
      const movie=service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error",()=>{
      try{
        service.getOne(999);
      }catch(e){
        //NotFoundException가 발생하는지 확인
        expect(e).toBeInstanceOf(NotFoundException);
        //에러메세지를 잘 띄우는 지 확인
        expect(e.message).toEqual('Movie with ID: 999 not found.');
      }
    })
  })

});
