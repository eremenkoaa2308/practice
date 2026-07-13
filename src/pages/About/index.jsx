import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageTitle from '../../components/PageTitle';
import BreadcrumbsNav from '../../components/Breadcrumbs';

const sections = [
  {
    title: 'История компании',
    content:
      'С другой стороны, базовый вектор развития создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса форм воздействия. Вот вам яркий пример современных тенденций — начало повседневной работы по формированию позиции в значительной степени обусловливает важность направлений прогрессивного развития. Идейные соображения высшего порядка, а также повышение уровня гражданского сознания не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения.',
  },
  {
    title: 'Организационная структура',
    content:
      'Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности играет важную роль в формировании существующих финансовых и административных условий. Разбавленное изрядной долей эмпатии, рациональное мышление предполагает изучение системы обучения кадров, соответствующей насущным потребностям.',
  },
  {
    title: 'Должностные обязанности',
    content:
      'Равным образом консультация с широким активом позволяет оценить значение соответствующих условий активизации. Не следует, однако забывать, что укрепление и развитие структуры играет важную роль в формировании модели развития.',
  },
  {
    title: 'Юридические риски',
    content:
      'Товарищи! реализация намеченных плановых заданий требует определения и уточнения существенных финансовых и административных условий. С другой стороны, дальнейшее развитие различных форм деятельности играет важную роль в формировании направлений прогрессивного развития.',
  },
  {
    title: 'Контакты',
    content:
      'Адрес: г. Москва, ул. Примерная, д. 1. Телефон: +7 (495) 000-00-00. Email: info@company.ru. Режим работы: пн–пт, 9:00–18:00.',
  },
];

const styles = {
  page: { pb: 6, textAlign: 'left' },
  list: { mx: 4, mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 },
  accordion: {
    bgcolor: 'panel.main',
    borderRadius: '8px !important',
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
    '&:before': { display: 'none' },
  },
  summary: { px: 3, py: 0.5 },
  summaryIcon: { color: 'primary.main' },
  title: { fontWeight: 400 },
  details: { px: 3, pb: 3 },
  detailsText: { color: 'text.secondary' },
};

const About = () => {
  return (
    <Box sx={styles.page}>
      <PageTitle>О Компании</PageTitle>

      <BreadcrumbsNav />

      <Box sx={styles.list}>
        {sections.map((section, index) => (
          <Accordion
            key={section.title}
            defaultExpanded={index === 0}
            disableGutters
            elevation={0}
            sx={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={styles.summaryIcon} />}
              sx={styles.summary}
            >
              <Typography variant="h6" sx={styles.title}>
                {section.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={styles.details}>
              <Typography variant="body2" sx={styles.detailsText}>
                {section.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default About;
