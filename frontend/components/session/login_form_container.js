import { connect } from 'react-redux'

import { login } from '../../actions/session'
import SessionForm from './session_form'
const mapStateToProps = (state) => ({
    errors: state.errors.session,
    formType: 'login'
})
const mapDispatchToProps = (dispatch) => ({
    processForm: (formUser) => dispatch(login(formUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)