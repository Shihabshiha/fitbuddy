import React from 'react'
import CarouselComponent from '../../user/carousel';
import WeightGainPrograms from '../../user/weight-gainPrograms';
import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../../redux/reducers/userSlice';
import { fetchUserDetails } from '../../../utils/userUtils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const UserHomePage : React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isLoggedIn) fetchUserDetails(dispatch);
    
  },[dispatch,isLoggedIn])

  return (
    <>
      <CarouselComponent />
      <WeightGainPrograms />
    </>
  )
}

export default UserHomePage;