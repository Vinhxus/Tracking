import CreatePage from './routes/CreatePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Activities from './routes/Activities'
import HomePage from './routes/Homepage'
import Auth from './routes/Auth'

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const base64Url = token.split('.')[1];
    // chuyển base64url -> base64 chuẩn
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // thêm padding nếu thiếu
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const payload = JSON.parse(atob(padded));
    if (!payload.exp) return true;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!isTokenValid(token)) {
    localStorage.removeItem('token');
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function App() {
  return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/activities/:date" element={<RequireAuth><Activities /></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><CreatePage /></RequireAuth>} />
        <Route
          path="*"
          element={<div className="p-4 text-center">404 - Page not exist</div>}
        />
      </Routes>
  )
}

export default App