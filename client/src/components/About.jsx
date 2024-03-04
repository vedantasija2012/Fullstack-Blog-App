import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  return (
    <div className='block mx-auto p-4 my-4 shadow-xl w-full md:w-4/5 rounded-md'>
      <div className='px-4 py-2'>
        <div>
          <h1 className='my-2 text-center text-2xl font-semibold'>Welcome to Blogify: Empowering Your Voice</h1>
          <p className='my-2 text-lg'>At Blogify, we believe in the power of storytelling and the transformative impact of sharing ideas. Founded on the principles of creativity, connection, and community, Blogify is a dynamic platform designed to empower individuals to express themselves, connect with others, and inspire meaningful conversations.</p>
        </div>
        <div>
          <p className='my-2 text-lg'>
            Our mission at Blogify is simple: to provide a space where voices are heard, stories are shared, and connections are made. Whether you're a seasoned writer, a passionate hobbyist, or an expert in your field, Blogify welcomes you to join our community of creators and explorers.
          </p>
        </div>
        <div>
          <p className='my-2 text-lg'>
            At Blogify, we're committed to fostering an inclusive and supportive environment where individuals from all backgrounds and perspectives can thrive. Our platform is designed with user experience and accessibility in mind, ensuring that everyone has the opportunity to participate and engage.
          </p>
        </div>
        <div className='my-2'>
          <ul>
            <li className='list-disc'><strong className='px-1'>Creative Freedom:</strong> Express yourself through blog posts, articles, and personal narratives.</li>
            <li className='list-disc'><strong className='px-1'>Content Discovery:</strong> Explore a diverse range of topics and interests, from travel and lifestyle to technology and wellness.</li>
            <li className='list-disc'><strong className='px-1'>User-Friendly Interface:</strong> Enjoy a seamless and intuitive browsing experience across devices, from desktop to mobile.</li>
            <li className='list-disc'><strong className='px-1'>Privacy and Security:</strong> Rest assured that your personal information and data are protected through robust security measures and privacy controls.</li>
          </ul>
        </div>
        <div>
          <p className='my-2 text-lg'>
            Whether you're a seasoned blogger or just starting your journey, Blogify invites you to become a part of our vibrant community. Share your stories, engage with fellow creators, and embark on a journey of discovery and connection.
          </p>
        </div>
        <div className='flex flex-col'>
          <p className='my-2 text-lg'>
            Ready to unleash your creativity and join the conversation? Sign up for an account on Blogify and start sharing your voice with the world. Together, let's inspire, inform, and ignite change through the power of storytelling.
          </p>
          <button onClick={()=>navigate('/blogs')} className='self-center my-2 font-bold px-4 py-2 rounded-md bg-black text-white w-full md:w-1/6'>Get Started</button>
        </div>
        <div>
          <h2 className='text-center text-xl font-semibold'>Thank you for being a part of the Blogify community.</h2>
        </div>
      </div>
    </div>
  )
}

export default About