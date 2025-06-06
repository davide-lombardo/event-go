import styled from 'styled-components';

const FooterWrapper = styled.footer`
  margin-top: var(--25px);
  padding: var(--20px);
  text-align: center;
  width: 100%;
  background-color: var(--color-gray-8);
  color: var(--color-grey-1);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.small`
  font-size: var(--13px);
  margin-bottom: var(--13px);
  color: var(--color-gray-3);
`;

const LinksContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterText>&copy; {new Date().getFullYear()} EventGo. All rights reserved.</FooterText>

        <LinksContainer>
          <a href="/privacy-policy" style={{ margin: '0 var(--15px)', color: 'var(--color-gray-3)' }}>Privacy Policy</a>
          <a href="/terms-conditions" style={{ margin: '0 var(--15px)', color: 'var(--color-gray-3)' }}>Terms & Conditions</a>
          <a href="/about-us" style={{ margin: '0 var(--15px)', color: 'var(--color-gray-3)' }}>About Us</a>
        </LinksContainer>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;