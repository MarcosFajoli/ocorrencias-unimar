import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcorrenciaService } from './ocorrencia.service';
import { OcorrenciaController } from './ocorrencia.controller';
import { Ocorrencia } from './ocorrencia.entity';
import { UserModule } from '../user/user.module'; // Certifique-se de que isso está correto

@Module({
  imports: [
    TypeOrmModule.forFeature([Ocorrencia]),
    UserModule, // Certifique-se de que isso está importado
  ],
  providers: [OcorrenciaService],
  controllers: [OcorrenciaController],
  exports: [TypeOrmModule]
})
export class OcorrenciaModule {}