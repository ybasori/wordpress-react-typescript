import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import { AppProvider } from "./_context/AppProvider";
import LayoutBlog from "./components/LayoutBlog";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Page from "./pages/Page";
import Author from "./pages/Author";

export default function App() {
  return (
    <Router>
      <AppProvider>
        <Layout>
          <Switch>
            <Route
              path="/blog"
              element={
                <LayoutBlog>
                  <Blog />
                </LayoutBlog>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/author/:user" element={<Author />} />
            <Route path="/:slug" element={<Page />} />
            <Route path="/" element={<Navigate to="/home/" />} />
          </Switch>
        </Layout>
      </AppProvider>
    </Router>
  );
}
