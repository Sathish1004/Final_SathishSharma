import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const navigate = useNavigate();
    const { signIn, signUp, sendOtp, verifyAdminLogin, setShowOnboarding } = useAuth();
    const { toast } = useToast();

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [signupStep, setSignupStep] = useState(1); // 1: Details, 2: OTP
    const [loginStep, setLoginStep] = useState(1); // 1: Credentials, 2: OTP
    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsLogin(true);
            setSignupStep(1);
            setLoginStep(1);
            setShowPassword(false);
            setEmail('');
            setPassword('');
            setName('');
            setOtp('');
            setError('');
            setResendTimer(30);
            setCanResend(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if ((signupStep === 2 || (isLogin && loginStep === 2)) && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [signupStep, loginStep, isLogin, resendTimer]);

    // Reset timer when entering OTP step
    useEffect(() => {
        if (signupStep === 2 || (isLogin && loginStep === 2)) {
            setResendTimer(30);
            setCanResend(false);
        }
    }, [signupStep, loginStep, isLogin]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleSendOtp = async () => {
        if (!email || !name || !password) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        setError('');

        try {
            const result = await sendOtp(email);
            if (result.error) throw new Error(result.error.message);
            setSignupStep(2);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!canResend) return;
        setLoading(true);
        setError('');
        try {
            const result = await sendOtp(email);
            if (result.error) throw new Error(result.error.message);
            setResendTimer(30);
            setCanResend(false);
            toast({
                title: "OTP Resent",
                description: "A new verification code has been sent to your email.",
            });
        } catch (err: any) {
            setError(err.message || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        if (!otp) {
            setError("Please enter the OTP");
            return;
        }
        setLoading(true);
        try {
            const { error } = await signUp(email, password, name, otp);
            if (error) throw new Error(error.message);
            // Trigger Onboarding Overlay instead of immediate redirect
            // navigate('/welcome'); 
            // setResetOnboarding(true); // Handled in AuthContext now
            onClose();
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    }


    const handleSubmit = async () => {
        setError('');

        try {
            const trimmedEmail = email.trim();
            if (isLogin) {
                if (loginStep === 1) {
                    setLoading(true);
                    const { error, user, status } = await signIn(trimmedEmail, password);
                    setLoading(false);
                    if (error) throw new Error(error.message);

                    if (status === 'OTP_SENT') {
                        setLoginStep(2);
                        return;
                    }

                    if (user?.role === 'ADMIN') {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/dashboard');
                    }
                    onClose();
                } else {
                    // Admin OTP Verify
                    if (!otp) {
                        setError('Please enter the OTP');
                        return;
                    }
                    setLoading(true);
                    const { error, user } = await verifyAdminLogin(trimmedEmail, otp);
                    setLoading(false);
                    if (error) throw new Error(error.message);

                    if (user?.role === 'ADMIN') {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/dashboard');
                    }
                    onClose();
                }
            } else {
                // Signup Flow
                if (signupStep === 1) {
                    await handleSendOtp();
                } else {
                    await handleSignup();
                }
            }
        } catch (err: any) {
            setLoading(false);
            setError(err.message || 'An error occurred');
        }
    };

    // UI Helpers
    const toggleMode = () => {
        setIsLogin(!isLogin);
        setSignupStep(1);
        setLoginStep(1);
        setError('');
        setOtp('');
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[4px]"
            onClick={handleBackdropClick}
        >
            {/* ... (Keep illustration div) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
            </div>

            <div
                ref={modalRef}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 relative animate-scale-in"
                style={{
                    animation: 'scale-up-center 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                <div className="absolute top-4 right-4">
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="text-left mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        {isLogin ? (loginStep === 1 ? 'Login' : 'Admin Verification') : (signupStep === 1 ? 'Sign Up' : 'Verify Email')}
                    </h2>

                </div>

                <div className="space-y-6">
                    {/* Google Login - Only show on Login or Signup Step 1 */}


                    <div className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* INPUT FIELDS */}
                        {((!isLogin && signupStep === 2) || (isLogin && loginStep === 2)) ? (
                            <div className="space-y-2 animate-fade-in-up">
                                <label className="text-sm font-medium text-slate-700">Enter OTP</label>
                                <Input
                                    type="text"
                                    placeholder="000 - 000"
                                    className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl px-4 text-center tracking-widest text-lg"
                                    value={otp}
                                    maxLength={6}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <p className="text-sm text-slate-500 text-center">
                                    We sent a code to <span className="font-medium text-slate-900">{email}</span>
                                </p>
                                <div className="text-center mt-2">
                                    {canResend ? (
                                        <button
                                            onClick={handleResendOtp}
                                            disabled={loading}
                                            className="text-sm text-emerald-600 font-semibold hover:underline"
                                        >
                                            Resend OTP
                                        </button>
                                    ) : (
                                        <span className="text-sm text-slate-400">
                                            Resend OTP in {resendTimer}s
                                        </span>
                                    )}
                                </div>
                                <button onClick={() => isLogin ? setLoginStep(1) : setSignupStep(1)} className="text-sm text-emerald-600 hover:underline w-full text-center mt-4">
                                    Change details
                                </button>
                            </div>
                        ) : (
                            // Standard Login/Signup Inputs
                            <>
                                {!isLogin && (
                                    <div className="space-y-2 animate-fade-in-up">
                                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                                        <Input
                                            type="text"
                                            placeholder="John Doe"
                                            className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl px-4"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="yourname@gmail.com"
                                        className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl px-4"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl px-4 pr-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {isLogin && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="keep-logged-in" className="border-slate-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 rounded-md" />
                                <label
                                    htmlFor="keep-logged-in"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                                >
                                    Keep me logged in
                                </label>
                            </div>
                            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-800 underline-offset-4 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    )}

                    <div className="text-center mb-4">
                        <p className="text-slate-500">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="text-emerald-500 hover:underline font-medium ml-1"
                                type="button"
                            >
                                {isLogin ? 'Signup' : 'Login'}
                            </button>
                        </p>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-12 bg-[#10b981] hover:bg-[#059669] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {isLogin ? (loginStep === 1 ? 'Signing In..' : 'Verifying...') : (signupStep === 1 ? 'Sending OTP...' : 'Verifying...')}
                            </>
                        ) : (
                            isLogin ? (loginStep === 1 ? 'Login' : 'Verify OTP') : (signupStep === 1 ? 'Verify Email' : 'Create Account')
                        )}
                    </Button>
                </div>
            </div>
            <style>{`
                @keyframes scale-up-center {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
