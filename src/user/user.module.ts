import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ocorrencia } from '../ocorrencia/ocorrencia.entity';
import { OcorrenciaService } from '../ocorrencia/ocorrencia.service';
import { OcorrenciaController } from '../ocorrencia/ocorrencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ocorrencia]), UserModule], // Importa o repositório de Ocorrencia e o UserModule
  providers: [OcorrenciaService], // Define o OcorrenciaService como um provider
  controllers: [OcorrenciaController], // Define o OcorrenciaController
})
export class UserModule {}
