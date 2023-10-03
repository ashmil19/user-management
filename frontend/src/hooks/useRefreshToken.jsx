import axios from '../axios'
import { updateToken } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux'

function useRefreshToken() {
    const dispatch = useDispatch()

    const refresh = async ()=>{
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        dispatch(updateToken({accessToken: response.data.accessToken}))

        return response.data.accessToken;
    }

  return refresh;
}

export default useRefreshToken