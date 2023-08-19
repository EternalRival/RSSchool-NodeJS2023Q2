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
  public statusCode: number;

  @ApiProperty()
  public message: string | string[];

  @ApiProperty()
  public error: string;

  @ApiProperty()
  public timestamp: string;

  @ApiProperty()
  public path: string;
}
