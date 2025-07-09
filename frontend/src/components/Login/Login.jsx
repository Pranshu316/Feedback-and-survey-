import './Login.css'

const Login = () =>{

    return(
    
        <div className=" login-container">
            <div className="login-box">
                <div className='User-text'>User Login</div> 
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
                <hr/>
                
            </div>
        </div>
        
        
        

    );
 
};
export default Login;