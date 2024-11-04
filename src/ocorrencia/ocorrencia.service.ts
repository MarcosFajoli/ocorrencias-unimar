import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      const ocorrencia = new Ocorrencia();
      ocorrencia.descricao = descricao;
      ocorrencia.isAnonima = isAnonima;
      ocorrencia.status = 'pendente';

      // if (!isAnonima) {
      // Corrigido para buscar usuário por ID
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      ocorrencia.user = user;
      // }

      await this.ocorrenciaRepository.save(ocorrencia);

      return { message: 'Ocorrência criada com sucesso' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Não foi possível criar sua ocorrência. Contate o administrador.',
      );
    }
  }

  async getOcorrencias(user: User) {
    if (user.role === 'admin') {
      return this.ocorrenciaRepository.find({
        relations: ['user'],
        select: {
          id: true,
          descricao: true,
          isAnonima: true,
          user: {
            id: true,
            name: true,
            studentRegister: true,
          },
        },
      });
    } else if (user.role === 'staff') {
      return this.ocorrenciaRepository.find({
        where: { status: 'pendente' },
        relations: ['user'],
        select: {
          id: true,
          descricao: true,
          isAnonima: true,
          user: {
            id: true,
            name: true,
            studentRegister: true,
          },
        },
      });
    } else {
      return this.ocorrenciaRepository.find({
        where: { user: { id: user.id } },
        relations: ['user'],
        select: {
          id: true,
          descricao: true,
          isAnonima: true,
          user: {
            id: true,
            name: true,
            studentRegister: true,
          },
        },
      });
    }
  }

  async findById(id: number) {
    const ocorrenciaWithrespostas = await this.ocorrenciaRepository.findOne({
      where: { id },
      relations: ['user', 'respostas', 'respostas.user'],
    });
    const {
      id: idOcorrencia,
      descricao,
      isAnonima,
      respostas: respostasUnfiltered,
      user,
    } = ocorrenciaWithrespostas;

    const respostas = respostasUnfiltered.map((resposta) => ({
      userId: resposta.user.id,
      userName: resposta.user.name,
      userEmail: resposta.user.name,
      texto: resposta.texto,
      dataCriacao: resposta.dataCriacao,
    }));

    const { id: userId, name: userName, email: userEmail } = user;

    return {
      idOcorrencia,
      userId,
      userName,
      userEmail,
      descricao,
      isAnonima,
      respostas,
    };
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
