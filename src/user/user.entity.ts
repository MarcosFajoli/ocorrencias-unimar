import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ocorrencia } from '../ocorrencia/ocorrencia.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  studentRegister: string;

  @Column()
  role: 'admin' | 'student' | 'staff'; // Nível de Acesso

  @OneToMany(() => Ocorrencia, (ocorrencia) => ocorrencia.user)
  ocorrencias: Ocorrencia[];
}
