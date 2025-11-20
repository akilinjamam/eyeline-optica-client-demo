'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { User, Mail, Phone, Video, FileText } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

interface DecodedUser {
  name?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  exp?: number;
}

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded: DecodedUser = jwtDecode(token);

      // Token expiration check
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      setUser(decoded);
    } catch (err) {
      console.error('Invalid token:', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  
  const handleVideo = () => {
    
    const getSlotData = localStorage.getItem('appointmentData');
    if(!getSlotData) return;
    const parsedData = JSON.parse(getSlotData);
    
    if(parsedData?.patientId){
      router.push('/videoConsult')
    }else{
      toast.error("please book a slot first")
    }

  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <ToastContainer/>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all hover:shadow-2xl">
        
        {/* Profile Header */}
        <div className="relative bg-blue-500 h-36 flex items-center justify-center">
          <div className="absolute -bottom-12 w-28 h-28 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center shadow-md">
            <User className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 pb-8 px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{user.name || 'No Name'}</h2>
          <p className="text-gray-500 text-sm mt-1">{user.email || 'No Email Provided'}</p>

          <div className="mt-6 space-y-4 text-left">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="text-blue-600 w-5 h-5" />
              <span className="text-gray-700 text-sm font-medium">
                {user.phoneNumber || 'No Phone Number'}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="text-blue-600 w-5 h-5" />
              <span className="text-gray-700 text-sm font-medium">
                {user.email || 'No Email Provided'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">

            {/* Video Call Button */}
            <button
              onClick={handleVideo}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
            >
              <Video className="w-5 h-5" />
              Video Call with Doctor
            </button>

            {/* Prescription Button */}
            <button
              onClick={() => router.push('/prescription')}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              View Prescription
            </button>

          </div>

          {/* Log Out Button */}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
