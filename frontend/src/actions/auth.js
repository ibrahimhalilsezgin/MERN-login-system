import axios from "axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export async function register(authData) {
    try {
            const {status} = await axios.post(process.env.host, authData)

            
            if(status === 200) {
                console.log('User registered successfully');
                toast.success('User registered successfully');
            }
        } catch (e) {
            console.error(e.response.data.message);

        }

}


export async function login(authData) {

    try {
        const {data} = await axios.post(process.env.host, authData)


        localStorage.setItem('auth', JSON.stringify(data));

    } catch (e) {
        console.error(e.response.data.message)
        toast({
            type: 'success',
            message:e.response.data.message
        })
    }

}

