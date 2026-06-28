import { Table } from 'react-bootstrap';

export default function DataTable({ columns, data, onRowClick, emptyMessage = 'No data available', striped = true, hover = true }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped={striped} hover={hover} variant="dark" className="mb-0">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={col.width ? { width: col.width } : {}}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick?.(row)}
              style={onRowClick ? { cursor: 'pointer' } : {}}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
