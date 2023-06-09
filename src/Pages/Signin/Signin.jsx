import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const Signin = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { googleProviderLogin, signIn } = useContext(AuthContext);
    const [loginError, setLoginErorr] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleProviderLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.log(`Error is ${error}`));
    }

    const handleLogin = data => {
        console.log("Data is: ", data);//data is an object here;
        setLoginErorr('');//error ta clear kore fellam jate error khawar por jokhon submit kormu tokhon jodi abr error khai jate notun error ta show koraite pare

        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                toast.success("Login Successfull");
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message);
                setLoginErorr(error.message);
            });
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='shadow-2xl m-4 p-7 rounded-2xl w-96'>
                <h1 className='text-5xl text-accent text-center'>Sign In</h1>
                <div className="divider mt-2 mb-10"></div>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs mb-3">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>

                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: "Email is REQUIRED"
                            })}
                        />
                        {errors.email && <p className='text-rose-700 font-semibold'>{errors.email?.message}</p>}

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>

                        <input
                            type="password"
                            name='password'
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: "Password is REQUIRED",
                                minLength: {
                                    value: 6,
                                    message: "Password Must be 6 Characters or Longer."
                                },
                            })}
                        />
                        {errors.password && <p className='text-rose-700 font-semibold'>{errors.password?.message}</p>}

                        <label className="label mb-7">
                            <span className="label-text-alt font-semibold">Forgot Password?</span>
                        </label>
                    </div>

                    <input type="submit" value="Login" className='btn bg-gray-200 hover:text-white hover:bg-gray-500 text-black w-full' />

                    <div>
                        {
                            loginError && <h1 className='text-fuchsia-800 font-semibold text-xl'>{loginError}</h1>
                        }
                    </div>
                </form>
                <p className='mt-5'>New to amaJON? <Link to='/createaccount' className='text-secondary font-semibold'>Create New Account</Link></p>

                <div className="divider">OR</div>

                <button type="submit" className='btn bg-gray-200 text-black hover:text-white hover:bg-gray-500 w-full' onClick={handleGoogleLogin} >Continue With Google</button>
            </div>
        </div>
    );
};

export default Signin;