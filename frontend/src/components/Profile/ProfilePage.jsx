import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, createProfile } from '../../redux/actions/profileActions';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth); // Assume user data is in auth state
    const { profile, loading, error } = useSelector((state) => state.profile);
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(getProfile(user.userId));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (profile) {
            setBio(profile.bio || '');
            setAvatarUrl(profile.avatarUrl || '');
            setAvatarPreview(profile.avatarUrl || null);
            setIsCreating(!profile);
        }
    }, [profile]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarUrl(reader.result);
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = { userId: user.userId, bio, avatarUrl };

        if (isCreating) {
            dispatch(createProfile(profileData));
            toast.success('Profile created successfully!');
        } else {
            dispatch(updateProfile(profileData));
            toast.success('Profile updated successfully!');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{isCreating ? 'Create Profile' : 'Update Profile'}</h2>

            {/* Profile Information */}
            {profile && (
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-700">Current Profile</h3>
                    <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
                        <img
                            src={avatarPreview || 'https://via.placeholder.com/150'}
                            alt="Profile Avatar"
                            className="w-32 h-32 object-cover rounded-full shadow-lg"
                        />
                        <div>
                            <p className="text-gray-600">Bio: {profile.bio || 'No bio available'}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Update Profile Form */}
            <form onSubmit={handleSubmit}>
                {/* Avatar Upload */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        accept="image/*"
                    />
                    {avatarPreview && (
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="mt-4 w-32 h-32 object-cover rounded-full shadow-md"
                        />
                    )}
                </div>

                {/* Bio */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write something about yourself"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        rows="5"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300"
                >
                    {isCreating ? 'Create Profile' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
