import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import { DEPLOY_DOMAIN} from "../hosts/options";

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps): JSX.Element => {
    const { token } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);
    const refreshToken = localStorage.getItem('refToken') 
    
    useEffect(() => {
        // console.log('refToken from Auth',refreshToken);     
        verify();
    }, []);

    const verify = async () => {
        try {
            const response = await axios.get(`${DEPLOY_DOMAIN}/users/verify`, {
                headers: {
                    'x-access-token': token,
                    'x-refresh-token': refreshToken
                },
                withCredentials: true
            });
            if (response.status === 200) setRedirect(true);
        } catch (error) {
            setRedirect(false);
        }
    };

    return redirect ? <>{children}</> : <><h1>Not Authorized</h1></>;
};

export default Auth;
