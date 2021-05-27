import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1605818078104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable( new Table({
        name:'images',
        columns:[
          {
            name:'id',
            type:'integer',
            unsigned:true,
            isPrimary:true,
            isGenerated:true,
            generationStrategy:'increment'
          },
          {
            name:'path', //Que diz a rota para acessar a imagem
            type:'VARCHAR'
          },
          {
            name:'orphanage_id',//Aqui é o id do orfanato pq é uma relaçao de um para muitos/ por isso que 
                               //quando UM orfanato tem MUITAS imagens precisamo adicionar o id do orfanato
            type: 'integer'
          },
      
        ],

        foreignKeys:[
          {
            name:'ImageOrphanage', //O nome que vc quiser
            
            columnNames:['orphanage_id'], //Aqui é o nome da coluna que vai armazenar o relacionamento
            
            referencedTableName:'orphanages',//Qual table ela está se relacionando
            
            referencedColumnNames:['id'], //Qual a coluna na table de orphanages está se relacionando
            
            onUpdate:'CASCADE',//'CASCADE' Altera o 'id' dentro da table de forma automática
            
            onDelete:'CASCADE'//'CASCADE' Caso um orfanato seja deletado do banco de dados as imagens desse
                              //orfanato tbm serão deletadas.
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images')
    }

}
