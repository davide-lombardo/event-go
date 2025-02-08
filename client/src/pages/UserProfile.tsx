import styled from 'styled-components';
import UserIconImage from '/src/assets/user.svg';

import { useUserContext } from '../context/UserContext';
import { useState } from 'react';
import Button from '../components/Button';
import { EventData } from '../types/event.model';

const UserProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  margin: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  gap: 2rem;
`;

const UserProfileHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  &:hover {
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

const UserProfileStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserProfileStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfileStatLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const UserProfileStatValue = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: hsl(347deg 99% 63%);
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

const UserProfileEventImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
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
  font-size: 1rem;
  color: black;
  &::after {
    content: ${({ required }) => (required ? "' *'" : '')};
    color: red;
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
  const { user } = useUserContext();

  const [isEditing, setIsEditing] = useState(false);
  const [userImage, setUserImage] = useState(UserIconImage);
  const [userData, setUserData] = useState({
    username: user?.username || '',
    events: [] as EventData[],
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  return (
    <UserProfileContainer>
      <UserProfileHeader>
        <ProfileImageContainer
          onClick={() => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput) fileInput.click();
          }}
        >
          <ProfileImage src={userImage} alt={userData.username} />
        </ProfileImageContainer>

        <HiddenFileInput
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div>
          {isEditing ? (
            <>
              <Label>Username</Label>
              <Input
                placeholder="Enter username"
                value={userData.username}
                onChange={e =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </>
          ) : (
            <h2>@{userData.username}</h2>
          )}
        </div>

        <Button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</Button>
      </UserProfileHeader>
      <UserProfileStats>
        <UserProfileStat>
          <UserProfileStatLabel>Events Inserted</UserProfileStatLabel>
          <UserProfileStatValue>{userData.events.length}</UserProfileStatValue>
        </UserProfileStat>
      </UserProfileStats>
      <UserProfileEvents>
        {userData.events.length > 0 ? (
          userData.events.map(event => (
            <UserProfileEvent key={event.id}>
              <UserProfileEventImage src={UserIconImage} alt={event.name} />
              <UserProfileEventInfo>
                <UserProfileEventName>{event.name}</UserProfileEventName>
                <UserProfileEventDate>{event.eventDate}</UserProfileEventDate>
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
