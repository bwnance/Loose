import { connect } from 'react-redux'
import { signup } from '../../actions/session'
import SessionForm from './session_form'
const mapStateToProps = (state) => ({
    errors: state.errors.session,
    formType: 'signup'
})
const mapDispatchToProps = (dispatch) => ({
    processForm: (formUser) => dispatch(signup(formUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)