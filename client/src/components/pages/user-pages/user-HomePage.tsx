import React from 'react'
import CarouselComponent from '../../user/carousel';
import WeightGainPrograms from '../../user/weight-gainPrograms';

const UserHomePage : React.FC = () => {
  return (
    <>
      <CarouselComponent />
      <WeightGainPrograms />
    </>
  )
}

export default UserHomePage;