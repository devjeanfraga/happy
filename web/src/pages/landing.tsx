import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
//2 Para ñ recarregamos a página no zero basta importar de dentro do 
//react-router-dom um carinha chamado LINK 
//2.1 Substituí-lo pelo <a> e trocar o <href> pelo <to>

import '../styles/pages/landing.css';
import logoImg from 'C:/projetos/nfl3/web/src/images/logo.svg';

//1 Aqui criamos um componente chamado Landing
function Landing(){
    return (
        <div id="page-landing">
        <div className="content-wrapper">
   
          <img src={logoImg} alt="happy"/>
   
          <main>
             <h1>Leve felicidade para o mundo</h1>
             <p>Visite orfanatos e mude o dia de muitas crianças</p>
          </main>
          
          <div className="location">
             
             <strong>Cabo Frio</strong>
             <span>Rio De Janeiro</span>
   
          </div>
   
          <Link to="/app" className='enter-app'>
           <FiArrowRight size={26} color='rgba(0,0,0,0.6)'/>
          </Link>
   
        </div>
       </div>
    );
}


export default Landing; 
//1.1 Aqui disponibilizamos esse componente para exportação
//Anotação: o default siginifica que esse é o componente mais importante 
//da página, tbm é um modo de apelidar o componente ao exportálo
