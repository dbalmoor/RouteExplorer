import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs
      .send(
        'service_eiewh0b', // Replace with your service ID
        'template_x8itcdk', // Replace with your template ID
        {
        to_email: '20r11a1208@gcet.edu.in', // Replace with your email address
        name: formData.name,
        email: formData.email,
        message: formData.message
      },
        'rrFH5sFtUS4jV5v2c' // Replace with your user ID
      )
      .then((response) => {
        console.log('Email sent successfully', response.text);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
    
  };

  return (
    <div className='bg-slate-800 text-slate-100 flex flex-col border-t-[1px]
             border-t-gray-600 pt-5 h-screen'>
      <div className=' shadow-lg bg-slate-800 py-5 text-slate-100 flex gap-4 rounded-lg flex-col items-center justify-center font-serif'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-serif font-bold'>Contact Information</h2>
        </div>
        <form onSubmit={handleSubmit} className='gap-5 flex flex-col'>
          <div className='flex gap-5'>
            <label htmlFor="name" className='text-lg text-slate-400'>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Enter Name'
              className='bg-transparent text-sm border-[1px] border-gray-400 rounded-lg px-2 active:bg-transparent'
              autoComplete="off"
            />
          </div>
          <div className='flex gap-5'>
            <label htmlFor="email" className='text-lg text-slate-400'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter email address'
              className='bg-transparent border-[1px] border-gray-400 rounded-lg px-2 active:bg-transparent text-sm'
              autoComplete="off"
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="message" className='text-lg text-slate-400'>Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Type a message...'
              className='bg-transparent border-[1px] border-gray-400 rounded-lg px-2 active:bg-transparent text-sm'
              autoComplete="off"
            ></textarea>
          </div>
          <button 
            type='submit' 
            onSubmit={handleSubmit}
            className='text-gray-300 w-full h-full hover:bg-gray-400 border-[1px] border-gray-200 bg-gray-800 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300'
            >
              <strong>Send Mail</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
