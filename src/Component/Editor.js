import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'
import Action from '../Action';



const Editor = ({roomId,socketRef,onCodeChange}) =>{

    const EditorRef = useRef(null)

    useEffect(()=>{
        async function init(){
            EditorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
                mode : {name:'javascript' ,json:true},  
                theme : 'dracula',
                autoClosetags : true,
                autoCloseBrackets : true,
                lineNumbers : true
            })


            EditorRef.current.on('change',(instance,changes)=>{
                    // console.log('changes',changes)
                    const {origin} = changes
                    const code = instance.getValue()
                    // console.log(code)
                    onCodeChange(code)
                    if(origin !== 'setValue'){
                        socketRef.current.emit(Action.CODE_CHANGE,{
                            roomId,
                            code
                        })
                    }

            })
        }
        init()
        // return socketRef.current.off('change')
    },[]);

    useEffect(()=>{

        if(socketRef.current){
            socketRef.current.on(Action.CODE_CHANGE,({code})=>{
                console.log('recieving')
                if(code !== null){
                    EditorRef.current.setValue(code)
                }
            })
        }
        // return (socketRef.current.off(Action.CODE_CHANGE))

    },[socketRef.current])

    return <div>
        <textarea id="realtimeEditor"/>
    </div>
}


export default Editor