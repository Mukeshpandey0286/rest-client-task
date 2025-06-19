import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class RequestEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  url!: string;

  @Property()
  method!: string;

  @Property()
  requestBody!: string;

  @Property()
  responseBody!: string;

  @Property()
  status!: number;

  @Property()
  createdAt: Date = new Date();
}
