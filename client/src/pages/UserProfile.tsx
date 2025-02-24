import styled from 'styled-components';
import UserIconImage from '/src/assets/user.svg';

import { useUserContext } from '../context/UserContext';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import { useUserService } from '../services/user.service';
import { formatDateCustom } from '../utils/date.utils';
import { User } from '../types/user.model';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--spacing-large);
  box-shadow: var(--shadow-elevation-medium);
  gap: var(--spacing-large);
`;


const UserProfileHeader = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  padding: var(--spacing-medium);
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-elevation-medium);
  justify-content: space-between;
  gap: var(--spacing-large);

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center;
    text-align: center;
    gap: var(--spacing-medium);
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 255, 0.3);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UserProfileStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfileStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: var(--spacing-medium);
  background-color: var(--background-color);
  border-radius: var(--border-radius-small);
  box-shadow: var(--shadow-elevation-medium);
`;

const UserProfileStatLabel = styled.span`
  font-size: var(--font-size-small);
  color: var(--font-color-muted);
`;

const UserProfileStatValue = styled.span`
  font-size: var(--font-size-medium);
  font-weight: bold;
  color: var(--color-gray-7);
`;

const UserProfileEvents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserProfileEvent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const UserProfileEventInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserProfileEventName = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const UserProfileEventDate = styled.span`
  font-size: 12px;
  color: #666;
`;

const Label = styled.label<{ required?: boolean }>`
  font-size: var(--font-size-medium);
  color: var(--font-color-gray-7);
  &::after {
    content: ${({ required }) => (required ? "' *'" : '')};
    color: var(--color-red);
    margin-left: 4px;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  min-width: 100%;

  &:focus {
    border-color: var(--color-blue);
  }
`;



const UserProfile = () => {
  const userService = useUserService();

  const { user, updateUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState<string>(UserIconImage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<Pick<User, 'username' | 'events'>>({
    username: '',
    events: [],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        events: user.events || [],
      });
      setUserImage(user.photoURL || UserIconImage);
    }
  }, [user]);


  useEffect(() => {
    return () => {
      if (userImage.startsWith('blob:')) {
        URL.revokeObjectURL(userImage);
      }
    };
  }, [userImage]);

  const handleSave = () => {
    handleUpdateProfile();
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let imageUrl = userImage;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('profileImage', selectedFile);
        const response = await userService.uploadProfileImage(formData);
        if (response.photoURL) {
          imageUrl = response.photoURL;
        } else {
          console.error('Error uploading profile image:', response);
        }
      }

      const updatedUser = await userService.updateProfile({
        username: userData.username,
        profileImage: imageUrl,
      });

      // Update both local state and context
      setUserData(prev => ({ ...prev, ...updatedUser }));
      updateUser(prev => prev ? { ...prev, ...updatedUser } : null);

      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
      setSelectedFile(file);
    }
  };


  return (
    <UserProfileContainer>
      <h2>User Profile</h2>
      <UserProfileHeader>
        <ProfileImageContainer onClick={() => fileInputRef.current?.click()}>
          <ProfileImage src={userImage} alt={userData.username} />
        </ProfileImageContainer>

        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <div>
            <>
              <Label>Username</Label>
              <Input
                placeholder="Enter username"
                value={userData.username}
                onChange={e =>
                  setUserData(prev => ({ ...prev, username: e.target.value }))
                }
              />
            </>
        </div>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </UserProfileHeader>

      {userData.events.length > 0 && (
        <UserProfileStats>
          <UserProfileStat>
            <UserProfileStatLabel>Events Inserted</UserProfileStatLabel>
            <UserProfileStatValue>{userData.events.length}</UserProfileStatValue>
          </UserProfileStat>
        </UserProfileStats>
      )}
    
      <UserProfileEvents>
        {userData.events.length > 0 ? (
          userData.events.map(event => (
            <UserProfileEvent key={event.id}>
              <UserProfileEventInfo>
                <UserProfileEventName>{event.name}</UserProfileEventName>
                <UserProfileEventDate>
                  {formatDateCustom(event.eventDate)}
                </UserProfileEventDate>
              </UserProfileEventInfo>
            </UserProfileEvent>
          ))
        ) : (
          <UserProfileEvent>
            <UserProfileEventInfo>
              <UserProfileEventName>No events to display</UserProfileEventName>
            </UserProfileEventInfo>
          </UserProfileEvent>
        )}
      </UserProfileEvents>
    </UserProfileContainer>
  );
};

export default UserProfile;
