import React from 'react';
import { useAuth } from './AuthContext';

const AccountPage = () => {
  const { user } = useAuth();
  const user1 = localStorage.getItem('user')

  return (

    <>
         



<div className="">
  <div className="absolute w-[205px] text-[#b3b3b3] font-body-small font-[number:var(--body-small-font-weight)] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)] 
  top-[246px] left-[173px] lg:top-[277px] lg:left-[198px]">
    Update Photo
  </div>

  <div className="absolute w-[205px] text-black font-bold lg:font-m3-title-medium
  top-[308px] left-[40px] lg:top-[357px] lg:left-[65px]">
    Account Details
  </div>

  <div className="absolute w-[205px] text-black font-semibold lg:font-m3-title-medium 
  top-[331px] left-[40px] lg:top-[380px] lg:left-[66px]">
    User Information:
  </div>

  <div className="absolute w-[450px] text-black font-m3-title-medium 
  top-[350px] left-[40px] lg:top-[399px] lg:left-[66px]">
    <p>Username: {user1}</p>
  </div>

  <div className="absolute w-[205px] text-black font-m3-title-medium 
  top-[370px] left-[40px] lg:top-[418px] lg:left-[66px]">
    <p>Email: {user1}</p>
  </div>

  <div className="absolute w-[205px] text-black font-m3-title-medium font-[number:var(--m3-title-medium-font-weight)] text-[length:var(--m3-title-medium-font-size)] tracking-[var(--m3-title-medium-letter-spacing)] leading-[var(--m3-title-medium-line-height)] [font-style:var(--m3-title-medium-font-style)] 
  top-[390px] left-[40px] lg:top-[436px] lg:left-[66px]">
    <p></p>
  </div>

  <img
    className="absolute object-cover 
    w-[149px] h-[149px] top-[136px] left-[30px] lg:w-[188px] lg:h-[188px] lg:top-[100px] lg:left-[51px]"
    alt="Ellipse"
    src="https://c.animaapp.com/jBXSZajP/img/ellipse-2.svg"
  />

  <div className="absolute font-semibold text-black text-xl tracking-[0] leading-5 
  top-[103px] left-[38px] lg:top-[40px] lg:left-[58px]">
    Your Account
  </div>
</div>
         
           
  </>
  );
};
  


export default AccountPage;
