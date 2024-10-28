import { Controller, Post, Get, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { RespostaService } from './resposta.service';
import { Resposta } from './resposta.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('respostas')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body('texto') texto: string,
    @Body('ocorrenciaId') ocorrenciaId: number,
    @Request() req,
  ): Promise<Resposta> {
    return this.respostaService.create(texto, ocorrenciaId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Resposta[]> {
    return this.respostaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Resposta> {
    return this.respostaService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ocorrencia/:ocorrenciaId')
  async findByOcorrenciaId(@Param('ocorrenciaId') ocorrenciaId: number): Promise<Resposta[]> {
    return this.respostaService.findByOcorrenciaId(ocorrenciaId);
  }   

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body('texto') texto: string): Promise<Resposta> {
    return this.respostaService.update(id, texto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.respostaService.delete(id);
  }
}