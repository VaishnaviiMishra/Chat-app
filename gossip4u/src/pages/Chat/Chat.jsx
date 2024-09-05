import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSideBar from '../../components/LeftsideBar/LeftSideBar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { AppContext } from '../../context/AppContext'
const Chat = () => {
  const {chatsData, userData} = useContext(AppContext);
  const [loading,setLoading] = useState(true);

  useEffect(()=> {
    if(chatsData && userData){
      setLoading(false)
    }
  },[chatsData,userData])
  return (
    <div className='chat'>
      {
        loading
        ? <p className='loading'>Loading . . .</p>:<div className='chat-container'>
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />
       </div>
      }  
    </div>
  )
}

export default Chat
