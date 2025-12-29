import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Github, Mail, ArrowLeft } from 'lucide-react';

const Signup = () => {
   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState<string | null>(null);
   const navigate = useNavigate();

   const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signUp({
         email,
         password,
      });

      if (error) {
         setError(error.message);
      } else {
         navigate('/'); 
      }
      setLoading(false);
   };

   const handleSocialLogin = async (provider: 'github' | 'google') => {
      await supabase.auth.signInWithOAuth({
         provider,
      });
   };

   return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,0,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>

         <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20">
            <ArrowLeft size={20} />
            <span className="font-medium">Go Back</span>
         </Link>
         
         <div className="w-full max-w-lg glass-morphism p-12 rounded-3xl border border-white/10 relative z-10">
            <div className="text-center mb-8">
               <div className="inline-flex bg-cyber-purple/10 p-3 rounded-2xl mb-4">
                  <Shield className="w-8 h-8 text-cyber-purple" />
               </div>
               <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
               <p className="text-gray-400 text-sm">Join the global threat intelligence network</p>
            </div>

            {error && (
               <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
                  {error}
               </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyber-purple focus:outline-none transition-all placeholder-gray-600"
                     placeholder="agent@cyberspy.io"
                     required
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyber-purple focus:outline-none transition-all placeholder-gray-600"
                     placeholder="••••••••••••"
                     required
                  />
               </div>
               
               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyber-purple text-white font-bold py-3.5 rounded-xl hover:shadow-[0_0_15px_rgba(188,0,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {loading ? 'Creating Profile...' : 'Sign Up'}
               </button>
            </form>

            <div className="my-6 flex items-center gap-4">
               <div className="h-px bg-white/10 flex-1"></div>
               <span className="text-xs text-gray-500 font-bold">OR CONTINUE WITH</span>
               <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button onClick={() => handleSocialLogin('github')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white font-medium text-sm">
                  <Github size={18} /> GitHub
               </button>
               <button onClick={() => handleSocialLogin('google')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white font-medium text-sm">
                  <Mail size={18} /> Google
               </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
               Already have an account? <Link to="/login" className="text-cyber-purple hover:text-white transition-colors font-bold">Log In</Link>
            </p>
         </div>
      </div>
   );
};

export default Signup;
