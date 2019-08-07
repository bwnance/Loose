import React from 'react'
export default (props) => {
    return (
        <div className="delete-page">
            <p>Deleting is useful if you don’t think you’ll need this channel any longer. Here’s what will happen when you delete this channel:</p>
            <ul>
                <li>No one will be able to send messages to it</li>
                <li>You won't be able to view this channel anymore</li>
                <li>All messages in this channel will be gone forever</li>
            </ul>
            <p></p>
            <p>Are you sure you want to archive #{props.currentChannel.title}?</p>
            <div className="buttons">
                <button className="cancel-btn" onClick={props.closeOverlay}>Cancel</button>
                <button className="delete-btn" onClick={props.deleteChannel}>Yes, delete the channel</button>
            </div>
        </div>
    )

}