import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";



const SignUp = () => {

    const [success, setSuccess] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;
        console.log(email, password, terms, name, photo);

        // reset error and status
        setErrorMsg('');
        setSuccess(false);

        // terms and condition validation
        if(!terms){
          setErrorMsg('Please accept our terms and condition.');
          return;
        }

        // password should be 6 character => validation
        if(password.length < 6) {
          setErrorMsg('Password should be 6 characters or longer');
          return;
        }


        // password validation

        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if(!passwordRegex.test(password)){
          setErrorMsg('At least one uppercase, one lowercase, one number, one special character!');
          return;
        }


        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          // console.log(result.user);
          setSuccess(true);

          // send email verification 
          sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log('verification email sent');
          });

          // update profile name and photo url
          const profile = {
            displayName: name,
            photoURL: photo
          }
          updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log('user profile updated!');
          })
          .catch(error => {
            console.log('user profile update error!');
          })


        })
        .catch(error => {
          // console.log('ERROR', error.message);
          setErrorMsg(error.message);
          setSuccess(false);
        })



    }

    return (
        <div className="max-w-lg mx-auto mt-16 shadow-2xl py-8">
            <h2 className="text-4xl text-center">Sign Up</h2>
            <br />


      <form onSubmit={handleSignUp} className="card-body">


        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="name" className="input input-bordered" required />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>


        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                placeholder="password" 
                className="input input-bordered" required />

          <button 
                onClick={() => setShowPassword(!showPassword)}
                 className="btn btn-xs absolute right-4 top-12">

            {
              showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
            }

          </button>

          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

        <div className="form-control">
  <label className="label justify-start cursor-pointer">
  <input type="checkbox" name="terms" className="checkbox" />
    <span className="label-text ml-3">Accept Our Terms & Conditions</span>

  </label>
</div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>

      {
        errorMsg && <p className="text-center text-red-700">{errorMsg}</p>
      }

      {
        success && <p className="text-green-700 text-center">Sign Up Successfully!</p>
      }

      <p className="mx-5 mb-20 text-center">Already have an account? Please <Link className="font-bold underline" to="/login">Login</Link> </p>

        </div>
    );
};

export default SignUp;