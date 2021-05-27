import{Request,Response} from 'express'

import {getRepository} from 'typeorm';

import OrphanageView from '../views/orphanages_view';

import Orphanages from '../models/Orphanages';

import * as Yup from 'yup';




export default{


  //listagem dos orfanatos
  async index (request: Request, response: Response){

    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = await orphanagesRepository.find({
      relations:['images']
    });

    return response.json(OrphanageView.renderMany(orphanages));

  },


  //Detalhes do orfanato
  async show (request: Request, response: Response){

    const {id} = request.params;

    const orphanagesRepository = getRepository(Orphanages);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations:['images']
    });

    return response.json(OrphanageView.render(orphanage))
  },


  //Criação do orfanato
  async create(request: Request, response: Response){

      
    
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    }
    =request.body;
  
    //crie uma variável logo a baixo de 'request.body' que vai abrigar o getRepository e o Orphanages
    const orphanagesRepository = getRepository(Orphanages);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return {path: image.filename};
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const schema = Yup.object().shape({
        name:Yup.string().required('O nome é obrigatório'),// vc pode traduzir tbm, ou deixar em ingles mesmo. 
        latitude:Yup.number().required(),
        longitude:Yup.number().required(),
        about:Yup.string().required().max(300),
        instructions:Yup.string().required(),
        opening_hours:Yup.string().required(),
        open_on_weekends:Yup.boolean().required(),
        images:Yup.array(
          Yup.object().shape({
              path:Yup.string().required()
            })
          )
        });

    await schema.validate(data,{
      abortEarly:false 
      //o 'abortEarly'(abortar cedo) significa que voce quer que ele não mostre 
      //o erro de imediado de um a um dos dados e sim todos de uma única vez
		  //por isso o 'false'.
    })
  
    //Em seguida crie outra variável para CRIAR um orfanato 
    const orphanage = orphanagesRepository.create(data);
  
    //PARA SALVAR NO BANCO DE DADOS:
    await orphanagesRepository.save(orphanage);
    // o uso o await é pra dizer que deve-se aguardar esse trecho ser
    // executado para depois executrar a proxima tarefa da função
    // mas para isso deve declarar o async na frente dos parenteses com os parâmetros.
    
    return response.status(201).json(orphanage);
  }
};