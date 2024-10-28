import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ocorrencia } from '../ocorrencia/ocorrencia.entity';
import { User } from '../user/user.entity';

@Entity()
export class Resposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.respostas, { onDelete: 'CASCADE' })
  ocorrencia: Ocorrencia;

  @ManyToOne(() => User, { nullable: false })
  user: User;
}