import { defineConfig } from '@mikro-orm/sqlite';
import { RequestEntity } from './entities/RequestEntity';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  entities: [RequestEntity],
  dbName: 'requests.sqlite3',
  extensions: [Migrator],
  debug: true,
});
