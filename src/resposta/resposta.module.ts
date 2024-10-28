import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resposta } from './resposta.entity';
import { Ocorrencia } from '../ocorrencia/ocorrencia.entity';
import { User } from '../user/user.entity';
import { RespostaService } from './resposta.service';
import { RespostaController } from './resposta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resposta, Ocorrencia, User])],
  providers: [RespostaService],
  controllers: [RespostaController],
})
export class RespostaModule {}