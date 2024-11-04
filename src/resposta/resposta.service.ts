import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resposta } from './resposta.entity';
import { Ocorrencia } from '../ocorrencia/ocorrencia.entity';
import { User } from '../user/user.entity';

@Injectable()
export class RespostaService {
  constructor(
    @InjectRepository(Resposta)
    private respostaRepository: Repository<Resposta>,

    @InjectRepository(Ocorrencia)
    private ocorrenciaRepository: Repository<Ocorrencia>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(texto: string, ocorrenciaId: number, userId: number) {
    try {
      const ocorrencia = await this.ocorrenciaRepository.findOne({
        where: { id: ocorrenciaId },
      });
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!ocorrencia || !user) {
        throw new Error('Ocorrência ou usuário não encontrados');
      }

      const resposta = this.respostaRepository.create({
        texto,
        ocorrencia,
        user,
      });
      const respostaSalva = this.respostaRepository.save(resposta);

      return { message: 'Resposta registrada com sucesso' };
    } catch (error) {
      throw new Error('Erro ao responder');
    }
  }

  async findAll(): Promise<Resposta[]> {
    return this.respostaRepository.find({
      relations: ['ocorrencia', 'user'],
      order: { dataCriacao: 'ASC' }, // Ordenação crescente pela data de criação
    });
  }

  async findById(id: number): Promise<Resposta> {
    return this.respostaRepository.findOne({
      where: { id },
      relations: ['ocorrencia', 'user'],
    });
  }

  async findByOcorrenciaId(ocorrenciaId: number): Promise<Resposta[]> {
    return this.respostaRepository.find({
      where: { ocorrencia: { id: ocorrenciaId } },
      relations: ['ocorrencia', 'user'],
      order: { dataCriacao: 'ASC' },
    });
  }

  async update(id: number, texto: string): Promise<Resposta> {
    const resposta = await this.findById(id);
    resposta.texto = texto;
    return this.respostaRepository.save(resposta);
  }

  async delete(id: number): Promise<void> {
    await this.respostaRepository.delete(id);
  }
}
