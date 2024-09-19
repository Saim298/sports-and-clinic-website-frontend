import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EventProvider } from "./context/EventContext";
import { UserProvider } from "./context/UserContext";
import { GetEventProvider } from "./context/GetEventContext";
import { EventProviderByID } from "./context/EventContextByID";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
    {/* Wrap App with BrowserRouter */}
    <EventProvider>
      <UserProvider>
        <GetEventProvider>
          <EventProviderByID>
            <App />
          </EventProviderByID>
        </GetEventProvider>
      </UserProvider>
    </EventProvider>
    </DndProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
