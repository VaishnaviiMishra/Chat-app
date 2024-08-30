import React from 'react'
import './RightSideBar.css'
import assests from '../../assets/assets'
import assets from '../../assets/assets'
import {logout} from '../../config/firebase'

const RightSideBar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt=''/>
        <h3>Richard sanford<img src={assests.green_dot} className='dot' alt=""/></h3>
        <p>hey there i am blah blah</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assests.pic2} alt="" />
          <img src={assests.pic3} alt="" />
          <img src={assests.pic3} alt="" />
          <img src={assests.pic4} alt="" />
          <img src={assests.pic1} alt="" />
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default RightSideBar
