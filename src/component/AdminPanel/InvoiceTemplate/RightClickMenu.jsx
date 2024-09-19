import React from "react";

const RightClickMenu = ({
  position,
  onAddText,
  onAddImage,
  onAddTable,
  onAddLine,
}) => {
  return (
    <div
      className="menu"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
        padding: "10px",
        zIndex: 1000,
        borderRadius: "5px",
      }}
    >
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li
          onClick={onAddText}
          style={{
            padding: "5px",
            cursor: "pointer",
            borderBottom: "1px solid #ddd",
          }}
        >
          Add Text
        </li>
        <li onClick={onAddImage} style={{ padding: "5px", cursor: "pointer" }}>
          Add Image
        </li>
        <li onClick={onAddTable} style={{ padding: "5px", cursor: "pointer" }}>
          Add Table
        </li>{" "}
        <li onClick={onAddLine} style={{ padding: "5px", cursor: "pointer" }}>
          Add Line
        </li>
      </ul>
    </div>
  );
};

export default RightClickMenu;
