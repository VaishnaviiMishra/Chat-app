import React from 'react'
import './Chat.css'
import LeftSideBar from '../../components/LeftsideBar/LeftSideBar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />

      </div>
      
    </div>
  )
}

export default Chat
