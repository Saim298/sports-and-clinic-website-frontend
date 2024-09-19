import React from "react";
import { Rnd } from "react-rnd";

const ImageElement = ({ id, src, position, onImageChange, onPositionChange }) => {
  const handleDoubleClick = () => {
    document.getElementById(`file-input-${id}`).click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Pass the new image source to the parent via onImageChange
        onImageChange(id, event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Rnd
      default={{
        x: position.left,
        y: position.top,
        width: 200,
        height: 200,
      }}
      bounds="parent"
      onDragStop={(e, d) => {
        onPositionChange(id, { left: d.x, top: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onPositionChange(id, {
          left: position.x,
          top: position.y,
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <div
        onDoubleClick={handleDoubleClick}
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id={`file-input-${id}`}
        style={{ display: "none" }}
      />
    </Rnd>
  );
};

export default ImageElement;
