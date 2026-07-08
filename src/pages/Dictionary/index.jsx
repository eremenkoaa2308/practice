import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PageTitle from '../../components/PageTitle';
import BreadcrumbsNav from '../../components/Breadcrumbs';

const unit = 'Центр оперативного управления и мониторинга ресурсов';

// Пока данные тестовые и одинаковые. Позже сюда подставятся реальные из API.
const rows = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  name: 'Гослинг Райан Сергеевич',
  department: 'Департамент управления',
  position: index === 0 ? 'Начальник отдела' : 'Заместитель начальника',
  unit,
  phone: '+7 (963) 333 33 33',
  date: '07.02.2020',
}));

const columns = [
  'ФИО',
  'Департамент',
  'Должность',
  'Подразделение',
  'Телефон',
  'Дата работы в должности',
];

// Все стили страницы в одном месте, чтобы разметка оставалась чистой.
const styles = {
  page: { pb: 6, textAlign: 'left' },
  content: { mx: 4, mt: 3 },
  tableWrap: { overflowX: 'auto' },
  headerCell: { color: 'text.secondary', fontWeight: 500 },
  nowrap: { whiteSpace: 'nowrap' },
  unitCell: { maxWidth: 240 },
  actions: { display: 'flex', gap: 1, justifyContent: 'flex-end' },
  iconButton: { border: '1px solid #cfd8e3', borderRadius: 1, color: 'primary.main' },
  pagination: { display: 'flex', justifyContent: 'center', mt: 3 },
};

const Dictionary = () => {
  const [selected, setSelected] = useState([]); // id выбранных строк
  const [page, setPage] = useState(1); // текущая страница пагинации

  const allSelected = selected.length === rows.length;
  const someSelected = selected.length > 0 && !allSelected;

  // Галочка в шапке — выделить/снять все строки.
  const toggleAll = (event) => {
    setSelected(event.target.checked ? rows.map((row) => row.id) : []);
  };

  // Галочка в строке — добавить/убрать одну строку из выбранных.
  const toggleOne = (id) => () => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={styles.page}>
      <PageTitle>Справочник работников</PageTitle>

      <BreadcrumbsNav />

      <Box sx={styles.content}>
        <TableContainer sx={styles.tableWrap}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column} sx={styles.headerCell}>
                    {column}
                  </TableCell>
                ))}
                {/* Пустая ячейка над колонкой с кнопками. */}
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover selected={selected.includes(row.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected.includes(row.id)} onChange={toggleOne(row.id)} />
                  </TableCell>
                  <TableCell sx={styles.nowrap}>{row.name}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell sx={styles.unitCell}>{row.unit}</TableCell>
                  <TableCell sx={styles.nowrap}>{row.phone}</TableCell>
                  <TableCell sx={styles.nowrap}>{row.date}</TableCell>
                  <TableCell>
                    {/* Кнопки пока без действий — редактирование и удаление сделаем позже. */}
                    <Box sx={styles.actions}>
                      <IconButton size="small" sx={styles.iconButton}>
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={styles.iconButton}>
                        <DeleteOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Пагинация. Пока просто показываем страницы, данные не меняются. */}
        <Box sx={styles.pagination}>
          <Pagination
            count={12}
            page={page}
            onChange={(event, value) => setPage(value)}
            shape="rounded"
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dictionary;
