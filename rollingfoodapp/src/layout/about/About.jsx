import React from 'react'
import './about.css';
import imagePerfilFacundo from '../../assets/perfilFacundo.png'
import imagePerfilFede from '../../assets/perfilFede.png'

export const About = () => {
  const members = [
    {
      imgSrc: 'https://rollingmusic.netlify.app/assets/team/Lucas.jpg',
      name: 'Lucas Ruiz'
    },
    {
      imgSrc: 'https://rollingmusic.netlify.app/assets/team/Daniel.jpeg',
      name: 'Daniel Andriani'
    },
    {
      imgSrc: 'https://turinoa.netlify.app/assets/images/DIEGO.jpg',
      name: 'Diego Garcia'
    },
    {
      imgSrc: imagePerfilFacundo,
      name: 'Facundo Medina'
    },
    {
      imgSrc: imagePerfilFede,
      name: 'Federico Lopez Pondal'
    },
  ]
  return (
    <>
      <h1>SOBRE NOSOTROS</h1>
      <div className='about-container'>
        {
          members.map(({imgSrc, name}) => {
            return <div className='member'>
              <img className='image-perfil-member' src={imgSrc} alt="" />
              <h3>{name}</h3>
            </div>
          })
        }
      </div>
    </>
  )
}