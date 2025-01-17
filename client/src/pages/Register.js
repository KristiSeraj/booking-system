import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
	const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        await register(name, email, password, role);
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-md p-6 sm:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl mx-4">
              <div className="absolute inset-0 bg-white/40 rounded-2xl backdrop-blur-lg -z-10"></div>
              
              <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Create an Account
                  </h2>
                  <p className="text-gray-600">Join us and start booking services today</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                      </label>
                      <div className="relative">
                          <input
                              id="name"
                              name="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your full name"
                              required
                              autoComplete="name"
                              className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          />
                      </div>
                  </div>

                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                      </label>
                      <div className="relative">
                          <input
                              id="email"
                              name="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                              required
                              autoComplete="email"
                              className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          />
                      </div>
                  </div>

                  <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                      </label>
                      <div className="relative">
                          <input
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Create a password"
                              required
                              autoComplete="new-password"
                              className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          />
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                          I want to
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                          <label className="flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                              <input
                                  type="radio"
                                  name="role"
                                  value="customer"
                                  checked={role === 'customer'}
                                  onChange={(e) => setRole(e.target.value)}
                                  className="hidden"
                              />
                              <div className={`text-center ${role === 'customer' ? 'text-blue-600' : 'text-gray-600'}`}>
                                  <span className="block font-medium">Book Services</span>
                                  <span className="text-sm">I'm a customer</span>
                              </div>
                          </label>
                          
                          <label className="flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                              <input
                                  type="radio"
                                  name="role"
                                  value="provider"
                                  checked={role === 'provider'}
                                  onChange={(e) => setRole(e.target.value)}
                                  className="hidden"
                              />
                              <div className={`text-center ${role === 'provider' ? 'text-blue-600' : 'text-gray-600'}`}>
                                  <span className="block font-medium">Offer Services</span>
                                  <span className="text-sm">I'm a provider</span>
                              </div>
                          </label>
                      </div>
                  </div>

                  <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  >
                      Create Account
                  </button>
              </form>

              <p className="mt-8 text-center text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition duration-200">
                      Sign in
                  </Link>
              </p>
          </div>
      </div>
  );
}

export default Register;