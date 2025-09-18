import { style } from '@vanilla-extract/css';

export const orderSummaryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const orderSummaryTitle = style({
  margin: '0 0 20px 0',
  color: '#333',
  fontSize: '1.5rem',
  fontWeight: '600',
  textAlign: 'center',
});

export const orderItemsContainer = style({
  flex: '1',
  overflowY: 'auto',
  marginBottom: '20px',
});

export const orderItemCard = style({
  background: '#f8f9fa',
  borderRadius: '10px',
  padding: '15px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const itemInfo = style({
  flex: '1',
});

export const itemName = style({
  margin: '0 0 5px 0',
  color: '#333',
  fontSize: '1rem',
});

export const itemPrice = style({
  margin: '0',
  color: '#667eea',
  fontWeight: '600',
});

export const quantityControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const quantityBtn = style({
  width: '30px',
  height: '30px',
  border: '1px solid #ddd',
  background: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'all 0.2s ease',
  
  ':hover': {
    background: '#667eea',
    color: 'white',
    borderColor: '#667eea',
  },
});

export const quantity = style({
  minWidth: '20px',
  textAlign: 'center',
  fontWeight: '600',
});

export const removeBtn = style({
  padding: '5px 10px',
  background: '#ff4757',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'all 0.2s ease',
  
  ':hover': {
    background: '#ff3742',
  },
});

export const orderTotal = style({
  background: '#667eea',
  color: 'white',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '20px',
});

export const totalInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.2rem',
  fontWeight: '600',
});

export const totalAmountText = style({
  fontSize: '1.4rem',
  color: '#2ecc71',
  fontWeight: '700'
});

export const orderButton = style({
  width: '100%',
  padding: '15px',
  background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1.2rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
  },
  
  ':active': {
    transform: 'translateY(0)',
  },
});

export const emptyOrder = style({
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#999',
  fontSize: '1.1rem',
});
