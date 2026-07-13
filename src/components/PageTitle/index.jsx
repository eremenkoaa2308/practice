import Typography from '@mui/material/Typography';

const PageTitle = ({ children }) => (
  <Typography variant="h4" sx={{ color: 'primary.main', ml: 4, mt: 3, fontWeight: 500 }}>
    {children}
  </Typography>
);

export default PageTitle;
