import { style, globalStyle } from '@vanilla-extract/css';

export const kioskContainer = style({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  flexDirection: 'column'
});

export const dialogCSS = style ({
  padding: 0,
  border: "none",
  borderRadius: '20px',
})

globalStyle(`${dialogCSS}::backdrop`, {
  backgroundColor: "rgba(0,0,0,0.6)", // 예시
  backdropFilter: "blur(4px)",        // 예시
});

export const welcomeContainer = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  color: 'white',
  textAlign: 'center',
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  
});

export const welcomeTitle = style({
  fontSize: '3rem',
  fontWeight: '700',
  marginBottom: '1.5rem',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
});

export const welcomeSubtitle = style({
  fontSize: '1.5rem',
  marginBottom: '2rem',
  lineHeight: '1.6',
  maxWidth: '600px',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
});

export const startButton = style({
  padding: '1.2rem 2.4rem',
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#764ba2',
  background: 'white',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
  },

  ':active': {
    transform: 'translateY(0)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
});

export const kioskHeader = style({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  padding: '20px',
  boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
});

export const headerTitle = style({
  margin: '0 0 20px 0',
  color: '#333',
  fontSize: '2.5rem',
  textAlign: 'center',
  fontWeight: '700',
});

export const categoryTabs = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  flexWrap: 'wrap',
});

export const categoryButton = style({
  padding: '12px 24px',
  border: '2px solid #667eea',
  background: 'white',
  color: '#667eea',
  borderRadius: '25px',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minWidth: '100px',
  
  ':hover': {
    background: '#667eea',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
});

export const categoryButtonActive = style({
  background: '#667eea',
  color: 'white',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
});

export const kioskContent = style({
  flex: '1',
  display: 'flex',
  gap: '20px',
  padding: '20px',
  overflow: 'hidden',
});

export const mainContent = style({
  flex: '1',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '20px',
  padding: '20px',
  overflowY: 'auto',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
});

export const kioskSidebar = style({
  width: '400px',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
});
