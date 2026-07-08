import Typography from '@mui/material/Typography';

// Единый заголовок страницы. Один стиль на все страницы —
// правим здесь, а не в пяти местах.
const PageTitle = ({ children }) => (
  <Typography variant="h4" sx={{ color: 'primary.main', ml: 4, mt: 3, fontWeight: 500 }}>
    {children}
  </Typography>
);

export default PageTitle;
