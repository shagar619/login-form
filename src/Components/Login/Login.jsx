import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [Success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);

        // reset status
        setSuccess(false);
        setErrorMsg('');

        // Login user

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);

            // email verification
            if(!result.user.emailVerified){
                setErrorMsg('Please verify your email address!');
            } else{
                setSuccess(true);

            }


            
        })
        .catch(error => {
            console.log('ERROR',error.code, error.message);
            setErrorMsg(error.message);
        })
    }


    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            setErrorMsg('Please provide a valid E-mail address!');
        }else {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please Reset E-mail sent, please check your email.');
            })
        }


    }

    return (
        <div>
            <h2 className="text-3xl text-center my-12">Login</h2>

            <div className="hero bg-base-200 py-12">
  <div className="hero-content flex-col lg:flex-row-reverse">


    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" ref={emailRef} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label onClick={handleForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <br />

      {
        Success && <p className="text-green-700 mb-7 mx-3 text-center">User Login Successfully!</p>
      }

      {
        errorMsg && <p className="text-red-700 text-center mb-7 mx-3">{errorMsg}</p>
      }

      <p className="mx-5 mb-20">New to this website? please <Link className="font-bold underline" to="/signUp">Sign Up</Link> </p>


    </div>
  </div>
</div>
        </div>
    );
};

export default Login;