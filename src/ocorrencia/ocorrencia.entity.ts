import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Resposta } from '../resposta/resposta.entity';

@Entity()
export class Ocorrencia {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  descricao: string;
  
  @Column({ nullable: true })
  feedback?: string;

  @Column({ default: 'pendente' })
  status: 'pendente' | 'resolvida';

  @Column({ default: false })
  isAnonima: boolean;

  @ManyToOne(() => User, (user) => user.ocorrencias, { nullable: true })
  user: User;

  @OneToMany(() => Resposta, (resposta) => resposta.ocorrencia)
  respostas: Resposta[];
}