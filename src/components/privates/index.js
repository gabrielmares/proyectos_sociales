import { Redirect } from 'react-router-dom'
import { useAuth } from '../../firebase/firebase'

const PrivateUser = ({ component: Component, ...props }) => {


    const { user, pending } = useAuth();

    if (pending) {
        return false;
    }

    if (!user) {
        return <Redirect to="/" />
    }
    return (
        <Component {...props} usuario={user} />
    );
}

export default PrivateUser;
