import { useState, useEffect } from 'react';
import userDataStore from '../zustand/userData.js';
import { useForm } from 'react-hook-form';
import { currentUser, UpdateNameEmail, UpdateAvatar, UpdateCoverImage, changeCurrentPassword } from '../api/authentication/authApi.js';

function UserDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, watch } = useForm()
  const [mainData, setMainData] = useState(null)
  const [avatarSrc, setAvatarSrc] = useState('')
  const [coverImageSrc, setCoverImageSrc] = useState('')
  const [userData, setUserData] = useState({
    avatar: null,
    coverImage: null,
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    currentPassword: '',
    newPassword: '',
  });

  const avatar = watch('avatar')
  const coverImage = watch('coverImage')

  useEffect(() => {
    async function fetchData() {
      const response = await currentUser()
      setUserData(response.data.data)
      setMainData(response.data.data)
    }

    fetchData()
  }, []);

  useEffect(() => {
    if (avatar) {
      // console.log('avatar',avatar);
      renderImagePreview(avatar[0])
    } else if (coverImage) {
      // console.log('coverImage',coverImage);
      renderImagePreview(coverImage[0])
    }
  }, [avatar, coverImage])

  const handleInputChange = (e) => {
    const { name, value, type, file } = e.target;

    if (type === 'file') {
      setUserData(prevData => ({
        ...prevData,
        [name]: file[0],
      }));
    } else {
      setUserData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmitData = async (data) => {
    // // console.log('userData',userData);
    // // console.log('mainData',mainData);
    if (data.fullName !== mainData.fullName || data.email !== mainData.email) {
      // console.log('yes');
      const response = await UpdateNameEmail(data.fullName, data.email)
      // console.log("responseData", response);
    }
    if (data.avatar[0]) {
      const response = await UpdateAvatar(data.avatar[0])
      // console.log("responseData", response);
    }
    if (data.coverImage[0]) {
      const responseCover = await UpdateCoverImage(data.coverImage[0])
      // console.log("responseData", responseCover);
    }
    if (data.currentPassword && data.newPassword) {
      const response = await changeCurrentPassword({ oldPassword: data.currentPassword, newPassword: data.newPassword })
      // console.log(response);
    }
    setIsEditing(false);
  };

  const getImageSrc = (image) => {
    if (typeof image === 'string') {
      return image;
    } else if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return null;
  };

  const renderImagePreview = (image, alt, defaultText, className) => {
    const localSrc = '/images/coverImage.jpg'
    // console.log('localSrc',localSrc)
    const src = getImageSrc(image || localSrc);
    // // console.log('image',image);

    return src ? (
      <img src={src} alt={alt} className={className} />
    ) : (
      <div className={className}></div>
    );
  };

  return (
    <div className="mt-12 p-6 bg-[#111827] shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Profile</h2>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(handleSubmitData)} className="grid gap-6 sm:grid-cols-[30%_70%]">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="avatar" className="block mb-1 text-sm font-medium text-white">
              Update Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              {...register("avatar")}
              accept="image/*"
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {renderImagePreview(userData.avatar, "Avatar", "No Avatar", "mt-2 w-28 h-28 object-cover rounded-full bg-gray-600")}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="coverImage" className="block mb-1 text-sm font-medium text-white">
              Update Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              {...register("coverImage")}
              accept="image/*"
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {renderImagePreview(userData.coverImage, "Cover", "No Cover Image", "mt-2 w-full h-40 object-cover rounded-md bg-gray-600")}
          </div>
          {['fullName', 'email', 'currentPassword', 'newPassword'].map((field) => (
            <div key={field} className="col-span-2 sm:col-span-1">
              <label htmlFor={field} className="block mb-1 text-sm font-medium text-white">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field.includes('Password') ? 'password' : 'text'}
                id={field}
                name={field}
                value={userData[field]}
                {...register(field)}
                onChange={handleInputChange}
                className="border text-black border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!field.includes('Password')}
              />
            </div>
          ))}
          <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 w-full rounded-md hover:bg-blue-700 transition duration-300">
            Update Profile
          </button>
        </form>
      ) : (
        <div className="grid gap-6 sm:grid-cols-[30%_70%]">
          {renderImagePreview(userData.avatar, "Avatar", "No Avatar", "w-28 h-28 object-cover rounded-full bg-gray-600")}
          {renderImagePreview(userData.coverImage, "Cover", "No Cover Image", "w-full h-40 object-cover rounded-md bg-gray-600")}
          {['fullName', 'email'].map((field) => (
            <div key={field} className="col-span-2">
              <h3 className="block mb-1 text-sm font-medium text-white">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </h3>
              <p className="border border-gray-300 p-2 rounded-md text-white">{userData[field]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;