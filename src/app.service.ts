import { Injectable } from '@nestjs/common';
import { dbConnection } from './app.module';
import { NotificationDto } from './dto/notification.dto';
import { Login } from './dto/user.dto';
import { NotificationPayloadInterface } from './interface/notification.interface';
import { WepPushService } from './services/wep-push/wep-push.service';

const vapidKeys = {
  subject: 'mailto:vignesh@getster.tech',
  publicKey:
    'BKgZvGWSp-5oxGoT2jVN_uFKivpzGXncgXal3vEtlZA-eioDlcmYW6iG8abr4H3_tO5i15F88CMSznJz0IDrowc',
  privateKey: '63jMAjcZpeo56QcypQdhIy3gRhwmWzeoXjUqJs9RDRs',
};
@Injectable()
export class AppService {
  constructor(private wepPushService: WepPushService) {}

  //Login to the serverPublicKey
  async login(body: Login) {
    try {
      const { country_no, customer_id, user_id, subscription, mac_id } = body;

      const isExist = await dbConnection.query(`
        SELECT * FROM user_notification.user_wise_notification_browser_tokens_data
        WHERE mac_id='${mac_id}'
      `);
      if (isExist.length > 0) {
        await dbConnection.query(`  
          UPDATE user_notification.user_wise_notification_browser_tokens_data
          SET 
          browser_token='${JSON.stringify(subscription)}',
          vapid_keys='${JSON.stringify(vapidKeys)}',
          user_id=${user_id}
          WHERE mac_id='${mac_id}';
      `);
      } else {
        await dbConnection.query(`
          INSERT INTO user_notification.user_wise_notification_browser_tokens_data
          (mac_id,
          user_id,
          browser_token,
          vapid_keys)
          VALUES
          ('${mac_id}',
          ${user_id},
          '${JSON.stringify(subscription)}',
          '${JSON.stringify(vapidKeys)}'
          );
      `);
      }
    } catch (error) {
      throw error;
    }
  }

  // Send a notification to the client
  async sendNotification(_body: NotificationDto) {
    try {
      const {
        customer_id,
        user_id,
        country_no,
        mac_id,
        notification_payload: { body, data, icon, image, title, silent },
      } = _body;

      const subscription: PushSubscription =
        await this.wepPushService.getSubscription(user_id, mac_id);

      await this.wepPushService.setVapidDetails(
        vapidKeys.subject,
        vapidKeys.publicKey,
        vapidKeys.privateKey,
      );

      const payload: NotificationPayloadInterface = {
        notification: {
          data,
          body,
          title,
          icon,
          image,
          silent,
          vibrate: [100, 50, 100],
        },
      };

      await this.wepPushService.sendNotification(subscription, payload);
    } catch (error) {
      throw error;
    }
  }
}
