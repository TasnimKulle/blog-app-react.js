import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./Pages/Home";
import { Articles } from "./Pages/Articles";
import { Article } from "./Pages/Article";
import { SignIn } from "./Pages/SignIn";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SignUpPage } from "./Pages/SignUpPage";
import { AuthProvider } from "./context/AuthContext";
import UnAuthenticatedRoute from "./components/UnAuthenticatedRoute";
import { ArticleEditorPage } from "./Pages/ArticleEditorPage";
import { ManageArticlesPage } from "./Pages/ManageArticlesPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <div>
        {/* header */}
        <Header />
        {/* main sections bage */}
        <main>
          {/* routes bages */}
          <Routes>
            {/* public bage  */}
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<Article />} />
            {/* authantication pages (rediration to if login ) */}
            <Route
              path="/signin"
              element={
                <UnAuthenticatedRoute>
                  <SignIn />
                </UnAuthenticatedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UnAuthenticatedRoute>
                  <SignUpPage />
                </UnAuthenticatedRoute>
              }
            />
            {/* protected route */}
            <Route
              path="/editor"
              element={
                
                <ProtectedRoute>
                    <ArticleEditorPage />
                </ProtectedRoute>
              }
            />
            <Route path="/editor/:id" element={
              <ProtectedRoute>
                <ArticleEditorPage />
              </ProtectedRoute>
            } />
            <Route path="/manage-articles" element={
              <ProtectedRoute>
                <ManageArticlesPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        {/* footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
