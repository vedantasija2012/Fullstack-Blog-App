import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              Blogify is the most trusted web app when it comes to writing, updating blogs with ease.
            </p>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="text-sm">
              <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm"><Link to="/contact" className="underline hover:text-gray-400">Contact</Link> via Website</p>
            <span className='text-xs'>OR</span>
            <p className="text-sm hover:underline"><a href="mailto:vedantasija3@gmail.com">vedantasija3@gmail.com</a></p>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="/" className="text-xl hover:text-blue-600"><i className="fab fa-facebook-f"></i></a>
              <a href="/" className="text-xl hover:text-blue-400"><i className="fab fa-twitter"></i></a>
              <a href="/" className="text-xl hover:text-pink-500"><i className="fab fa-instagram"></i></a>
              <a href="/" className="text-xl hover:text-blue-500"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© Blogify. All rights reserved.</p>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;