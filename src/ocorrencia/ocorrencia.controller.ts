import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OcorrenciaService } from './ocorrencia.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('ocorrencias')
export class OcorrenciaController {
  constructor(private readonly ocorrenciaService: OcorrenciaService) {}

  // Agora apenas usuários autenticados podem criar ocorrências
  @UseGuards(JwtAuthGuard)
  @Post()
  createOcorrencia(
    @Body('descricao') descricao: string,
    @Body('isAnonima') isAnonima: boolean,
    @Request() req,
  ) {
    return this.ocorrenciaService.createOcorrencia(
      descricao,
      req.user.id,
      isAnonima,
    );
  }

  // Somente administradores podem ver todas as ocorrências
  @UseGuards(JwtAuthGuard)
  @Get()
  getOcorrencias(@Request() req) {
    return this.ocorrenciaService.getOcorrencias(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.ocorrenciaService.findById(id);
  }

  @Patch(':id/feedback')
  updateFeedback(@Param('id') id: number, @Body('feedback') feedback: string) {
    return this.ocorrenciaService.updateFeedback(id, feedback);
  }
}
