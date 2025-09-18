import { style } from '@vanilla-extract/css';

export const menuGridContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  padding: '10px',
});
