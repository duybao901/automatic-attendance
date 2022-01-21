import React from 'react';
import GlobalLoadingImage from '../../images/global-loading.gif'
import "./GlobalLoading.scss"
const GlobalLoading = () => {
  return <div className='global-loading'>
    <div className="global-loading__wrapper">
      <img src={GlobalLoadingImage} alt="loading" />     
      <p>Loading...</p> 
    </div>
  </div>;
};

export default GlobalLoading;
