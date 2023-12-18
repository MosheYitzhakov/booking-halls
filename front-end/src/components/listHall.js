
import * as React from 'react';
import Hall from './oneHall';

export default function HallForList({ halls }) {
  
  
  return (
    <div>
     { halls.map((hall,i)=>{
  return <Hall key={i} hall={hall}/>
    })}
 </div> );

}

