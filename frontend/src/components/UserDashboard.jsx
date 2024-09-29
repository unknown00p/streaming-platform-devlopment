import { useState } from 'react';
import SelectImage from '../subComponents/SelectImage';

function UserDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    avatar: null,
    coverImage: null,
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    currentPassword: '',
    newPassword: '',
  });

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', userData);
    setIsEditing(false);
  };

  const renderImagePreview = (image, alt, defaultText,className, ImagePreviewClassName) => (
    image ? (
      <img src={URL.createObjectURL(image)} alt={alt} className={ImagePreviewClassName} />
    ) : (
      <div className={className}>{defaultText}</div>
    )
  );

  return (
    <div className="mt-12 p-6 bg-[#111827] shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleEditToggle}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-[25%_75%]">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="avatar" className="block mb-1 text-sm font-medium text-gray-700">Update Avatar</label>
            <SelectImage
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              noImageText=""
              onChange={handleInputChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              ImagePreviewClassName="w-28 h-28 object-cover bg-slate-600 rounded-full shadow-md"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="coverImage" className="block mb-1 text-sm font-medium text-gray-700">Update Cover Image</label>
            <SelectImage
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              noImageText=""
              onChange={handleInputChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              ImagePreviewClassName="w-full h-40 object-cover bg-slate-600 rounded-md shadow-md"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="border text-black border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="border text-black border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="currentPassword" className="block mb-1 text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={userData.currentPassword}
              onChange={handleInputChange}
              className="border text-black border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleInputChange}
              className="border text-black border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded-md hover:bg-blue-700 transition duration-300">
              Update Profile
            </button>
          </div>
        </form>
      ) : (
        <div className="grid gap-6 sm:grid-cols-[20%_80%]">
          <div className="col-span-2 w-28 relative sm:col-span-1">
            <h3 className="block mb-1 text-sm font-medium text-gray-700">Avatar Image</h3>
            {renderImagePreview(userData.avatar, "Avatar", "", "w-full h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-500", "w-28 h-28 object-cover rounded-full")}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className="block mb-1 text-sm font-medium text-gray-700">Cover Image</h3>
            {renderImagePreview(userData.coverImage, "Cover", "", "w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500", "w-full h-40 object-cover rounded-md")}
          </div>

          <div className="col-span-2">
            <h3 className="block mb-1 text-sm font-medium text-gray-700">Full Name</h3>
            <p className="border border-gray-300 p-2 rounded-md">{userData.fullName}</p>
          </div>

          <div className="col-span-2">
            <h3 className="block mb-1 text-sm font-medium text-gray-700">Email</h3>
            <p className="border border-gray-300 p-2 rounded-md">{userData.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;