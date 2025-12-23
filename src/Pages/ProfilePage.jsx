import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiCamera, FiMail } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { getUserProfile } from "../lib/auth";
import supabase from "../lib/supabase";

export const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // Fetch user profile logic here
      const { username, avatarUrl } = await getUserProfile(user.id);
      if (username) {
        setUsername(username);
        setAvatarUrl(avatarUrl);
        return;
      }

      setUsername(username);
      setAvatarUrl(avatarUrl);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB", {
          position: "right-top-center",
        });
        return;
      }
      console.log("file selected", file);
      setAvatar(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let updates = { username };
      // if file selected upload first
      if (avatar) {
        const fileExt = avatar.name.split(".").pop();
        const fileName =`${user.id}-${Math.random().toString(36).substring(2)}`
        const filePath = `avatars/${fileName}.${fileExt}`;
        // updates.avatar_url = filePath;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatar);
        if (uploadError) {
          throw uploadError;
        }
        // get uploaded image url
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        updates = { 
          ...updates,
          avatar_url: data.publicUrl 
        };

        setAvatarUrl(data.publicUrl);
        console.log("uploaded avatar url:", data.publicUrl);
      
      }
      

      console.log("updates to be applied:", updates);
      const { error , data}=await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .select("username, avatar_url")
      .single();
      if (error) {
        throw error;
      }
      if(data){
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Error updating profile. Please try again.", {
        position: "right-top-center",
      });
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      avatarUrl ||
                      `https://ui-avatars.com/api/?name=${username
                        ? username.charAt(0)
                        : "U"}&background=orange&color=fff&size=128`
                    }
                    alt="Profile Avatar"
                  />
                </div>
                {/* input image Upload  */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer transition-transform transform group-hover:scale-110"
                >
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <FiCamera className="w-5 h-5 text-orange-600" />
                </label>
              </div>
              {/* user Info */}
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-white">
                  {username || "User Profile"}
                </h2>
                <p className="text-orange-100">
                  {user.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>
          {/* profile form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-6">
              {/* username   */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3  flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              {/* Email Read only */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={user?.email || ""}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* Action Button*/}
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
