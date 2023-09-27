import axios from '../axios'
import useAuth from './useAuth'
import { updateToken } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux'

function useRefreshToken() {
    // const { setAuth } = useAuth();
    const dispatch = useDispatch()

    const refresh = async ()=>{
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        // setAuth(prev =>{
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return {...prev, accessToken: response.data.accessToken}
        // })

        dispatch(updateToken({accessToken: response.data.accessToken}))

        return response.data.accessToken;
    }

  return refresh;
}

export default useRefreshToken