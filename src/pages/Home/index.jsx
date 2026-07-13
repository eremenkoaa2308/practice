import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PageTitle from '../../components/PageTitle';
import BreadcrumbsNav from '../../components/Breadcrumbs';
import pipelineImg from '../../assets/1.jpg';

const description =
  'В частности, экономическая повестка сегодняшнего дня предопределяет высокую востребованность стандартных подходов. Как принято считать, стремящиеся вытеснить традиционное производство, нанотехнологии, инициированные исключительно синтетически, функционально разнесены на независимые элементы.';

const cards = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  title: 'Трубопровод',
  description,
}));

const styles = {
  page: { pb: 6, textAlign: 'left' },
  grid: {
    mx: 4,
    mt: 3,
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
    gap: 3,
  },
  card: { bgcolor: 'panel.main', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  cardTitle: { fontWeight: 700, color: 'text.primary', mb: 1 },
  cardText: { color: 'text.secondary' },
  actions: { px: 2, pb: 2 },
  actionButton: { color: 'primary.main' },
};

const Home = () => {
  return (
    <Box sx={styles.page}>
      <PageTitle>Справочник работников</PageTitle>

      <BreadcrumbsNav />
      <Box sx={styles.grid}>
        {cards.map((card) => (
          <Card key={card.id} elevation={0} sx={styles.card}>
            <CardMedia component="img" height="180" image={pipelineImg} alt={card.title} />
            <CardContent>
              <Typography variant="h6" sx={styles.cardTitle}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={styles.cardText}>
                {card.description}
              </Typography>
            </CardContent>
            <CardActions sx={styles.actions}>
              <Button size="small" sx={styles.actionButton}>
                Поделиться
              </Button>
              <Button size="small" sx={styles.actionButton}>
                Подробнее
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
