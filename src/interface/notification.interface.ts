/* eslint-disable prettier/prettier */
export class VapidDetailsInterface {
  subject: string;
  publicKey: string;
  privateKey: string;
}

export interface NotificationPayloadInterface {
  notification: {
    actions?: NotificationAction[];
    badge?: string;
    title?: string;
    body?: string;
    data?: any;
    dir?: NotificationDirection;
    icon?: string;
    image?: string;
    lang?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    tag?: string;
    timestamp?: EpochTimeStamp;
    vibrate?: VibratePattern;
  };
}
