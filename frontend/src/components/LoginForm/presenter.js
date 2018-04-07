import React from 'react';
// import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import formStyles from 'shared/formStyles.scss';

const LoginForm = (props,context) => (
    <div className={formStyles.formComponent}>
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input type='text' placeholder='Username' className={formStyles.textInput} value={props.usernameValue} onChange={props.handleInputChange} name={'username'} />
            <input type='password' placeholer='Password' className={formStyles.textInput} value={props.passwordValue} onChange={props.handleInputChange} name={'password'} />
            <input type='submit' placeholder='Log In' className={formStyles.button} />
        </form>
        <span className={formStyles.divider}>or</span>
        <FacebookLogin
            appId="341629783022700"
            autoLoad={true}
            fields="name,email,picture"
            callback={props.handleFacebookLogin} 
            cssClass={formStyles.facebookLink}
            icon="fa-facebook-official"
            />
        <span className={formStyles.forgotLink}>Forgot password</span>
    </div>
);

LoginForm.propTypes = {
    usernameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFacebookLogin: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default LoginForm;