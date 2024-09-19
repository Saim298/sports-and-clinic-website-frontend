import React, { useState } from "react";
import { Rnd } from "react-rnd";

// Helper function to convert named colors to hex format
const namedColorToHex = (colorName) => {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = colorName;
  return ctx.fillStyle;
};

const LineElement = ({
    id,
    position,
    color,
    thickness,
    isVertical,
    onUpdateLine,
    onDelete,
  }) => {
    const initialColor = namedColorToHex(color || "#000000");
    const [lineColor, setLineColor] = useState(initialColor);
    const [orientation, setOrientation] = useState(isVertical);
    const [lineThickness, setLineThickness] = useState(thickness || "5px");
  
    const handleColorChange = (e) => {
      const newColor = e.target.value;
      setLineColor(newColor);
      onUpdateLine(id, { color: newColor });
    };
  
    const handleThicknessChange = (e) => {
      const newThickness = e.target.value + "px";
      setLineThickness(newThickness);
      onUpdateLine(id, { thickness: newThickness });
    };
  
    const toggleOrientation = () => {
      setOrientation(!orientation);
      onUpdateLine(id, { isVertical: !orientation });
    };
  
    return (
      <Rnd
        bounds="parent"
        position={position}
        size={{
          width: orientation ? lineThickness : "100%",
          height: orientation ? "100%" : lineThickness,
        }}
        onDragStop={(e, d) => onUpdateLine(id, { position: { left: d.x, top: d.y } })}
        enableResizing={false}
        style={{
          cursor: "move",
          zIndex: 2,
        }}
      >
        <div
          style={{
            backgroundColor: lineColor,
            width: orientation ? lineThickness : "100%",
            height: orientation ? "100%" : lineThickness,
            borderRadius: "3px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "5px 10px",
              borderRadius: "5px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Color:
              <input
                type="color"
                value={lineColor}
                onChange={handleColorChange}
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                }}
              />
            </label>
  
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Thickness:
              <input
                type="number"
                value={parseInt(lineThickness)}
                onChange={handleThicknessChange}
                min="1"
                max="20"
                style={{
                  width: "40px",
                  marginLeft: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "3px",
                  padding: "2px 5px",
                }}
              />{" "}
              px
            </label>
  
            <button
              onClick={toggleOrientation}
              style={{
                padding: "5px 10px",
                fontSize: "12px",
                border: "none",
                backgroundColor: "#007BFF",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {orientation ? "Horizontal" : "Vertical"}
            </button>
  
            <button
              onClick={() => onDelete(id)}
              style={{
                padding: "5px 10px",
                fontSize: "12px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Rnd>
    );
  };
  

export default LineElement;
