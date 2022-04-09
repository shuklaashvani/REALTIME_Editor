import React,{useState} from 'react';
import CodeLogo from './code-sync.png';
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';


const Home = () =>{
    
    const Navigate = useNavigate();
    
    const [roomId,setRoomId] = useState("")
    const [UserName,setUsername] = useState("")

    const CreateNewRoom = (event) =>{
        event.preventDefault();
        const id = uuidv4();
        // console.log(id);
        setRoomId(id)
        if(id){
            toast.success("Created a new room");
        }
        // console.log("Room")
        
    }

    const JoinRoom = () => {
        if(!roomId || !UserName){
            toast.error("ROOM ID & Username is required");
            return;
        }

        //Redirect
        Navigate(`editor/${roomId}`,{
            state:{
                UserName
            }
        })

    }

    const handleInputEnter = (e) =>{
        // console.log(e.code)
        if(e.code === "Enter"){
            JoinRoom();
        }
    }

    
    return (
        <div className='HomePageWrapper'>
            <div className='formWrapper'>
               
                <img className = 'HomeLogo' src={CodeLogo} />
                <h4  className='mainlabel'>paste invitation Room</h4>
               
               <div className='inputGroup'>
                    <input 
                        type='text' 
                        className="inputBox" 
                        placeholder='Room Id' 
                        value={roomId}
                        onChange={(e)=> setRoomId(e.target.value)}
                        onKeyUp = {handleInputEnter}
                        />
                    <input 
                        type='text' 
                        className="inputBox" 
                        placeholder='UserName' 
                        onChange={(e) => setUsername(e.target.value)}
                        value={UserName}
                        onKeyUp = {handleInputEnter}
                        />

                    <button className='btn JoinBtn' onClick={JoinRoom}>Join</button>
                    <span className='createInfo'>If you don't have invite then create &nbsp;
                        <a onClick={CreateNewRoom} href='' className='createNewBtn'>
                            new room
                        </a>
                    </span>
               </div>
           
            </div>

            <footer>
                <h1>Made by Ashvani Shukla</h1>
            </footer>
        </div>
    )
}

export default Home;