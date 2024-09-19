import React, { useState } from "react";
import { Rnd } from "react-rnd";

const EditableTable = ({ id, position, onDelete }) => {
  const [tableData, setTableData] = useState([
    ["Row 1, Col 1", "Row 1, Col 2"],
    ["Row 2, Col 1", "Row 2, Col 2"],
  ]);
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const handleCellDoubleClick = (rowIndex, colIndex) => {
    const newValue = prompt("Enter new value", tableData[rowIndex][colIndex]);
    if (newValue !== null) {
      const updatedTable = [...tableData];
      updatedTable[rowIndex][colIndex] = newValue;
      setTableData(updatedTable);
    }
  };

  const addRow = () => {
    setTableData([...tableData, ["", ""]]);
  };

  const changeRowColor = (rowIndex) => {
    const newColor = prompt(
      "Enter background color (e.g., #f0f0f0):",
      backgroundColor
    );
    if (newColor) {
      setBackgroundColor(newColor);
    }
  };

  return (
    <Rnd
      bounds="parent"
      default={{
        x: position.left,
        y: position.top,
        width: 400,
        height: 200,
      }}
      minWidth={200}
      minHeight={100}
      style={{ zIndex: 1000 }}
    >
      <div
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <button onClick={addRow} style={{ marginBottom: "10px" }}>
          Add Row
        </button>
        <button onClick={onDelete} style={{ marginLeft: "10px" }}>
          Delete Table
        </button>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onDoubleClick={() => changeRowColor(rowIndex)}
                style={{
                  backgroundColor: backgroundColor,
                  cursor: "pointer",
                }}
              >
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    onDoubleClick={() =>
                      handleCellDoubleClick(rowIndex, colIndex)
                    }
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      cursor: "text",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Rnd>
  );
};

export default EditableTable;
