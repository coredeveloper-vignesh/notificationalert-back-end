/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "./user.dto";

class NotificationPayloadDto {
  @ApiProperty()
  data: object;
  @ApiProperty()
  body: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  icon: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  silent: boolean;
}

export class NotificationDto extends User {
  @ApiProperty()
  @IsNotEmpty()
  mac_id: string;
  @ApiProperty()
  notification_payload: NotificationPayloadDto;
}

