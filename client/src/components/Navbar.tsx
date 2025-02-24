import styled from 'styled-components';
import Button from './Button';
import { useEffect, useRef, useState } from 'react';
import EventModal from './dialogs/AddEvent';
import { useEventContext } from '../context/EventContext';
import { useUserContext } from '../context/UserContext';
import AuthModal from './dialogs/Authentication';
import { useUserService } from '../services/user.service';
import UserIcon from '/src/assets/user.svg';
import LogoutIcon from '/src/assets/log-out.svg';
import { Link } from 'react-router-dom';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--20px);
  background-color: transparent;
  color: var(--color-gray-1);

  @media (min-width: 1024px) {
    background: radial-gradient(ellipse at 50% 100px, rgba(250, 247, 244, 0.3), rgba(250, 247, 244, 1));
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-elevation-medium);
    border: 1px solid #faf7f4;
    transition: all 0.8s ease-in-out;
    margin-top: 3rem;
  }
`;

const Logo = styled.div`
  font-size: var(--25px);
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
  top: 50px;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  padding: 12px 0;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(-10px)')};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  z-index: 1000;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const DropdownOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Space between icon and text */
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: #eee;
  margin: 8px 0;
`;

const WelcomeMessage = styled.div`
  font-size: 14px;
  padding: 12px 16px;
  color: #555;
  font-weight: 600;
`;

const Nav = () => {
  const userService = useUserService();
  const { fetchEvents } = useEventContext();
  const { user, setUser } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenAuthModal = () => setIsAuthModalOpen(true);
  const handleCloseAuthModal = () => setIsAuthModalOpen(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleSignOut = async () => {
    await userService.signOut();
    setUser(null);
  };

  return (
    <NavbarWrapper>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Logo>EventGo</Logo>
      </Link>

      <ButtonGroup>
        {user && (
          <Button onClick={handleOpenModal} variant={'outline'}>
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
            <UserProfileImage
              src={user.photoURL || UserIcon}
              onError={e => (e.currentTarget.src = UserIcon)}
              alt="User profile"
              onClick={handleProfileImageClick}
            />
            <Dropdown $show={dropdownOpen} ref={dropdownRef}>
              <WelcomeMessage>
                Welcome, <b>{user.username}</b>
              </WelcomeMessage>

              <DropdownDivider />

              <DropdownOption>
                <StyledLink to="/user">
                  <img src={UserIcon} alt="user icon" />
                  Profile
                </StyledLink>
              </DropdownOption>

              <DropdownDivider />
              <DropdownOption onClick={handleSignOut}>
                <img src={LogoutIcon} alt="logout icon" />
                Logout
              </DropdownOption>
            </Dropdown>
          </>
        ) : (
          <Button onClick={handleOpenAuthModal} variant={'primary'}>
            Sign In
          </Button>
        )}
      </ButtonGroup>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onAuth={async (email, password, username, mode) => {
          try {
            let userData;
            if (mode === 'signin') {
              await userService.signIn(email, password);
              userData = await userService.getUserProfile(localStorage.getItem('token'));
            } else if (mode === 'signup') {
              await userService.signUp(username, email, password);
              userData = await userService.getUserProfile(localStorage.getItem('token'));
            }

            if (userData) {
              setUser(userData);
              handleCloseAuthModal();
            } else {
              console.error('User data not found.');
            }
          } catch (error) {
            console.error('Authentication error:', error);
          }
        }}
      />
    </NavbarWrapper>
  );
};

export default Nav;
