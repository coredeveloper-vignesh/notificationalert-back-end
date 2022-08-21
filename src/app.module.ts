import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WepPushService } from './services/wep-push/wep-push.service';

export const dbConnection = new DataSource({
  type: 'mysql',
  // host: 'localhost',
  host: '103.150.186.74',
  port: 3306,
  username: 'root',
  // password: 'root',
  password: 'GetBizMysqlDatabasePwd2021@',
});

dbConnection
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WepPushService],
})
export class AppModule {}
