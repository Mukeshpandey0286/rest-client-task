import { Migration } from '@mikro-orm/migrations';

export class Migration20250619055501 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`request_entity\` (\`id\` integer not null primary key autoincrement, \`url\` text not null, \`method\` text not null, \`request_body\` text not null, \`response_body\` text not null, \`status\` integer not null, \`created_at\` datetime not null);`);
  }

}
