import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { 
    handleGetCurrentUser,
    handleUpsertCurrentUser,
} from "@/lib/ProductService";
import { AuthContext } from "@/lib/firebase";
import LoadingSpinner from "@/components/molecules/LoadingSpinner";
import Swal from "sweetalert2";

const MyProfilePage = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);

    const [user, setUser] = useState(null);
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user);
            loadUserProfile();
          } else {
            navigate("/");
          }
        });
    
        return () => unsubscribe();
    }, [navigate, auth]);

    // Load user's profile
    const loadUserProfile = async () => {
        try {
            const userProfile = await handleGetCurrentUser();
            setUser(userProfile);
            setAddress(userProfile.address || "");
            setPhoneNumber(userProfile.phoneNumber || "");
        } catch (error) {
            console.error("Error fetching user profile: ", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle update user's profile
    const handleUpdateProfileClick = async () => {
        try {
            await handleUpsertCurrentUser(user.username, address, phoneNumber);
            
            // Show success message with SweetAlert2
            Swal.fire({
                title: 'Profile updated successfully!',
                text: 'Your profile has been updated successfully.',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
                confirmButtonColor: '#f87171',
            });
        } catch (error) {
            console.error("Error updating profile: ", error);
            alert("Failed to update profile.");
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!user) return <p>User not found.</p>

    return (
        <div className="container mx-auto p-4 bg-white min-h-screen text-black">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Welcome back, {user.username}
            </h1>
            <p className="text-xl mb-4"><strong>Display Name:</strong> {authUser.displayName || "N/A"}</p>
            
            <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2" htmlFor="address">
                        Address:
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter your address here..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2" htmlFor="phoneNumber">
                        Phone Number:
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        placeholder="Enter your phone number here..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <button
                        onClick={handleUpdateProfileClick}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-500"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyProfilePage;