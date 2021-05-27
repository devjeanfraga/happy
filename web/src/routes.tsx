import React from 'react';
import{BrowserRouter, Switch, Route } from 'react-router-dom';

//1.2 Aqui importamos o componente Landing do arquivo landing.tsx
//1.3 Em seguida colocamos esse componente como uma variável dentro de
//component={}, está entre chaves por ser uma linguagem JS
import Landing from './pages/landing';
import OrphanagesMap from './pages/orphanagesMap';
import Orphanage from './pages/orphanage';
import CreateOrphanage from './pages/createOrphanage';
 

function Routes (){
    //1.4 o atributo EXACT faz com que diferencie uma pagina da outra 
    //já que ambas começam com "/"
    //1.5 o Switch vai fazer com que uma única rota seja exibida em tela por vez
    return (
        <BrowserRouter>
        
        <Switch>
        
        <Route path='/' exact component={Landing} />
        <Route path='/app' component={OrphanagesMap} />

        <Route path= '/orphanages/create' component={CreateOrphanage}/>
        <Route path='/orphanages/:id' component={Orphanage}/>
        
        </Switch>

        </BrowserRouter>
    );
}

export default Routes;