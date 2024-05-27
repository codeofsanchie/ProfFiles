import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from  '../store/store'
import styles from '../styles/Username.module.css';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'

export default function Recovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const navigate = useNavigate()

  async function sendOrResendOTP() {
    if (!isOTPSent) {
      try {
        const OTP = await generateOTP(username);
        console.log(OTP);
        setOTP(OTP);
        setIsOTPSent(true);
        toast.success('OTP has been sent to your email!');
      } catch (error) {
        toast.error('Problem while generating OTP!');
      }
    } else {
      // Assuming you want to allow resending the same OTP immediately
      // If you want to enforce a delay or additional checks, implement them here
      try {
        const OTP = await generateOTP(username);
        console.log(OTP);
        setOTP(OTP);
        setIsOTPSent(true);
        toast.success('New OTP has been sent to your email!');
      } catch (error) {
        toast.error('Problem while resending OTP!');
      }
    }
  }

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Enter OTP to recover password.
            </span>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>

              <div className="textbox flex flex-col items-center gap-6">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='OTP' />
                  </div>

                  <button className={styles.btn} type='submit'>Recover</button>
              </div>
          </form>

          <div className="text-center py-4">
          <span className='text-gray-500'>Didn't receive OTP? <button onClick={sendOrResendOTP} className='text-red-500'>{isOTPSent? 'Resend OTP' : 'Send OTP'}</button></span>          </div>
        </div>
      </div>
    </div>
  )
}