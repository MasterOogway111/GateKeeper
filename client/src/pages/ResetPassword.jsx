// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../assets/assets';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ResetPassword = () => {
//   const { backendUrl } = useContext(AppContext);
//   axios.defaults.withCredentials = true;

//   const inputRefs = React.useRef([]);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [isEmailSent, setIsEmailSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);

//   const handleInput = (e, index) => {
//     if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData('text');
//     const pasteArray = paste.split('');
//     pasteArray.forEach((char, index) => {
//       if (inputRefs.current[index]) {
//         inputRefs.current[index].value = char;
//       }
//     });
//     setOtp(pasteArray.join(''));
//   };

//   const onSubmitEmail = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
//       if (data.success) {
//         toast.success(data.message);
//         setIsEmailSent(true);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   const onSubmitOtp = async (e) => {
//     e.preventDefault();
//     const otpArray = inputRefs.current.map((input) => input.value);
//     const otpValue = otpArray.join('');
//     if (otpValue.length === 6) {
//       setOtp(otpValue);
//       setIsOtpSent(true);
//     } else {
//       toast.error('Please enter the full 6-digit OTP.');
//     }
//   };

//   const onSubmitNewPassword = async (e) => {
//     e.preventDefault();
//     if (!email || !otp || !newPassword) {
//       toast.error('Email, OTP, and New Password are required.');
//       return;
//     }
//     try {
//       const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
//         email,
//         otp,
//         newPassword,
//       });
//       if (data.success) {
//         toast.success(data.message);
//         navigate('/login');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-indigo-700">
//       <img
//         onClick={() => navigate('/')}
//         src={assets.logo}
//         className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
//         alt="Logo"
//       />

//       {!isEmailSent && (
//         <form
//           onSubmit={onSubmitEmail}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
//           <p className="text-center mb-6 text-indigo-300">Enter your registered email address.</p>

//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.mail_icon} alt="Email Icon" className="w-3 h-3" />
//             <input
//               type="email"
//               placeholder="Email ID"
//               className="bg-transparent outline-none text-white"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
//             Submit
//           </button>
//         </form>
//       )}

//       {!isOtpSent && isEmailSent && (
//         <form
//           onSubmit={onSubmitOtp}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
//           <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email.</p>

//           <div className="flex justify-between mb-8" onPaste={handlePaste}>
//             {Array(6)
//               .fill(0)
//               .map((_, index) => (
//                 <input
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   onInput={(e) => handleInput(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   required
//                   className="w-12 h-12 bg-[#333A5C] text-white text-center text-lg rounded-md"
//                 />
//               ))}
//           </div>

//           <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
//             Submit
//           </button>
//         </form>
//       )}

//       {isOtpSent && isEmailSent && (
//         <form
//           onSubmit={onSubmitNewPassword}
//           className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
//         >
//           <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
//           <p className="text-center mb-6 text-indigo-300">Enter the new password below.</p>

//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.lock_icon} alt="Password Icon" className="w-3 h-3" />
//             <input
//               type="password"
//               placeholder="New Password"
//               className="bg-transparent outline-none text-white"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    setOtp(pasteArray.join(''));
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value);
    const otpValue = otpArray.join('');
    if (otpValue.length === 6) {
      setOtp(otpValue);
      setIsOtpSent(true);
    } else {
      toast.error('Please enter the full 6-digit OTP.');
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) {
      toast.error('Email, OTP, and New Password are required.');
      return;
    }
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#222] relative">
      {/* Optional Bat Signal overlay */}
      <div className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: `radial-gradient(circle at 70% 15%, #FFD60044 180px, transparent 280px)`,
          opacity: 0.22,
          zIndex: 0
        }}
      />
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer z-10"
        alt="Logo"
        style={{ filter: 'grayscale(1) brightness(0.7)' }}
      />

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-[#181818] p-8 rounded-xl shadow-2xl w-96 text-sm z-10 border border-[#FFD600]/20"
        >
          <h1 className="text-[#FFD600] text-2xl font-bold text-center mb-4 drop-shadow">Reset Password</h1>
          <p className="text-center mb-6 text-gray-400">Enter your registered email address.</p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#222] border border-[#FFD600]/10">
            <img src={assets.mail_icon} alt="Email Icon" className="w-5 h-5" />
            <input
              type="email"
              placeholder="Email ID"
              className="bg-transparent outline-none text-[#FFD600] placeholder-gray-400 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-[#FFD600] to-[#FFEB3B] text-[#181818] font-bold rounded-full shadow-lg hover:from-[#FFEB3B] hover:to-[#FFD600] transition mt-3">
            Submit
          </button>
        </form>
      )}

      {!isOtpSent && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-[#181818] p-8 rounded-xl shadow-2xl w-96 text-sm z-10 border border-[#FFD600]/20"
        >
          <h1 className="text-[#FFD600] text-2xl font-bold text-center mb-4 drop-shadow">Reset Password OTP</h1>
          <p className="text-center mb-6 text-gray-400">Enter the 6-digit code sent to your email.</p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  key={index}
                  type="text"
                  maxLength="1"
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                  className="w-12 h-12 bg-[#0D0D0D] text-[#FFD600] text-center text-2xl rounded-md border-2 border-[#FFD600]/30 focus:border-[#FFD600] outline-none transition duration-150"
                  style={{ boxShadow: '0 0 8px 0 #FFD60022' }}
                />
              ))}
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-[#FFD600] to-[#FFEB3B] text-[#181818] font-bold rounded-full shadow-lg hover:from-[#FFEB3B] hover:to-[#FFD600] transition">
            Submit
          </button>
        </form>
      )}

      {isOtpSent && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-[#181818] p-8 rounded-xl shadow-2xl w-96 text-sm z-10 border border-[#FFD600]/20"
        >
          <h1 className="text-[#FFD600] text-2xl font-bold text-center mb-4 drop-shadow">New Password</h1>
          <p className="text-center mb-6 text-gray-400">Enter the new password below.</p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#222] border border-[#FFD600]/10">
            <img src={assets.lock_icon} alt="Password Icon" className="w-5 h-5" />
            <input
              type="password"
              placeholder="New Password"
              className="bg-transparent outline-none text-[#FFD600] placeholder-gray-400 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-[#FFD600] to-[#FFEB3B] text-[#181818] font-bold rounded-full shadow-lg hover:from-[#FFEB3B] hover:to-[#FFD600] transition mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;