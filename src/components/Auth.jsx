/* eslint-disable no-console */
import React, { useEffect, useState, useContext } from 'react'
import { auth, GoogleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [error, setError] = useState(false);
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)
  const signIn = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log(userCredential, 'userCredential....')
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
      })
      .catch((error) => {
        console.log(error,'er..')
        setError(true);
      });
    } catch (err) {
      console.log(err)
    }
  }
  const logOut = async() => {
    try {
      await signOut(auth)
    } catch (err) {
      console.log(err)
    }
  }
  const signInWithGoogle = async() => {
    try {
      await signInWithPopup(auth, GoogleProvider)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log(auth.currentUser?.email, auth.currentUser?.photoURL, auth.currentUser?.phoneNumber)
  }, [ email ])
  return (
    <>
      <button type='button' onClick={logOut}>logOut</button>
      <h1>meddah saad ...</h1>
      <form className=' w-[53%] h-[50%] flex flex-col justify-center items-start' onSubmit={signIn}>
        <input type='text' className=' w-full h-[40px] outline-none bg-gray-100 mb-3' onChange={(e) => setEmail(e.target.value)} placeholder='email' name='email' />
        <input type='password' className=' w-full h-[40px] outline-none bg-gray-100 mb-3' onChange={(e) => setPassword(e.target.value)} placeholder='password' name='password' />
        <button type='submit' className=' bg-green-300 py-2 px-5 mb-2 text-white'>signIn</button>
        <button type='button' className=' bg-green-300 py-2 px-5 text-white' onClick={signInWithGoogle}>signIn with google</button>
      </form>
      {error && <span>Wrong email or password!</span>}
    </>
  )
}

export default Auth