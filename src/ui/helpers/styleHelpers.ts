export const thinScrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '0',
    height: '0',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey',
  },
};

export const absCenter: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};

export const inlineIconStyle: React.CSSProperties = {
  position: 'relative',
  top: '.225em',
  marginRight: 8,
};
