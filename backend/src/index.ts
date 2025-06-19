import express from 'express';
import cors from 'cors';
import { MikroORM } from '@mikro-orm/core';
import { RequestEntity } from './entities/RequestEntity';
import mikroOrmConfig from './mikro-orm.config';

const app = express();
app.use(cors());
app.use(express.json());

let orm: MikroORM;

app.post('/api/request-history', async (req, res) => {
  const em = orm.em.fork();
  const request = em.create(RequestEntity, req.body);
  await em.persistAndFlush(request);
  res.status(201).json(request);
});

app.get('/api/request-history', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const em = orm.em.fork();
  const [data, count] = await em.findAndCount(RequestEntity, {}, { offset: (page - 1) * limit, limit });
  res.json({ data, count });
});

app.listen(4000, async () => {
  orm = await MikroORM.init(mikroOrmConfig);
  console.log('Server running on http://localhost:4000');
});