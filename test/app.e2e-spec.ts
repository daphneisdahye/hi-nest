import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    //실제 어플리케이션과 똑같이 환경을 만들기 위해서, main.ts에서 가져옴
    app.useGlobalPipes(new ValidationPipe(
      {
       whitelist : true,
       forbidNonWhitelisted: true,  
       transform: true, 
      }),
     ); 
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my movie API');
  });

  describe('/movies', ()=>{
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]); //array를 받아오는지 확인
    });
    it('POST',()=>{
      return request(app.getHttpServer()) //서버에 리퀘스트
      .post("/movies") //movies에서 post를 할 때
      .send({  //아래정보를 같이보냄
        title:"Test",
        year:2000,
        genres:["test"],
      })
      .expect(201);   //201: 생성됨을 뜻함. 201을 돌려받는지 확인
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  });


  describe('/movies/:id', ()=>{
    it('GET 200', ()=>{
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it.todo('DELETE');
    it.todo('PATCH');
  });
});




