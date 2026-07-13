import { useState, useEffect } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../components/PageTitle';
import BreadcrumbsNav from '../../components/Breadcrumbs';
import { useColorMode } from '../../ColorModeProvider';

const columns = [
  'ФИО',
  'Департамент',
  'Должность',
  'Подразделение',
  'Телефон',
  'Дата рождения',
];

const PAGE_SIZE = 10; // сколько работников показываем на одной странице

// Все стили страницы в одном месте, чтобы разметка оставалась чистой.
const styles = {
  page: { pb: 6, textAlign: 'left' },
  content: { mx: 4, mt: 3 },
  tableWrap: { overflowX: 'auto' },
  headerCell: { color: 'text.secondary', fontWeight: 500 },
  nowrap: { whiteSpace: 'nowrap' },
  unitCell: { maxWidth: 240 },
  actions: { display: 'flex', gap: 1, justifyContent: 'flex-end' },
  iconButton: { border: '1px solid', borderColor: 'divider', borderRadius: 1, color: 'primary.main' },
  pagination: { display: 'flex', justifyContent: 'center', mt: 3 },
  dialogFields: { pt: 1, width: { xs: '100%', sm: 360 } },
};

const Dictionary = () => {
  const { mode } = useColorMode();
  const [rows, setRows] = useState([]); // работники текущей страницы
  const [total, setTotal] = useState(0); // сколько всего работников в базе
  const [selected, setSelected] = useState([]); // id выбранных строк
  const [page, setPage] = useState(1); // текущая страница пагинации

  // Работник, которого редактируем (null — диалог закрыт), и поля формы.
  const [editRow, setEditRow] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' });

  // Подгружаем работников заново при каждой смене страницы —
  // так на каждой странице свои данные, а не одни и те же.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const skip = (page - 1) * PAGE_SIZE; // сколько записей пропустить
        const response = await fetch(
          `https://dummyjson.com/users?limit=${PAGE_SIZE}&skip=${skip}`
        );
        if (!response.ok) throw new Error('Сервер вернул ошибку');
        const data = await response.json();
        setRows(data.users);
        setTotal(data.total);
        setSelected([]); // сбрасываем выбор при переходе на другую страницу
      } catch (error) {
        // Сеть недоступна или сервер ответил ошибкой — показываем уведомление.
        toast.error('Не удалось загрузить список работников');
      }
    };

    fetchUsers();
  }, [page]);

  // Сколько всего страниц — считаем из общего числа работников.
  const pageCount = Math.ceil(total / PAGE_SIZE) || 1;

  const allSelected = rows.length > 0 && selected.length === rows.length;
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

  // Удаление работника: DELETE /users/{id}. При успехе убираем строку из rows.
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Сервер вернул ошибку');
      await response.json();
      setRows((prev) => prev.filter((row) => row.id !== id));
      toast.success('Работник удалён');
    } catch (error) {
      toast.error('Не удалось удалить работника');
    }
  };

  // Открыть диалог редактирования и заполнить форму текущими значениями.
  const openEdit = (row) => {
    setEditRow(row);
    setForm({ firstName: row.firstName, lastName: row.lastName, phone: row.phone });
  };

  const closeEdit = () => setEditRow(null);

  const handleFormChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // Сохранение изменений: PUT /users/{id}. При успехе обновляем строку в rows.
  const saveUser = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${editRow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Сервер вернул ошибку');
      const updated = await response.json();
      setRows((prev) =>
        prev.map((row) => (row.id === updated.id ? { ...row, ...updated } : row))
      );
      toast.success('Данные работника обновлены');
      closeEdit();
    } catch (error) {
      toast.error('Не удалось обновить данные работника');
    }
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
                  <TableCell sx={styles.nowrap}>
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell>{row.company?.department}</TableCell>
                  <TableCell>{row.company?.title}</TableCell>
                  <TableCell sx={styles.unitCell}>{row.company?.name}</TableCell>
                  <TableCell sx={styles.nowrap}>{row.phone}</TableCell>
                  <TableCell sx={styles.nowrap}>{row.birthDate}</TableCell>
                  <TableCell>
                    <Box sx={styles.actions}>
                      <IconButton
                        size="small"
                        sx={styles.iconButton}
                        aria-label="Редактировать"
                        onClick={() => openEdit(row)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={styles.iconButton}
                        aria-label="Удалить"
                        onClick={() => deleteUser(row.id)}
                      >
                        <DeleteOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Пагинация: каждая страница подгружает своих работников. */}
        <Box sx={styles.pagination}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
            shape="rounded"
            color="primary"
          />
        </Box>
      </Box>

      {/* Диалог редактирования работника. */}
      <Dialog open={Boolean(editRow)} onClose={closeEdit}>
        <DialogTitle>Редактирование работника</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={styles.dialogFields}>
            <TextField
              label="Имя"
              value={form.firstName}
              onChange={handleFormChange('firstName')}
              fullWidth
            />
            <TextField
              label="Фамилия"
              value={form.lastName}
              onChange={handleFormChange('lastName')}
              fullWidth
            />
            <TextField
              label="Телефон"
              value={form.phone}
              onChange={handleFormChange('phone')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit}>Отмена</Button>
          <Button variant="contained" onClick={saveUser}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Контейнер для всплывающих уведомлений (react-toastify). */}
      <ToastContainer position="top-right" theme={mode} />
    </Box>
  );
};

export default Dictionary;
