import React,{useState} from 'react';
import CodeLogo from './code-sync.png';
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Home = () =>{
    
    const Navigate = useNavigate();
    
    const [roomId,setRoomId] = useState("")
    const [UserName,setUsername] = useState("")


    const particlesInit = async (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };


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

            

             <Particles
                    id="tsparticles"
                    init={particlesInit}

                    options={{
                        "fullScreen": {
                            "enable": true,
                            "zIndex": -10
                        },
                        "particles": {
                            "number": {
                                "value": 15,
                                "density": {
                                    "enable": false,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#fff"
                            },
                            "shape": {
                                "type": "star",
                                "options": {
                                    "sides": 5
                                }
                            },
                            "opacity": {
                                "value": 0.8,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 4,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "rotate": {
                                "value": 0,
                                "random": true,
                                "direction": "clockwise",
                                "animation": {
                                    "enable": true,
                                    "speed": 5,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 500,
                                "color": "#ffffff",
                                "opacity": 0.4,
                                "width": 2
                            },
                            "move": {
                                "enable": true,
                                "speed": 2,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": ["grab"]
                                },
                                "onclick": {
                                    "enable": false,
                                    "mode": "bubble"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true,
                        "background": {
                            "color": "#111",
                            "image": "",
                            "position": "50% 50%",
                            "repeat": "no-repeat",
                            "size": "cover"
                        }
                    }}
                    />
        </div>
    )
}

export default Home;