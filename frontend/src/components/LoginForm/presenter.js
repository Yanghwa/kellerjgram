import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import formStyles from 'shared/formStyles.scss';

const LoginForm = (props,context) => (
    <div className={formStyles.formComponent}>
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input type='text' placeholder='Username' className={formStyles.textInput} value={props.usernameValue} onChange={props.handleInputChange} name={'username'} />
            <input type='password' placeholer='Password' className={formStyles.textInput} value={props.passwordValue} onChange={props.handleInputChange} name={'password'} />
            <input type='submit' placeholder='Log In' className={formStyles.button} />
        </form>
        <span className={formStyles.divider}>or</span>
        <span className={formStyles.facebookLink}>
            <Ionicon icon='logo-facebook' fontSize='20px' color='#385185' />
            {context.t("Log in with Facebook")}
        </span>
        <span className={formStyles.forgotLink}>Forgot password</span>
    </div>
);

LoginForm.propTypes = {
    usernameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default LoginForm;