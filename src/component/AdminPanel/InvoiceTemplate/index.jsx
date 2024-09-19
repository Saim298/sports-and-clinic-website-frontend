import React, { useState } from "react";
import { useDrop } from "react-dnd";
import RightClickMenu from "./RightClickMenu";
import TextElement from "./TextElement";
import ImageElement from "./ImageElement";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Rnd } from "react-rnd";
import axios from "axios";
import EditableTable from "./EditableTable";
import LineElement from "./LineElement";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const InvoiceTemplate = () => {
  const [elements, setElements] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [, drop] = useDrop({
    accept: ["text", "image", "table", "line"],
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round((item.position?.left || 0) + delta.x); // Safeguard against undefined
      const top = Math.round((item.position?.top || 0) + delta.y);
      moveElement(item.id, left, top);
    },
  });

  const moveElement = (id, left, top) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, position: { left, top } } : el))
    );
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const addText = () => {
    setElements([
      ...elements,
      {
        id: elements.length + 1,
        type: "text",
        content: {
          text: "New Text",
          isBold: false,
          isItalic: false,
          isUnderline: false,
        },
        position: { left: 100, top: 100 }, // Ensure position is defined
      },
    ]);
    setShowMenu(false);
  };

  const addImage = (cloudinaryURL, imageName) => {
    setElements([
      ...elements,
      {
        id: elements.length + 1,
        type: "image",
        src: cloudinaryURL, // Use the Cloudinary URL
        name: imageName, // Store image name for HTML generation
        position: { left: 100, top: 100 },
      },
    ]);
    setShowMenu(false);
  };

  const addTable = () => {
    setElements([
      ...elements,
      {
        id: elements.length + 1,
        type: "table",
        rows: [
          ["Edit Me", "Edit Me", "Edit Me"],
          ["Edit Me", "Edit Me", "Edit Me"],
        ],
        position: { left: 100, top: 100 },
        backgroundColor: "#fff",
      },
    ]);
    setShowMenu(false);
  };

  const updateTextContent = (id, newContent) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id && el.type === "text"
          ? { ...el, content: { ...el.content, ...newContent } }
          : el
      )
    );
  };

  const updateImage = (id, newSrc) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id && el.type === "image" ? { ...el, src: newSrc } : el
      )
    );
  };

  const updateImagePosition = (id, newPosition) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id && el.type === "image"
          ? { ...el, position: { ...el.position, ...newPosition } }
          : el
      )
    );
  };

  const updateTable = (id, updatedRows, updatedColor = null) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id && el.type === "table"
          ? {
              ...el,
              rows: updatedRows,
              ...(updatedColor && { backgroundColor: updatedColor }),
            }
          : el
      )
    );
  };
  const handleSave = async () => {
    const htmlContent = convertToHtml();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/invoices/create",
        {
          html: htmlContent,
        }
      );

      console.log("Invoice saved successfully:", response.data);
      alert("Invoice saved successfully!");
    } catch (error) {
      console.error("Error saving the invoice:", error);
      alert("Failed to save the invoice. Please try again.");
    }
  };

  const convertToHtml = () => {
    // Boilerplate HTML with embedded styles to ensure PDF compatibility
    let htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            position: relative;
            width: 100%;
            max-width: 800px; /* Ensure it doesn't overflow */
            margin: auto;
            border: 1px solid black;
            background-color: #f0f0f0;
            padding: 20px;
          }
          .text-element {
            position: absolute;
          }
          .image-element {
            position: absolute;
            max-width: 100%; /* Ensure images stay within their parent width */
            max-height: 100%; /* Ensure images do not overflow the container */
          }
          table {
            border-collapse: collapse;
            width: auto;
          }
          td {
            border: 1px solid black;
            padding: 5px;
          }
          .line-element {
            position: absolute;
          }
        </style>
      </head>
      <body>
        <div class="container">`;

    // Loop through elements to construct dynamic HTML content
    elements.forEach((el) => {
      if (el.type === "text") {
        htmlContent += `<div class="text-element" style="left:${
          el.position.left
        }px; top:${el.position.top}px; font-weight:${
          el.content.isBold ? "bold" : "normal"
        }; font-style:${
          el.content.isItalic ? "italic" : "normal"
        }; text-decoration:${el.content.isUnderline ? "underline" : "none"};">
          ${el.content.text}
        </div>`;
      } else if (el.type === "image") {
        htmlContent += `<img class="image-element" src="${el.src}" alt="${el.name}" style="left:${el.position.left}px; top:${el.position.top}px;" />`;
      } else if (el.type === "table") {
        let tableHtml = `<table style="left:${el.position.left}px; top:${el.position.top}px;">`;
        el.rows.forEach((row) => {
          tableHtml += "<tr>";
          row.forEach((cell) => {
            tableHtml += `<td>${cell}</td>`;
          });
          tableHtml += "</tr>";
        });
        tableHtml += "</table>";
        htmlContent += tableHtml;
      } else if (el.type === "line") {
        htmlContent += `<div class="line-element" style="left:${
          el.position.left
        }px; top:${el.position.top}px; background-color:${el.color}; width:${
          el.isVertical ? el.thickness : "100px"
        }; height:${el.isVertical ? "100px" : el.thickness};"></div>`;
      }
    });

    htmlContent += `</div></body></html>`;
    return htmlContent;
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Upload the image to the backend, which will send it to Cloudinary
        const response = await axios.post(
          "http://localhost:5000/api/invoices/upload-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        // Destructure the correct fields from the response
        const { url } = response.data; // Use 'url' instead of 'cloudinaryURL'

        // Add the image with the Cloudinary URL and its name (you can customize how you handle the image)
        addImage(url, file.name); // Using 'url' for the Cloudinary URL

        console.log("Image uploaded successfully:", url); // You can log the URL or use it as needed
      } catch (error) {
        console.error("Error uploading the image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const addLine = () => {
    setElements([
      ...elements,
      {
        id: elements.length + 1,
        type: "line",
        position: { left: 100, top: 100 },
        color: "black",
        thickness: "2px",
        isVertical: false,
      },
    ]);
    setShowMenu(false);
  };

  const updateLine = (id, updatedProperties) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id && el.type === "line"
          ? { ...el, ...updatedProperties }
          : el
      )
    );
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>
              {/* Added description of required placeholders */}
              <div className="mt-3">
                <p>
                  The following placeholders are required to be included in your
                  template. Please ensure they are wrapped in double curly
                  braces like{" "}
                  <span style={{ color: "red" }}>{"{{example}}"}</span>.
                </p>
                <ul>
                  <li>
                    <span style={{ color: "red" }}>{"{{name}}"}</span>: The
                    user's name.
                  </li>
                  <li>
                    <span style={{ color: "red" }}>{"{{email}}"}</span>: The
                    user's email address.
                  </li>
                  <li>
                    <span style={{ color: "red" }}>{"{{plan}}"}</span>: The
                    subscription plan chosen by the user.
                  </li>
                  <li>
                    <span style={{ color: "red" }}>{"{{duration}}"}</span>: The
                    duration of the subscription.
                  </li>
                  <li>
                    <span style={{ color: "red" }}>{"{{amount}}"}</span>: The
                    amount charged for the subscription.
                  </li>
                  <li>
                    <span style={{ color: "red" }}>{"{{startDate}}"}</span>: The
                    start date of the subscription.
                  </li>
                  <li>
                    <span style={{ color: "red" }}>{"{{paymentMethod}}"}</span>:
                    The payment method used.
                  </li>
                  <li>
                    <span style={{ color: "red" }}>{"{{createdAt}}"}</span>: The
                    date when the record was created.
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-7">
                  <div
                    ref={drop}
                    style={{
                      // width: "100vw",
                      height: "100vh",
                      border: "1px solid black",
                      backgroundColor: "#f0f0f0",
                    }}
                    onContextMenu={handleRightClick}
                  >
                    {elements.map((el) =>
                      el.type === "text" ? (
                        <TextElement
                          key={el.id}
                          id={el.id}
                          content={el.content}
                          position={el.position}
                          onBold={() =>
                            updateTextContent(el.id, {
                              isBold: !el.content.isBold,
                            })
                          }
                          onDelete={() =>
                            setElements(
                              elements.filter((item) => item.id !== el.id)
                            )
                          }
                          onUpdateText={updateTextContent}
                        />
                      ) : el.type === "image" ? (
                        <ImageElement
                          key={el.id}
                          id={el.id}
                          src={el.src}
                          position={el.position}
                          onImageChange={updateImage} // This was missing as well
                          onPositionChange={updateImagePosition} // Pass the correct function
                        />
                      ) : el.type === "table" ? (
                        <EditableTable
                          key={el.id}
                          id={el.id}
                          position={el.position}
                          onDelete={() => deleteElement(el.id)}
                        />
                      ) : el.type === "line" ? (
                        <LineElement
                          key={el.id}
                          id={el.id}
                          position={el.position}
                          color={el.color}
                          thickness={el.thickness}
                          isVertical={el.isVertical}
                          onUpdateLine={updateLine}
                          onDelete={deleteElement}
                        />
                      ) : (
                        ""
                      )
                    )}
                    {showMenu && (
                      <RightClickMenu
                        position={menuPosition}
                        onAddText={addText}
                        onAddImage={() =>
                          document.getElementById("file-upload").click()
                        }
                        onAddTable={addTable}
                        onAddLine={addLine}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                      padding: "10px 20px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Save Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
