import React, {useEffect, useState}from 'react';

import {Link} from 'react-router-dom';

import { FiPlus, FiArrowRight } from 'react-icons/fi';

import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import Leaflet from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg';

//import mapIcon from '../utils/mapicon';

import '../styles/pages/orphanagesMap.css';

import api from '../services/api';

import 'leaflet/dist/leaflet.css';


const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize:[58,68],
  iconAnchor:[29,68],
  popupAnchor:[0, -60]

});



interface Orphanage{
  id:number,
  latitude:number,
  longitude:number,
  name:string
}

function OrphanagesMap (){
  const [orphanages, setOrphanages]= useState<Orphanage[]>([]);
  
  useEffect(()=>{
    api.get('/orphanages').then(response =>{
      setOrphanages(response.data);
    })
  },[])

    return (
        <div id='orphanages-map'>
            
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa </h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Cabo Frio </strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>
            
            <Map  
            center={[-22.8894577,-42.0395839]} 
            zoom={15}
            style={{width:'100%', height:'100%'}}
            >
                {/*<TileLayer 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}

               <TileLayer url= 
               {`https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKEN_MAPBOX}`}
               />

               {orphanages.map((orphanage)=> {

                 return (
                  <Marker 
                  key={orphanage.id}
                  icon={mapIcon}
                  position={[orphanage.latitude,orphanage.longitude]}
                 
                   >
               
                  <Popup 
                  closeButton={false} 
                  minWidth={240} 
                  maxWidth={240} 
                  className="map-popup"
                  >
                       
                       {orphanage.name}
   
                       <Link to={`/orphanages/${orphanage.id}`}>
                         <FiArrowRight size={20} color="#FFF"/>
                       </Link>
                  </Popup>
   
                  </Marker>
                 )
               })}

            </Map>
        
            
            <Link to="/orphanages/create" className="create-orphanage">

                <FiPlus size={32} color= '#fff'/>

            </Link>
        </div>


    );
}

export default OrphanagesMap;