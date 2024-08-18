import supertest from 'supertest';
import app from '../src/index.js';
import { jest } from '@jest/globals';

 
jest.mock('../middlewares/editing_middlewares.js', () => ({
  autenticador_user: (req  , res, next) => next(),
}));

describe('PATCH/post/:id_posts updatePostById', () => {
  // Dados para atualizar o post
  const teste = {
    title: 'titulo editado',
    body: 'corpo editado'
  };

  // ID da postagem para testar a atualização
  const postId = 1; // Substitua pelo ID que você deseja testar

  it('deve atualizar um post e retornar o status 200', async () => {
    const res = await supertest(app)
      .patch(`/post/${postId}`) // Inclua o ID na URL
      .send(teste)
      .expect('Content-Type', /json/)
      .expect(200); // Ajuste para o status esperado em uma atualização bem-sucedida

    // Adicione outras asserções conforme necessário
    expect(res.body.message).toBe('Postagem editada com sucesso');
    expect(res.body.post).toHaveProperty('title', 'titulo editado');
    expect(res.body.post).toHaveProperty('body', 'corpo editado');
  });

  // Teste para erro de solicitação inválida
  it('deve retornar o status 400 para solicitação inválida', async () => {
    const res = await supertest(app)
      .patch(`/post/${postId}`)
      .send({}) // Enviar um corpo de solicitação inválido
      .expect('Content-Type', /json/)
      .expect(400); // Ajuste para o status esperado em um erro de solicitação

    expect(res.body.message).toBe('Dados inválidos');
  });
});
