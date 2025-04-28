import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

            </Routes>
        </Router>
    );

}

export default App;
