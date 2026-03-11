import React from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

/**
 * Modern Table Component with sorting, search, and pagination
 */
const Table = ({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No data available',
  loading = false,
  striped = false,
  hoverable = true,
  searchable = false,
  onSearch,
  searchPlaceholder = 'Search...',
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: null });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const LoadingRow = () => (
    <tr>
      <td colSpan={columns.length} className="px-6 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      </td>
    </tr>
  );

  const EmptyRow = () => (
    <tr>
      <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400">
        {emptyMessage}
      </td>
    </tr>
  );

  return (
    <div className={`bg-slate-900/55 rounded-xl shadow-sm border border-slate-600/30 overflow-hidden ${className}`}>
      {searchable && (
        <div className="p-4 border-b border-slate-600/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-slate-600/40 bg-slate-950/50 text-slate-100 rounded-lg focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400 outline-none"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700/40">
          <thead className="bg-slate-950/55">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-slate-800/60' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`w-3 h-3 ${
                            sortConfig.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-cyan-300'
                              : 'text-slate-500'
                          }`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-cyan-300'
                              : 'text-slate-500'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`bg-slate-900/30 divide-y divide-slate-700/30 ${striped ? 'divide-y-0' : ''}`}>
            {loading ? (
              <LoadingRow />
            ) : sortedData.length === 0 ? (
              <EmptyRow />
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    striped && rowIndex % 2 === 1 ? 'bg-slate-900/45' : ''
                  } ${
                    hoverable ? 'hover:bg-slate-800/55 transition-colors' : ''
                  } ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-100">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
