import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage.tsx";
import MainTrainer from "./pages/MainTrainer.tsx";
import MainMember from "./pages/MainMember.tsx";
import ViewClassesTrainer from "./pages/ViewClassesTrainer.tsx";
import ViewClassTrainer from "./pages/ViewClassTrainer.tsx";
import AddClassTrainer from "./pages/AddClasstrainer.tsx";
import ViewScheduleTrainer from "./pages/ViewScheduletrainer.tsx";
import EditClassTrainer from "./pages/EditClasstrainer.tsx";
import ViewMembership from "./pages/ViewMembership.tsx";
import BuyMembership from "./pages/BuyMembership.tsx";
import ViewClassesMember from "./pages/ViewClassesMember.tsx";
import ViewClassMember from "./pages/ViewClassMember.tsx";
import ViewBookingsMember from "./pages/ViewBookingsMember.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewHistoryBookings from "./pages/ViewHistoryBookings.tsx";
import ViewParticipants from "./pages/ViewParticipants.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/main-member" element={<MainMember/>} />
                <Route path="/main-trainer" element={<MainTrainer/>} />
                <Route path="/view-classes-trainer" element={<ViewClassesTrainer/>} />
                <Route path="/view-class/:id" element={<ViewClassTrainer/>} />
                <Route path="/add-class" element={<AddClassTrainer />} />
                <Route path="/view-schedule-trainer" element={<ViewScheduleTrainer/>} />
                <Route path="/edit-class/:id" element={<EditClassTrainer />} />
                <Route path="/view-membership" element={<ViewMembership/>} />
                <Route path="/buy-membership" element={<BuyMembership/>} />
                <Route path="/view-classes-member" element={<ViewClassesMember/>} />
                <Route path={"/view-class-member/:id"} element={<ViewClassMember/>} />
                <Route path={"/view-bookings"} element={<ViewBookingsMember/>}/>
                <Route path={"/history-bookings"} element={<ViewHistoryBookings/>}/>
                <Route path="/view-participants/:id" element={<ViewParticipants />} />
            </Routes>
        </Router>
    );

}

export default App;
