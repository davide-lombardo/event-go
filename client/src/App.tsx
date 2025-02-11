import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import { createGlobalStyle } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { EventProvider } from './context/EventContext';
import { UserProvider } from './context/UserContext';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

const GlobalStyle = createGlobalStyle`
:root {
  /* COLORS */

  /* Grey shades */
  --color-gray-0: #f9f9f9;
  --color-gray-05: #f6f6f6;
  --color-gray-1: #eee;
  --color-gray-2: #e6e6e6;
  --color-gray-3: #ccc;
  --color-gray-4: #bbb;
  --color-gray-5: #999;
  --color-gray-6: #575757;
  --color-gray-65: #525252;
  --color-gray-7: #2c2c2c;
  --color-gray-8: #252525;
  --color-gray-9: #1f1f1f;
  --color-gray-10: #181818;

  /* Misc colors */
  --color-white: #FFFFFF;
  --color-red: #FE436C;
  --color-orange: #ff7e22;
  --color-yellow: #fca62a;
  --color-light-yellow: #F6EB61;
  --color-pink: #f57ad0;
  --color-lavender: #a180f9;
  --color-violet: #ff75f8;
  --color-blue: #59abf7;
  --color-purple: #673ece;
  --color-indigo: #4e5dff;
  --color-indigo-dark: #431dee;
  --color-indigo-light: #a6aaff;
  --color-indigo-muted: #f1f2fd;
  --color-category-link: #dd4eb2;
  --color-highlight: var(--color-yellow);

  /* Primary colors */
  --color-primary: var(--color-red);
  --color-primary-light: var(--color-green-light);
  --color-primary-dark: var(--color-green-medium);
  --color-primary-muted: var(--color-indigo-muted);

  --gradient-primary: linear-gradient(
    45deg,
    hsl(347deg 99% 63%) 0%,
    hsl(339deg 95% 62%) 6%,
    hsl(332deg 91% 61%) 13%,
    hsl(324deg 87% 60%) 20%,
    hsl(317deg 84% 60%) 28%,
    hsl(309deg 80% 59%) 37%,
    hsl(302deg 77% 58%) 45%,
    hsl(294deg 74% 57%) 54%,
    hsl(287deg 71% 56%) 63%,
    hsl(280deg 68% 55%) 73%,
    hsl(272deg 65% 54%) 82%,
    hsl(265deg 62% 53%) 91%,
    hsl(257deg 60% 53%) 100%
  );

  /* Borders */
  --border-color: var(--color-blue-light);
  --border-color-hover: var(--color-primary-dark);
  --border-radius: 12px;

  /* Background colors */
  --background-color: var(--color-white);
  --card-background-color: var(--color-grey-7);

  /* Links and Misc */
  --color-link: var(--color-green-light);
  --color-link-hover: var(--color-green-medium);
  --scrollbar-color: var(--color-blue-light);
  --scrollbar-track: var(--color-blue-medium);


  /* SHADOWS */

  /* Box Shadow */
  --shadow-color-hex: var(--color-gray-8);

  --shadow-elevation-low: 
    0.4px 0.5px 0.7px rgba(var(--shadow-color-hex), 0.33),
    0.7px 0.8px 1.2px -1.2px rgba(var(--shadow-color-hex), 0.33),
    1.6px 1.8px 2.7px -2.5px rgba(var(--shadow-color-hex), 0.33);

  --shadow-elevation-medium: 
    0.4px 0.5px 0.7px rgba(var(--shadow-color-hex), 0.34),
    1.3px 1.5px 2.2px -0.8px rgba(var(--shadow-color-hex), 0.34),
    3.4px 3.8px 5.7px -1.7px rgba(var(--shadow-color-hex), 0.34),
    8.1px 9.2px 13.8px -2.5px rgba(var(--shadow-color-hex), 0.34);

  --shadow-elevation-high: 
    0.4px 0.5px 0.7px rgba(var(--shadow-color-hex), 0.36),
    2.6px 3px 4.5px -0.4px rgba(var(--shadow-color-hex), 0.36),
    5.1px 5.8px 8.7px -0.8px rgba(var(--shadow-color-hex), 0.36),
    9px 10.2px 15.3px -1.2px rgba(var(--shadow-color-hex), 0.36),
    15.3px 17.3px 26px -1.7px rgba(var(--shadow-color-hex), 0.36),
    25.2px 28.4px 42.7px -2.1px rgba(var(--shadow-color-hex), 0.36),
    39.7px 44.8px 67.3px -2.5px rgba(var(--shadow-color-hex), 0.36);

  /* FONTS */

  /* Font colors */
  --font-color-base: var(--color-gray-1);
  --font-color-muted: var(--color-gray-5);
  --font-color-heading: var(--color-blue-very-light);
  --font-color-bright: var(--color-gray-1);

  /* Button colors */
  --button-border-color: var(--color-gray-4);
  --button-border-color-hover: var(--color-gray-5);
  --button-background-color: var(--color-blue-light);
  --button-font-color: var(--color-primary);

  /* SIZES */
  --border-radius: 12px;
  --border-radius-small: 8px;

  --spacing-small: 8px;
  --spacing-medium: 12px;
  --spacing-large: 24px;

  --content-width: 860px;
  --content-width-small: 560px;
  --content-width-medium: 700px;
  --navbar-height-small: 60px;

  /* Font Sizes */
  --font-size-small: 0.8rem;
  --font-size-medium: 1rem;

  /* Breakpoints */
  --breakpoint-small: 700px;
  --breakpoint-medium: 900px;
  --breakpoint-medium-lg: 1024px;
  --breakpoint-large: 1200px;
  --breakpoint-xlarge: 1600px;

}
`;

function App() {
  return (
    <UserProvider>
      <EventProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Layout>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
               {/* Protect /user route */}
  <Route element={<ProtectedRoute />}>
    <Route path="/user" element={<UserProfile />} />
  </Route>
              {/* <Route path="/user" element={<UserProfile />} /> */}
            </Routes>
          </Layout>
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </BrowserRouter>
      </EventProvider>
    </UserProvider>
  );
}

export default App;
