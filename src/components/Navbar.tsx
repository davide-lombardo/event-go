import styled from 'styled-components';
import Button from './Button';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useRef, useState } from 'react';
import EventModal from './dialogs/AddEvent';
import { useEventContext } from '../context/EventContext';
import { useUserContext } from '../context/UserContext';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--20px);
  background-color: transparent;
  color: var(--color-gray-1);
`;

const Logo = styled.div`
  font-size: var(--30px);
  font-weight: bold;
  background-image: var(--gradient-primary);

  background-size: 100%;
  background-repeat: repeat;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--10px);
  align-items: center;
  position: relative;
`;

const UserProfileImage = styled.img`
  width: var(--40px);
  height: var(--40px);
  border-radius: 50%;
  margin-left: 10px;
  object-fit: cover;
  cursor: pointer;
`;

const Dropdown = styled.div<{ $show: boolean }>`
  position: absolute;
  top: var(--50px);
  right: 0;
  background-color: var(--color-gray-1);
  border: 1px solid var(--color-gray-2);
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  padding: var(--10px);
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  z-index: 10;
`;

const DropdownOption = styled.div`
  cursor: pointer;
  color: red;
  &:hover {
    background-color: var(--color-gray-1);
  }
`;

const WelcomeMessage = styled.div`
  font-size: 1rem;
  margin-bottom: var(--10px);
  color: var(--color-gray-6);
`;

const Nav = () => {
  const [user] = useAuthState(auth);
  const { signInWithGoogle, signOut } = useUserContext(); 

  const { fetchEvents } = useEventContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileImageClick = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSaveEvent = async () => {
    try {
      await fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <NavbarWrapper>
      <Logo>EventGo</Logo>

      <ButtonGroup>
        {user && (
          <Button onClick={handleOpenModal} variant={'transparent'}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              Add Event
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: '4px' }}
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
          </Button>
        )}

        {user ? (
          <>
            {user.photoURL && (
              <>
                <UserProfileImage
                  src={user?.photoURL || 'src/assets/user.svg'}
                  onError={(e) => (e.currentTarget.src = 'src/assets/user.svg')}
                  alt="User profile"
                  onClick={handleProfileImageClick}
                />
                <Dropdown $show={dropdownOpen} ref={dropdownRef}>
                  <WelcomeMessage>Welcome, {user.displayName}</WelcomeMessage>
                  <DropdownOption onClick={signOut}>Logout</DropdownOption>
                </Dropdown>
              </>
            )}
          </>
        ) : (
          <Button onClick={signInWithGoogle} variant={'primary'}>
            Sign In
          </Button>
        )}
      </ButtonGroup>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
      />
    </NavbarWrapper>
  );
};

export default Nav;
