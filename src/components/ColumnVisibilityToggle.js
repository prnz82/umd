import React from 'react';

function ColumnVisibilityToggle({ visibleColumns, setVisibleColumns }) {
  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="column-toggle">
      {Object.keys(visibleColumns).map((col) => (
        <label key={col}>
          <input
            type="checkbox"
            checked={visibleColumns[col]}
            onChange={() => toggleColumn(col)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault(); // 
                toggleColumn(col);
              }
            }}
          />
          {col}
        </label>
      ))}
    </div>
  );
}

export default ColumnVisibilityToggle;
