import { Table } from 'react-bootstrap';

export default function DataTable({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No data available',
  hover = true,
  noFrame = false,
  compact = false
}) {
  const cellPaddingClass = compact ? 'py-2 px-3' : 'py-3 px-4';

  if (!data || data.length === 0) {
    return (
      <div className={`text-center text-subtle py-5 ${noFrame ? '' : 'glass-panel rounded-3'}`}>
        {emptyMessage}
      </div>
    );
  }

  const tableContent = (
    <div className="table-responsive">
      <Table hover={hover} variant="dark" className="mb-0 align-middle">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.15)' }}>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`${cellPaddingClass} border-0`}
                style={{
                  color: 'var(--text-subtle, #bac9cc)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  width: col.width || 'auto',
                  textAlign: col.align || 'left'
                }}
              >
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
              className="data-table-row"
              style={{
                borderBottom: '1px solid rgba(0, 229, 255, 0.08)',
                cursor: onRowClick ? 'pointer' : 'default'
              }}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={`${cellPaddingClass} border-0`}
                  style={{
                    textAlign: col.align || 'left',
                    color: 'var(--bs-body-color, #dce3f1)'
                  }}
                >
                  {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  if (noFrame) {
    return tableContent;
  }

  return (
    <div className="glass-panel rounded-3 overflow-hidden">
      {tableContent}
    </div>
  );
}
