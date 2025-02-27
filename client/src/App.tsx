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
import NotFound from './pages/NotFound';

const GlobalStyle = createGlobalStyle`
:root {
  /* COLORS */
  --color-primary: #D63384;
  --color-primary-dark: #9B287B;
  --color-danger: var(--color-red);
  --color-success: var(--color-green-light);
  --color-warning: var(--color-orange);

  /* Grey shades */
  --color-gray-0: #f9f9f9;
  --color-gray-05: #f6f6f6;
  --color-gray-1: #eee;
  --color-gray-2: #e6e6e6;
  --color-gray-3: #ccc;
  --color-gray-4: #ddd;
  --color-gray-5: #aaa; 
  --color-gray-6: #575757;
  --color-gray-65: #525252;
  --color-gray-7: #777; 
  --color-gray-75: #2c2c2c;
  --color-gray-8: #252525;
  --color-gray-9: #1f1f1f;
  --color-gray-10: #181818;

  /* Misc colors */
  --color-white: #FFFFFF;
  --color-red: #FE436C;
  --color-orange: #ff7e22;
  --color-green-light: #00d1b2;
  --color-yellow: #fca62a;
  --color-pink: #f57ad0;
  --color-purple: #673ece;

  /* Category Colors */
  --color-category-music: #FF6347;
  --color-category-sports: #1E90FF;
  --color-category-art: #8A2BE2;
  --color-category-education: #FF4500;
  --color-category-health: #32CD32;
  --color-category-business: #dcbb00;
  --color-category-tech: #800080;

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
  --border-radius: 12px;
  --border-radius-sm: 6px;

  /* Background colors */
  --background-color: var(--color-white);
  --card-background-color: rgba(0, 0, 0, 0.5);

  /* SHADOWS */
  --shadow-color: 30deg 3% 59%;

  --shadow-elevation-low:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);

  --shadow-elevation-medium:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);

  --shadow-elevation-high:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    1.5px 2.9px 3.7px -0.4px hsl(var(--shadow-color) / 0.34),
    2.7px 5.4px 6.8px -0.7px hsl(var(--shadow-color) / 0.34),
    4.5px 8.9px 11.2px -1.1px hsl(var(--shadow-color) / 0.34),
    7.1px 14.3px 18px -1.4px hsl(var(--shadow-color) / 0.34),
    11.2px 22.3px 28.1px -1.8px hsl(var(--shadow-color) / 0.34),
    17px 33.9px 42.7px -2.1px hsl(var(--shadow-color) / 0.34),
    25px 50px 62.9px -2.5px hsl(var(--shadow-color) / 0.34);
;

  /* FONTS */

  /* Font colors */
  --font-color-base: var(--color-gray-10);
  --font-color-muted: var(--color-gray-6);

  /* SIZES */

  --spacing-small: 8px;
  --spacing-medium: 12px;
  --spacing-large: 24px;

  --content-width: 860px;
  --content-width-small: 560px;
  --content-width-medium: 700px;

  /* Font Sizes */
  --font-size-small: 0.8rem;
  --font-size-medium: 1rem;
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
              <Route path="*" element={<NotFound />} />
              {/* <Route element={<ProtectedRoute />}>
                <Route path="/user" element={<UserProfile />} />
              </Route> */}
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
