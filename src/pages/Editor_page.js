import React,{useEffect, useRef, useState} from 'react';
import logo from './code-sync.png'
import Client from '../Component/Client'
import Editor from '../Component/Editor'
import { initSocket } from '../Socket';
import Action from '../Action';
import { useLocation ,useParams,Navigate, useNavigate} from 'react-router-dom';
import { connect } from 'socket.io-client';
import toast from 'react-hot-toast';

const EditorPage = () =>{

    const codeRef = useRef(null)
    const socketRef = useRef(null)
    const location = useLocation()
    const {roomId} = useParams()
    // console.log(params)
    const ReactNavigator = useNavigate()

    const [Clients,setClient] = useState([])




    useEffect(()=>{

        const init = async() =>{
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error',(e)=>{
                console.log(e)
                toast.error("Connection Error,try later")
                ReactNavigator('/')
            })
            // console.log(socketRef.current)
            socketRef.current.emit(Action.JOIN,{
                roomId,
                username: location.state?.UserName
            })


            //Listening

            socketRef.current.on(Action.JOINED,({socketId,username,clients})=>{
                if(username != location.state.UserName){
                    toast.success(`${username} Joined the Room`)
                }
                
                // console.log(clients)
                // console.log(`${username} joined`)
                setClient(clients)
                socketRef.current.emit(Action.SYNC_CODE,{
                    code : codeRef.current,
                    socketId
                })
            })


            //Listening for Disconnected

            socketRef.current.on(Action.DISCONNECTED,({socketId,username})=>{
                toast.success(`${username} left the room`)
                setClient((prev)=>{
                    return prev.filter(client=> client.socketId != socketId)
                })
            })


        }

        init();
        return ()=>{
            socketRef.current.disconnect()
            socketRef.current.off(Action.JOIN)
            socketRef.current.off(Action.JOINED)
            socketRef.current.off(Action.DISCONNECTED)
        }
    },[])


    // Copy Button
    const copyRoomId = async() =>{
        try{
            await navigator.clipboard.writeText(roomId)
            toast.success('Room Id has been copied to your clipboard')
        }catch(err) {
            toast.error('could not copy the Room Id')
        }
    }


    //Leave Button
    const leaveRoom = () =>{
        ReactNavigator('/')
    }

    if(!location.state){
        return <Navigate to='/' />
    }

    return <div className="mainWrap">
                <div className='aside'>
                    <div className='asideInner'>
                        <div className="logo">
                            <img src={logo} className="logoImage" />
                        </div>
                        <h3>Connected</h3>

                        <div className='client_List'>
                                {
                                    Clients.map((client)=>{
                                        return(
                                            <Client 
                                                key={client.socketId} 
                                                username={client.username}
                                            />
                                        )
                                    })
                                }
                        </div>

                    </div>
                    <button className='btn copyBtn' onClick={copyRoomId}>Copy ROOM ID</button>
                    <button className='btn Leave_btn' onClick={leaveRoom}>Leave</button>
                </div>

                <div className='Editor'>
                    <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>codeRef.current=code} />
                </div> 
            </div>
}

export default EditorPage;
