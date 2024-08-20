import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ocorrencia } from './ocorrencia.entity';
import { User } from '../user/user.entity'; // Certifique-se de que isso esteja correto

@Injectable()
export class OcorrenciaService {
  constructor(
    @InjectRepository(Ocorrencia)
    private readonly ocorrenciaRepository: Repository<Ocorrencia>,

    @InjectRepository(User) // Certifique-se de que isso esteja correto
    private readonly userRepository: Repository<User>,
  ) {}

  async createOcorrencia(
    descricao: string,
    userId: number,
    isAnonima: boolean,
  ) {
    const ocorrencia = new Ocorrencia();
    ocorrencia.descricao = descricao;
    ocorrencia.isAnonima = isAnonima;
    ocorrencia.status = 'pendente';

    if (!isAnonima) {
      // Corrigido para buscar usuário por ID
      const user = await this.userRepository.findOne({ where: { id: userId } });
      ocorrencia.user = user;
    }

    return this.ocorrenciaRepository.save(ocorrencia);
  }

  async getOcorrencias(user: User) {
    if (user.role === 'admin') {
      return this.ocorrenciaRepository.find();
    } else if (user.role === 'staff') {
      return this.ocorrenciaRepository.find({ where: { status: 'pendente' } });
    } else {
      return this.ocorrenciaRepository.find({ where: { user: user } });
    }
  }

  async updateFeedback(ocorrenciaId: number, feedback: string) {
    const ocorrencia = await this.ocorrenciaRepository.findOne({
      where: { id: ocorrenciaId },
    });
    ocorrencia.feedback = feedback;
    ocorrencia.status = 'resolvida';
    return this.ocorrenciaRepository.save(ocorrencia);
  }
}
