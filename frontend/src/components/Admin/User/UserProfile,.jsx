import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../../redux/actions/userActions';

const UserProfile = ({ match }) => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserProfile(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading profile</p>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-teal-600 mb-8">{profile.username}'s Profile</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Bio</h2>
                        <p>{profile.bio}</p>
                    </div>

                    {/* Projects Created */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Projects Created</h2>
                        <ul>
                            {profile.projects.map((project) => (
                                <li key={project.id} className="border-t border-gray-200 py-2">{project.title}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contributions */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Contributions</h2>
                        <ul>
                            {profile.contributions.map((contribution) => (
                                <li key={contribution.id} className="border-t border-gray-200 py-2">
                                    Donated {contribution.amount} to {contribution.project.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;
