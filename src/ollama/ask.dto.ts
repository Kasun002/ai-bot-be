import { ApiProperty } from '@nestjs/swagger';

export class AskDto {
  @ApiProperty({ example: 'What is the refund policy?' })
  question: string;
}
