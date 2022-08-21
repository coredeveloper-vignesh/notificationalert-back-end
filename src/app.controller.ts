import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { NotificationDto } from './dto/notification.dto';
import { Login, User } from './dto/user.dto';
import { WepPushService } from './services/wep-push/wep-push.service';

@Controller()
@ApiTags('web-push')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private wepPushService: WepPushService,
  ) {}

  @Get('generate-vapid-keys')
  async generateVAPIDKeys() {
    return this.wepPushService.generateVAPIDKeys();
  }

  @Post('login')
  async login(@Body() body: Login) {
    try {
      await this.appService.login(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('edge-notification')
  async edgeNotification(@Body() body: NotificationDto): Promise<void> {
    try {
      await this.appService.sendNotification(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('chrome-notification')
  async chromeNotification(@Body() body: User): Promise<any> {
    try {
      const payload = {
        notification: {
          data: {
            url: 'https://bizchat.getbiz.app/#/app-store',
          },
          badge: 'https://bizchat.getbiz.app/assets/icons/getbiz_logo.png',
          title: `Title Chrome `,
          icon: 'https://bizchat.getbiz.app/assets/icons/getbiz_logo.png',
          image: 'https://bizchat.getbiz.app/assets/icons/getbiz_logo.png',
          // "silent": boolean,
          silent: false, //This will be true notification didn't show in browser
          // tag: '',
          timestamp: '231sj234234',
          vibrate: [100, 50, 100],
        },
      };
      // webpush.sendNotification(rajaMobile, JSON.stringify(payload));
      return body;
    } catch (error) {
      throw error;
    }
  }
}
