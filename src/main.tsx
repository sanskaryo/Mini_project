import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PlaceholdersAndVanishInputDemo from "./components/PlaceholdersAndVanishInputDemo.tsx";
import "./App.css";
import LearningPage from "./components/LearningPage.tsx";
import LandingPage from "./components/LandingPage.tsx";
import Login from "./components/LoginPage.tsx";
import SignUp from "./components/Signup.tsx";
//paths
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat" element={<PlaceholdersAndVanishInputDemo />} />
      <Route path="/learning" element={<LearningPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
