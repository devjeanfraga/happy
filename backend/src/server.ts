import express from 'express';

import path from 'path';

import cors from 'cors';

import 'express-async-errors';

import routes from './routes';

import './database/connection';

import errorHandler from '../src/errors/handler';

const app = express();

app.use(cors());

app.use(express.json()); //esse trocho é para que o express entenda o json

//Rota= conjunto, caminho
//Recurso= exemplificando : '/users'

//4 métodos mais utilizados dentro das APIS
//get-post-put-delete
//Get= buscar uma informação(recurso)
//Post= criar uma informação
//Put= editar uma informação
//Delete= Excluir uma informação
//Mas para o browser o método que ele faz requisições do tipo GET 
//Dai o backend tem que estar preparado para receber esse método GET

//Parametros

//Query Params:http://localhost:3333/users?search=jean&
    //começam sempre com o ponto de interrogação
    //e depois o nome do parametro

    //Route Params:http://localhost:3333/users/1(id identificador)
    //route serve para identificar um recurso
    //caso queira excluir ou editar um user
    //voce precisa saber qual user é 
    //dai se utiliza o parametro route para identificar o que vc quer configurar

    //Body: http://localhost:3333/users
    //o body na verdade é onde ficam as informações mais complexias/compostas dos usuario

app.use(routes);

app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));

app.use(errorHandler);

app.listen(3333);

//Aqui impostarmos o express que ajuda 
//express é um frame em node que ajuda
//a lidar com requisições e respostas 
// a configurar rotas na aplicação
//de forma mais simples no node
//dai a gente ouvi a na porta (3333)
//ou seja, localhost:3333