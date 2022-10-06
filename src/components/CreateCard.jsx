import React from 'react';
import { Link } from 'react-router-dom';

const CreateCard = () => {
  return (
    <section className='CreateCard__container'>
      <Link to={'/create'}>
        <button className='button--solid'>Create Sample</button>
      </Link>
    </section>
  );
};

export default CreateCard;
