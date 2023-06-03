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

  // afterAll(()=>{
    //주로 테스트 환경을 청소하거나 해체하는 코드 포함. DB 청소 등 
  // })

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
  
  describe("deleteOne",()=>{
    it("deletes a movie", ()=>{
       service.create({
        title:"Test Movie",
        genres: ['test'],
        year:2000,
      });
      const allMovies= service.getAll().length;
      service.deleteOne(1)
      const afterDelete=service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });
    it("should return a 404", ()=>{
      try{
        service.deleteOne(999)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  
  describe("create", ()=>{
    it("should create a movie", ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
          title:"Test Movie",
          genres: ['test'],
          year:2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update",()=>{
    it("should update a movie", ()=>{
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year:2000,
     });
     service.update(1, {title: 'Updated Test'});
     const movie = service.getOne(1);
     expect(movie.title).toEqual('Updated Test');
    });
    it("should throw a NotFoundExcepion", ()=>{
      try{
        service.update(999, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })
});
