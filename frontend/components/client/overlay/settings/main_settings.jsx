import React from 'react'

export default (props) => {
    return (
        <div className="main-settings">
            <div onClick={props.changeView("DELETE")} className="settings-option">
                <div className="settings-text-col">
                    <h2>Delete this channel</h2>
                    <p>If you don't think it will be used anymore and you want to clean up, delete it. The channel CANNOT be deleted later!</p>
                </div>
                <i className="fas fa-arrow-right" />
            </div>
            <div onClick={props.changeView("RENAME")} className="settings-option">
                <div className="settings-text-col">
                    <h2>Rename this channel</h2>
                    <p>You can rename a channel at any time. But, use it sparingly: it might confuse or disorient your colleagues!</p>
                </div>
                <i className="fas fa-arrow-right" />
            </div>
            <div onClick={props.changeView("PURPOSE")} className="settings-option">
                <div className="settings-text-col">
                    <h2>Set the channel purpose</h2>
                    <p>Channel purposes are especially useful to new members choosing which conversations to join.</p>
                </div>
                <i className="fas fa-arrow-right" />
            </div>
        </div>
    )
}