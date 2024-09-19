import React from "react";

const ImageUpload = ({ addImage }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addImage(event.target.result); // Call parent method to add image
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
    </>
  );
};

export default ImageUpload;
