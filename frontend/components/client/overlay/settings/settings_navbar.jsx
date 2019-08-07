import React from 'react'
import CloseOverlayBtn from '../common/close_overlay_btn'
export default (props) => {
    let headerText = ""
    switch(props.currentPage){
        case "MAIN":
            headerText = "Options for ";
            break;
        case "RENAME":
            headerText = "Rename ";
            break;
        case "PURPOSE":
            headerText = "Set channel purpose for "
            break;
        case "DELETE":
            headerText = "Delete "
            break;
    }
    return (
        <div className="settings-navbar">
            {props.currentPage === "MAIN" ? <div className=".settings-nav-back"/> : <button onClick={props.goBack} className="settings-nav-back">
                <i className="fas fa-arrow-left"/>
            </button>}
            <h1 className="settings-header">
                {headerText}
                <span className="channel-name">
                    #{props.currentChannel.title}
                </span>
            </h1>
            <button onClick={props.closeOverlay} className="settings-nav-close">
                <i className="fas fa-times"/>
            </button>
        </div>
    )
}