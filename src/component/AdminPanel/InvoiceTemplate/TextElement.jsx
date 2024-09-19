import React, { useState } from "react";
import { useDrag } from "react-dnd";

const TextElement = ({ id, content, position = { left: 0, top: 0 }, onBold, onDelete, onUpdateText }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "text",
    item: { id, position },  // Ensure position is sent correctly here
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(content.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleTextUpdate = () => {
    setIsEditing(false);
    // Pass the updated text back
    onUpdateText(id, { text: textValue });
  };

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: position.left || 0,  // Fallback to 0 if position is undefined
        top: position.top || 0,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={textValue}
          onChange={handleTextChange}
          onBlur={handleTextUpdate}
          autoFocus
        />
      ) : (
        <span
          style={{
            fontWeight: content.isBold ? "bold" : "normal",
            fontStyle: content.isItalic ? "italic" : "normal",
            textDecoration: content.isUnderline ? "underline" : "none",
          }}
        >
          {content.text}
        </span>
      )}
      <div>
        <button onClick={onBold}>Bold</button>
        <button onClick={onDelete}>Delete</button>
        <button
          onClick={() => onUpdateText(id, { isItalic: !content.isItalic })}
        >
          Italic
        </button>
        <button
          onClick={() => onUpdateText(id, { isUnderline: !content.isUnderline })}
        >
          Underline
        </button>
      </div>
    </div>
  );
};

export default TextElement;
