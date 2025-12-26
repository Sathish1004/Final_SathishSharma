import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">My Profile</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-6 mb-8">
                    <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200 text-3xl font-bold text-blue-700">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                        <p className="text-slate-500">{user?.email}</p>
                        <p className="text-slate-500 text-sm mt-1">Student</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <h3 className="font-semibold mb-2">Account Details</h3>
                        <p className="text-sm text-slate-600">Member since Dec 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
