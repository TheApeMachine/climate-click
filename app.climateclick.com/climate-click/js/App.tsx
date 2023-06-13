import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Onboarding } from "./Onboarding";
import { Dashboard } from "./Dashboard";
import { Settings } from "./Settings";
import { Support } from "./Support";
import { EscapeIframe } from "./EscapeIframe";
import { PenguinInTheLoop } from "./PenguinInTheLoop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/penguin-in-the-loop",
    element: <PenguinInTheLoop />,
  },
  {
    path: "/shopify/redirect",
    element: <EscapeIframe />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
