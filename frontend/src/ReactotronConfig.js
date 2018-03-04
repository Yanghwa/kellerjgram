import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: "kellerjgram" })
    .use(reactotronRedux())
    .connect();

export default Reactotron;