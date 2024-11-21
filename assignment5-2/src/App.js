// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import ShowList from "./components/Pages/ShowList";
// import DetailPage from "./components/Pages/DetailPage";
// import UpdatePage from "./components/Pages/UpdatePage";

// function App() {
//     return (
//         <Routes>
//             <Route path="/" element={<ShowList />} />
//             <Route path="/list" element={<ShowList />} />
//             <Route path="/detail/:id" element={<DetailPage />} />
//             <Route path="/update/:id" element={<UpdatePage />} />
//             <Route path="/create" element={<UpdatePage />} />
//         </Routes>
//     );
// }

// export default App;

import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Modal from "./components/Modal";
import ShowList from "./components/Pages/ShowList";
import DetailPage from "./components/Pages/DetailPage";
import UpdatePage from "./components/Pages/UpdatePage";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [modalType, setModalType] = useState(null);

    // Check if the route is modal-specific
    const backgroundLocation = location.state?.background;

    const closeModal = () => {
        setModalType(null);
        navigate(backgroundLocation?.pathname || "/", { replace: true });
    };

    return (
        <div>
            <h1 className="text-center mt-4">Student Management</h1>
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<ShowList />} />
                <Route path="/list" element={<ShowList />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/update/:id" element={<UpdatePage />} />
                <Route path="/create" element={<UpdatePage />} />
            </Routes>

            {/* Modal Routes */}
            {location.state?.modal && (
                <Routes>
                    <Route
                        path="/list"
                        element={
                            <Modal onClose={closeModal}>
                                <ShowList />
                            </Modal>
                        }
                    />
                    <Route
                        path="/detail/:id"
                        element={
                            <Modal onClose={closeModal}>
                                <DetailPage />
                            </Modal>
                        }
                    />
                    <Route
                        path="/update/:id"
                        element={
                            <Modal onClose={closeModal}>
                                <UpdatePage />
                            </Modal>
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            <Modal onClose={closeModal}>
                                <UpdatePage />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
}

export default App;