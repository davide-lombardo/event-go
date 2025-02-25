import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthModal from '../../components/dialogs/Authentication';


// Mock the Button and Input components
vi.mock('../../components/shared/Button.tsx', () => ({
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('../../components/shared/Input.tsx', () => ({
  default: ({ ...props }: any) => <input {...props} />,
}));

describe('AuthModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnAuth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // it('renders the modal when isOpen is true', () => {
  //   render(
  //     <AuthModal
  //       isOpen={true}
  //       onClose={mockOnClose}
  //       onAuth={mockOnAuth}
  //     />
  //   );

  //   expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  // });

  // it('does not render the modal when isOpen is false', () => {
  //   render(
  //     <AuthModal
  //       isOpen={false}
  //       onClose={mockOnClose}
  //       onAuth={mockOnAuth}
  //     />
  //   );

  //   expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  // });

  // it('switches between signin and signup modes', () => {
  //   render(
  //     <AuthModal
  //       isOpen={true}
  //       onClose={mockOnClose}
  //       onAuth={mockOnAuth}
  //     />
  //   );

  //   // Initially in signin mode
  //   expect(screen.getByText(/sign in/i)).toBeInTheDocument();

  //   // Switch to signup mode
  //   const switchToSignUp = screen.getByText(/don't have an account/i);
  //   fireEvent.click(switchToSignUp);

  //   expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();

  //   // Switch back to signin mode
  //   const switchToSignIn = screen.getByText(/already have an account/i);
  //   fireEvent.click(switchToSignIn);

  //   expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  // });

  // it('updates email, password, and username inputs', () => {
  //   render(
  //     <AuthModal
  //       isOpen={true}
  //       onClose={mockOnClose}
  //       onAuth={mockOnAuth}
  //     />
  //   );
    
  //   const emailInput = screen.getByPlaceholderText(/email/i);
  //   const passwordInput = screen.getByPlaceholderText(/password/i);

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });

  //   expect(emailInput).toHaveValue('test@example.com');
  //   expect(passwordInput).toHaveValue('password123');

  //   // Switch to signup mode and test username input
  //   const switchToSignUp = screen.getByText(/don't have an account/i);
  //   fireEvent.click(switchToSignUp);

  //   const usernameInput = screen.getByPlaceholderText(/username/i);
  //   fireEvent.change(usernameInput, { target: { value: 'testuser' } });

  //   expect(usernameInput).toHaveValue('testuser');
  // });

  // it('toggles password visibility', () => {
  //   render(
  //     <AuthModal
  //       isOpen={true}
  //       onClose={mockOnClose}
  //       onAuth={mockOnAuth}
  //     />
  //   );

  //   const passwordInput = screen.getByPlaceholderText(/password/i);
  //   const togglePasswordIcon = screen.getByRole('button', { name: '' });

  //   // Password should be hidden by default
  //   expect(passwordInput).toHaveAttribute('type', 'password');

  //   // Toggle password visibility
  //   fireEvent.click(togglePasswordIcon);
  //   expect(passwordInput).toHaveAttribute('type', 'text');

  //   // Toggle back to hidden
  //   fireEvent.click(togglePasswordIcon);
  //   expect(passwordInput).toHaveAttribute('type', 'password');
  // });

  it('submits the form with valid inputs', async () => {
    render(
      <AuthModal
        isOpen={true}
        onClose={mockOnClose}
        onAuth={mockOnAuth}
      />
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnAuth).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        '',
        'signin'
      );
    });
  });

  // it('displays validation errors for invalid inputs', async () => {
  //   render(
  //     <AuthModal
  //       isOpen={true}
  //       onClose={mockOnClose}
  //       onAuth={mockOnAuth}
  //     />
  //   );
  
  //   const emailInput = screen.getByPlaceholderText(/email/i);
  //   const passwordInput = screen.getByPlaceholderText(/password/i);
  //   const submitButton = screen.getByRole('button', { name: /sign in/i });
  
  //   // Test invalid email
  //   fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  //   fireEvent.change(passwordInput, { target: { value: 'pass' } });
  //   fireEvent.click(submitButton);
  
  //   await waitFor(() => {
  //     expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  //     expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  //   });
  // });

  it('calls onClose when the close button is clicked', () => {
    render(
      <AuthModal
        isOpen={true}
        onClose={mockOnClose}
        onAuth={mockOnAuth}
      />
    );

    const closeButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});