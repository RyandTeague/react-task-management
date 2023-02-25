import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";

// createRoot(document.getElementById("root")).render(
// <React.StrictMode>
// <Router>
// <App />
// </Router>
// </React.StrictMode>
// );

createRoot(document.getElementById("root")).render(
    <Router>
        <CurrentUserProvider>
            <ProfileDataProvider>
                <App />
            </ProfileDataProvider>
        </CurrentUserProvider>
    </Router>

);


reportWebVitals();