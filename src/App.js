import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import UserTable from './components/UserTable';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import ColumnVisibilityToggle from './components/ColumnVisibilityToggle';
import useDebounce from './hooks/useDebounce';
import './styles/App.css';
import { Dashboard, People, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';


function App() {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]); // first fetch order
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [theme, setTheme] = useState('dark');
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    company: true,
    phone: true,
    website: true,
    address: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  

  const searchInputRef = useRef(null);

  // Fetch users
  const fetchUsers = useCallback(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setOriginalUsers(data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const debouncedSearch = useDebounce(search, 300);

  
  const filteredUsers = useMemo(() => {
    return originalUsers.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [originalUsers, debouncedSearch]);

  
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === "reset") {
      return filteredUsers; 
    }

    return [...filteredUsers].sort((a, b) => {
      const aVal = sortConfig.key === 'company' ? a.company.name : a[sortConfig.key];
      const bVal = sortConfig.key === 'company' ? b.company.name : b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedUsers.slice(start, start + rowsPerPage);
  }, [sortedUsers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);

  
  const handleSort = useCallback((key, direction) => {
    if (direction === "reset") {
      setSortConfig({ key: null, direction: "reset" }); 
    } else {
      setSortConfig({ key, direction });
    }
  }, []);

  if (loading) return <p className="status">Loading users...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <div className={`app ${theme}`}>
      <div className='app-content'>
      <header className="header">
        <h1 className='dashboard-title'>
          <Dashboard fontSize='large' className="dashboard-icon" />
          User Management Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
  <People sx={{ fontSize: 28, marginRight: 1 }} />
  <span style={{ fontSize: "15px", fontWeight: "500" }}>
    Total Users: {originalUsers.length}
  </span>
</div>


        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} inputRef={searchInputRef} />
        <ColumnVisibilityToggle visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
      </div>

      <UserTable
        users={paginatedUsers}
        sortConfig={sortConfig}
        onSort={handleSort}
        visibleColumns={visibleColumns}
      />

      <div className="pagination">
        <button className='prev-btn' onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          <ArrowBackIos sx={{ fontSize: 18, marginRight: "4px" }} />
          Prev</button>
        <span className='page-info'>Page {currentPage} of {totalPages}</span>
        <button className='next-btn' onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          <ArrowForwardIos sx={{ fontSize: 18, marginLeft: "4px" }} />
          Next</button>
        <div className='rows-per-page'>
        <label>
    Users per page:{" "}
    <select
  value={rowsPerPage}
  onChange={(e) => {
    const newRows = Number(e.target.value);
    setRowsPerPage(newRows);

    
    const newTotalPages = Math.ceil(sortedUsers.length / newRows);
    setCurrentPage((prev) => Math.min(prev, newTotalPages));
  }}
>
  <option value={5}>5</option>
  <option value={10}>10</option>
  <option value={20}>20</option>
</select>

  </label>
  </div>
  </div>
      </div>
    </div>
  );
}

export default App;
