import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData);
    setLoading(false);
    if (result.success) navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-violet-50 to-orange-50">
      <div className="container mx-auto max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center gradient-text">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
                data-testid="login-email-input"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10"
                required
                data-testid="login-password-input"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-orange-500 text-white"
              disabled={loading}
              data-testid="login-submit-btn"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
