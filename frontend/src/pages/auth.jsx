import { useState } from "react"
import { login, register } from "../actions/auth";

function Auth() {

  const [signUp, setSignUp] = useState(false);
  const [authData, setAuthData] = useState({username:'', email:'', password:''});
  const SetSignUpClick = () => {
      setSignUp(signUp ? false : true);
  }
  const handleChange = (event) => {
    setAuthData({ ...authData, [event.target.name]: event.target.value });
    console.log(authData)
  }
  const click = () => {
    
    if(signUp){register({...authData}) } else login({...authData})
    
   }

if(localStorage.getItem('auth')) {
    return location.assign('/')
}

return (

      <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-4 text-center ml-">
          <h1 className="text-4xl ">{signUp ? "Kayıt Ol" : 'Giriş Yap'}</h1>
          {signUp && <div><input type="text" onChange={handleChange} name="username" className="input-form" placeholder="Username" /> </div> }
          <input onChange={handleChange} type="email" name="email" className="input-form" placeholder="Email" />
          <input onChange={handleChange} type="password" name="password" className="input-form" placeholder="Password" />
          <label className="cursor-pointer" onClick={SetSignUpClick}>{signUp ? "Hesabın Zaten Var mı Giriş Yap" : 'Hesabın Yok mu Kayıt Ol'}</label>
          <button className="btn btn-secondary" onClick={click}>Submit</button>
      </div>
      <div className="flex flex-col space-y-4">
      </div>
    </div>  

  )
}

export default Auth
