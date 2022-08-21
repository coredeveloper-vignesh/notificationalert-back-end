/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class UserPushSubscriptionJSON {
  @ApiProperty()
  @IsNotEmpty()
  endpoint?: string;
  @ApiProperty()
  @IsNotEmpty()
  expirationTime?: EpochTimeStamp | null;
  @ApiProperty()
  @IsNotEmpty()
  keys?: Record<string, string>;
}

export class Login {
  @ApiProperty()
  @IsNotEmpty()
  country_no: string;
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;
  @ApiProperty()
  @IsNotEmpty()
  customer_id: string;
  @ApiProperty()
  @IsNotEmpty()
  mac_id: string;
  @ApiProperty()
  @IsNotEmpty()
  subscription: UserPushSubscriptionJSON;
}

export class User {
  @ApiProperty()
  @IsNotEmpty()
  country_no: string;
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;
  @ApiProperty()
  @IsNotEmpty()
  customer_id: string;
}
