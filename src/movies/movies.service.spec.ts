import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import exp from 'constants';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => { // 테스트를 하기 전에 실행됨
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => { //이게 테스트임
    expect(service).toBeDefined();
  });

  //test 코드 작성해보기 
  it("should be 4", () => {
    expect(2+2).toEqual(4)  //expect 기대한다 
  })
});
