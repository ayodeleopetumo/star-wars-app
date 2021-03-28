import React from 'react'

import './style.scss'

import darthVader from '../../assets/images/star-wars-error.jpg'

import { Props } from '../../models'

const Error: React.FC<Props> = () => {
  return (
    <section className='error'>
      <img className='error__img' src={darthVader} alt='The Empire' />

      <div className='error__content'>
        <p className='error__text'>Oops! Looks like you don’t know the power of the dark side!.</p>
        <p className='error__text'>The Evil Empire seem to be on the attack. An Error has occurred!</p>
        <button className='error__btn' onClick={() => window.location.reload()}>Contact Obi-Wan Kenobi</button>
      </div>
    </section>
  )
}

export default Error
