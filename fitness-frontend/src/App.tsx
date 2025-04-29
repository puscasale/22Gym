import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage.tsx";
import MainTrainer from "./pages/MainTrainer.tsx";
import ViewClassesTrainer from "./pages/ViewClassesTrainer.tsx";
import ViewClassTrainer from "./pages/ViewClassTrainer.tsx";
import AddClassTrainer from "./pages/AddClasstrainer.tsx";
import ViewScheduleTrainer from "./pages/ViewScheduletrainer.tsx";
import EditClassTrainer from "./pages/EditClasstrainer.tsx";
import MainMember from "./pages/MainMember.tsx";
import ViewMembership from "./pages/ViewMembership.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/main-trainer" element={<MainTrainer/>} />
                <Route path="/main-member" element={<MainMember/>} />
                <Route path="/view-classes-trainer" element={<ViewClassesTrainer/>} />
                <Route path="/view-class/:id" element={<ViewClassTrainer/>} />
                <Route path="/add-class" element={<AddClassTrainer />} />
                <Route path="/view-schedule-trainer" element={<ViewScheduleTrainer/>} />
                <Route path="/edit-class/:id" element={<EditClassTrainer />} />
                <Route path="/view-membership" element={<ViewMembership/>} />

            </Routes>
        </Router>
    );

}

export default App;
