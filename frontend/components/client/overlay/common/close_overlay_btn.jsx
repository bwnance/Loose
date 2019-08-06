import React from 'react'
import {closeOverlay} from '../../../../actions/ui_actions.js'
import {connect} from 'react-redux'
const CloseOverlayBtn = (props) => {
    return (
        <button onClick={props.closeOverlay} className="close-overlay-button">
            <svg className="overlay-close-x svg-icon" viewBox="0 0 20 20">
                    <path fill="none" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
                    c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
                    c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
                    c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
            </svg>
            <div className="overlay-close-esc">esc</div>
        </button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    closeOverlay: () => dispatch(closeOverlay())
})

export default connect(null, mapDispatchToProps)(CloseOverlayBtn)