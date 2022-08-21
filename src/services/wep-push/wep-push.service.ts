import { Injectable } from '@nestjs/common';
import { NotificationPayloadInterface } from 'src/interface/notification.interface';
import * as webpush from 'web-push';
import { dbConnection } from '../../app.module';

@Injectable()
export class WepPushService {
  async generateVAPIDKeys() {
    return webpush.generateVAPIDKeys();
  }

  async setVapidDetails(subject, publicKey, privateKey) {
    webpush.setVapidDetails(subject, publicKey, privateKey);
  }

  async sendNotification(
    subscription: any,
    payload: NotificationPayloadInterface,
  ) {
    webpush
      .sendNotification(subscription, JSON.stringify(payload))
      .catch((err) => {
        console.log(err);
      });
  }

  // ---------- Helper functions --------------------------------
  async getSubscription(
    user_id: number,
    mac_id: string,
  ): Promise<PushSubscription> {
    try {
      const subscription = await dbConnection.query(`
        SELECT browser_token FROM user_notification.user_wise_notification_browser_tokens_data
        WHERE user_id=${user_id} AND mac_id='${mac_id}';
      `);
      return subscription[0].browser_token;
    } catch (error) {}
  }

  // async getVapidDetails(
  //   user_id: number,
  //   mac_id: string,
  // ): Promise<VapidDetailsInterface> {
  //   try {
  //     const vapidKeys = await dbConnection.query(`
  //       SELECT vapid_keys FROM user_notification.user_wise_notification_browser_tokens_data
  //       WHERE user_id=${user_id} AND mac_id='${mac_id}';
  //     `);
  //     return vapidKeys[0].vapid_keys;
  //   } catch (error) {}
  // }
}
