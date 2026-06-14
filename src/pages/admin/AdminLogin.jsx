import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import Seo from '../../components/Seo.jsx';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success('Welcome back');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <Seo title="Admin Login" />
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <p className="font-serif text-2xl font-bold text-navy-900"><span className="text-gold">&#9878;</span> Admin Panel</p>
          <p className="mt-1 text-sm text-navy-700/60">Sign in to manage your portfolio</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="field-label">Username</label>
            <input className="field-input" autoFocus {...register('username', { required: 'Username is required' })} />
            {errors.username && <p className="field-error">{errors.username.message}</p>}
          </div>
          <div>
            <label className="field-label">Password</label>
            <input type="password" className="field-input" {...register('password', { required: 'Password is required' })} />
            {errors.password && <p className="field-error">{errors.password.message}</p>}
          </div>
          <button disabled={isSubmitting} className="btn-primary w-full">{isSubmitting ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  );
}
