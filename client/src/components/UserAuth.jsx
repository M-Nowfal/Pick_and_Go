import { useParams } from "react-router-dom";
import UserSignin from "./user-components/UserSignin";
import UserLogin from "./user-components/UserLogin";
import UserSignOut from "./user-components/UserSignout";
import UserLogout from "./user-components/UserLogout";
import "../styles/user.css";

const UserAuth = () => {

    const { auth } = useParams();

    return (
        (auth == "login") ? <UserLogin /> : (auth == "signout") ? <UserSignOut /> : (auth == "logout") ? <UserLogout /> : <UserSignin />
    );
}

export default UserAuth;