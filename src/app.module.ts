import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcorrenciaModule } from './ocorrencia/ocorrencia.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RespostaModule } from './resposta/resposta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Altere o tipo de 'mysql' para 'sqlite'
      database: 'database.sqlite', // Nome do arquivo SQLite
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Use 'true' apenas em desenvolvimento; 'false' em produção
    }),
    OcorrenciaModule,
    UserModule,
    RespostaModule,
    AuthModule,
  ],
})
export class AppModule {}
