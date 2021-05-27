import{Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm'

import Orphanages from './Orphanages'


@Entity('images') // o nome aqui corresponde ao nome da table na migration
export default class Image {

  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  path: string;

  @ManyToOne(()=> Orphanages ,orphanage => orphanage.images)
  @JoinColumn({name:'orphanage_id'})
  orphanage: Orphanages;
}