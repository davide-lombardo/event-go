import React from 'react';
import styled from 'styled-components';
import { UserIcon } from '../utils/icons.utils';

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserIconWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-8);

  svg {
    width: 100%;
    height: 100%;
  }
`;

const UserName = styled.span`
  font-size: 0.7rem;
  color: var(--font-color-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface UserAvatarProps {
  userName: string;
  userImage?: string;
  hideUsername?: boolean;
  forceDefaultIcon?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  userName, 
  userImage,
  hideUsername = false,
  forceDefaultIcon = false,
  className
}) => {
  return (
    <UserInfoContainer className={className}>
      <UserIconWrapper>
        {forceDefaultIcon || !userImage ? (
          <>{UserIcon}</>
        ) : (
          <img
            src={userImage}
            alt="User Avatar"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        )}
      </UserIconWrapper>
      {!hideUsername && <UserName title={userName}>@{userName}</UserName>}
    </UserInfoContainer>
  );
};

export default UserAvatar;
