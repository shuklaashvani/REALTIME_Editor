import React from 'react'
import Avatar from 'react-avatar';

const Client = (props) =>{
    return <div className='Client'>
        <Avatar name={props.username} size={50} round="14px" />
        {props.username}</div>
}

export default Client