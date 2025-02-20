import UserLogin from "./UserLogin";
import UserSignout from "./UserSignout";
import UserSignin from "./UserSignin";
import UserLogout from "./UserLogout";
import { useParams } from "react-router-dom";

const UserAuth = () => {

    const { auth } = useParams();

    return (
        (auth == "login") ? <UserLogin /> : (auth == "signout") ? <UserSignout /> : (auth == "logout") ? <UserLogout /> : <UserSignin />
    );
}

export default UserAuth;