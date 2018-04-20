import { connect } from 'react-redux';
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    // const { user: { userList } } = state;
    const {  userList } = ownProps;
    return {
        userList
    };
};

export default connect(mapStateToProps)(Container);