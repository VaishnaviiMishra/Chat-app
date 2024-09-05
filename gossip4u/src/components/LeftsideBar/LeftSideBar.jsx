import React, { useContext, useState ,createContext } from 'react';
import './LeftSideBar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, query, where, arrayUnion, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { userData, chatsData, chatUser, setChatUser,setMessagesId,messagesId} = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, 'users');
        const q = query(userRef, where('username', '==', input.toLowerCase()));
        const querySnap = await getDocs(q);

        if (!querySnap.empty) {
          const foundUserId = querySnap.docs[0].data().id;
          const userExist = chatsData ? chatsData.some((item) => item.rId === foundUserId) : false;

          console.log('User exists in chatsData:', userExist); // Debugging log

          if (!userExist && foundUserId !== userData.id) {
            setUser(querySnap.docs[0].data());
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const addChat = async () => {
    const messagesRef = collection(db, 'messages');
    const chatsRef = collection(db, 'chats');
    try {
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messagesId: newMessageRef.id,
          lastMessage: '',
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeem: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messagesId: newMessageRef.id,
          lastMessage: '',
          rId: user.id,
          updatedAt: Date.now(),
          messageSeem: true,
        }),
      });

      toast.success('Chat added successfully!'); // Show success message
    } catch (error) {
      toast.error(error.message); // Show error message
      console.error(error);
    }
  };


  async function setChat(item) {
    setMessagesId(item.messagesId);
    setChatUser(item);
  }

  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} className='logo' alt='logo' />
          <div className='menu'>
            <img src={assets.menu_icon} alt='menu icon' />
            <div className='sub-menu'>
              <p onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr />
              <p onClick={() => navigate('/logout')}>Logout</p>
            </div>
          </div>
        </div>
        <div className='ls-search'>
          <img src={assets.search_icon} alt='search icon' />
          <input onChange={inputHandler} type='text' placeholder='Search Here..' />
        </div>
      </div>
      <div className='ls-list'>
        {showSearch && user 
          ? <div onClick={addChat} className='friends add-user'>
            <img src={user.avatar || assets.default_avatar} alt='user avatar' />
            <p>{user.name}</p>
          </div>
         : chatsData && chatsData.length > 0 
           ? chatsData.map((item, index) => (
            <div onClick={()=> setChat(item)} key={index} className='friends'>
              <img src={item.userData.avatar} alt="" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
            ))
           : <p>No chats available</p>
        } 
      </div>
    </div>
  );
};

export default LeftSideBar;




