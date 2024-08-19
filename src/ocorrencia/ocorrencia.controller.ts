import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import { OcorrenciaService } from './ocorrencia.service';

@Controller('ocorrencias')
export class OcorrenciaController {
  constructor(private readonly ocorrenciaService: OcorrenciaService) {}

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

  @Get()
  getOcorrencias(@Request() req) {
    return this.ocorrenciaService.getOcorrencias(req.user);
  }

  @Patch(':id/feedback')
  updateFeedback(@Param('id') id: number, @Body('feedback') feedback: string) {
    return this.ocorrenciaService.updateFeedback(id, feedback);
  }
}
