import axios from "axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import dotenv from "dotenv"

export async function register(authData) {
    try {
            const {status} = await axios.post(`${import.meta.env.host}/register`, authData)

            
            if(status === 200) {
                console.log('User registered successfully');
                toast.success('User registered successfully');
            }
        } catch (e) {
            console.error(e.response.data.message);

        }

}


export async function login(authData) {
    console.log(process.env.host)

    try {
        const {data} = await axios.post(`${import.meta.env.host}/login`, authData)

        localStorage.setItem('auth', JSON.stringify(data));

    } catch (e) {
        console.error(e.response.data.message)
        toast({
            type: 'success',
            message:e.response.data.message
        })
    }

}

