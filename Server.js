const express = require('express')

const app = express()

const http = require('http')

const {Server} = require('socket.io')
const Action = require('./src/Action')

const server = http.createServer(app)

const io = new Server(server)


const userSocketMAp = {}

function getAllConnectedClients(roomId){
    // console.log(io.sockets.adapter.rooms.get(roomId))
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username:userSocketMAp[socketId]
        }
    })
}



io.on('connection',(socket)=>{
    console.log('socket connected',socket.id)

    socket.on(Action.JOIN,({roomId,username})=>{
        userSocketMAp[socket.id]=username
        socket.join(roomId)
        const clients = getAllConnectedClients(roomId)
        // console.log(clients)
        
        //   JOINED 
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(Action.JOINED,{
                socketId:socket.id,
                clients,
                username    
            })
        })

    })
    
    socket.on(Action.CODE_CHANGE,({roomId,code})=>{
        socket.in(roomId).emit(Action.CODE_CHANGE,{code})
    })

    socket.on(Action.SYNC_CODE,({code,socketId})=>{
        io.to(socketId).emit(Action.CODE_CHANGE,{code})
    })
        // Disconnection

    socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms]
        
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(Action.DISCONNECTED,{
                socketId:socket.id,
                username: userSocketMAp[socket.id]
            })
        })


        delete userSocketMAp[socket.id]
        socket.leave()
    })

})


const PORT = process.env.PORT || 5000
server.listen(PORT,()=> console.log(`Listening on port ${PORT}`))

