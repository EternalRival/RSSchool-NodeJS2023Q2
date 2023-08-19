import { ApiProperty } from '@nestjs/swagger';

interface HttpExceptionResponseBodyInterface {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

export class HttpExceptionResponseBodyDto
  implements HttpExceptionResponseBodyInterface
{
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string | string[];
  @ApiProperty()
  error: string;
  @ApiProperty()
  timestamp: string;
  @ApiProperty()
  path: string;
}
