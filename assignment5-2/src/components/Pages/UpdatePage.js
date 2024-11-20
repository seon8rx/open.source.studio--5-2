import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../PageLayout";

function UpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id; 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        studentId: "",
        phone: "",
    });
    const [editCount, setEditCount] = useState(0);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const studentIdRef = useRef(null);
    const phoneRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_BASE_URL || "/api";

    const fetchStudentDetails = useCallback(async () => {
        if (!id) return; 
        try {
            const response = await fetch(`${API_URL}/students/${id}`);
            if (!response.ok) {
                throw new Error("학생 데이터를 가져오는 데 실패했습니다.");
            }
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("데이터 로드 실패:", error.message);
        }
    }, [API_URL, id]); // 의존성 배열에 API_URL 추가

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const url = isEditMode
            ? `${API_URL}/students/${id}`
            : `${API_URL}/students`;
        const method = isEditMode ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(isEditMode ? "수정 실패" : "추가 실패");
            }
            alert(isEditMode ? "수정이 완료되었습니다!" : "학생 추가가 완료되었습니다!");
            navigate("/list");
        } catch (error) {
            console.error(error.message);
            alert("서버와 통신 중 문제가 발생했습니다.");
        }
    };

    // const fetchStudentDetails = useCallback(async () => {
    //     if (!id) return; 
    //     try {
    //         const response = await fetch(`https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students/${id}`);
    //         // const response = await fetch("/api/students/students");
    //         // const response = await fetch("https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students");
    //         if (!response.ok) {
    //             throw new Error("학생 데이터를 가져오는 데 실패했습니다.");
    //         }
    //         const data = await response.json();
    //         setFormData(data);
    //     } catch (error) {
    //         console.error("데이터 로드 실패:", error.message);
    //     }
    // }, [id]);

    useEffect(() => {
        fetchStudentDetails();
    }, [fetchStudentDetails]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (isEditMode) {
            setEditCount((prevCount) => prevCount + 1);
        }

        if (isEditMode) {
            try {
                await fetch(`https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, [name]: value }),
                });
                console.log(`필드 "${name}"가 업데이트되었습니다.`);
            } catch (error) {
                console.error("API 업데이트 실패:", error.message);
            }
        }
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const studentIdRegex = /^[0-9]+$/;
        const phoneRegex = /^\d{3}-\d{2,4}-\d{4}$/;

        if (!nameRef.current.value.trim()) {
            alert("이름을 입력해주세요.");
            return false;
        }
        if (!emailRegex.test(emailRef.current.value)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return false;
        }
        if (!studentIdRegex.test(studentIdRef.current.value)) {
            alert("학번은 숫자로만 입력해주세요.");
            return false;
        }
        if (!phoneRegex.test(phoneRef.current.value)) {
            alert("전화번호는 000-000-0000 또는 000-0000-0000 형식으로 입력해주세요.");
            return false;
        }
        return true;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validateInputs()) return;

    //     const API_URL = process.env.REACT_APP_API_BASE_URL || "/api";

    //     const url = isEditMode
    //         ? `${API_URL}/students/${id}`
    //         : `${API_URL}/students`;
    //     const method = isEditMode ? "PUT" : "POST";

    //     try {
    //         const response = await fetch(url, {
    //             method,
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(formData),
    //         });
    //         if (!response.ok) {
    //             throw new Error(isEditMode ? "수정 실패" : "추가 실패");
    //         }
    //         alert(isEditMode ? "수정이 완료되었습니다!" : "학생 추가가 완료되었습니다!");
    //         navigate("/list");
    //     } catch (error) {
    //         console.error(error.message);
    //         alert("서버와 통신 중 문제가 발생했습니다.");
    //     }
    // };

    return (
        <PageLayout title={isEditMode ? "학생 수정" : "학생 추가"}>
            <form onSubmit={handleSubmit}>
                {isEditMode && <p>수정된 횟수: {editCount}회</p>}
                <div className="mb-3">
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        ref={nameRef}
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>이메일</label>
                    <input
                        type="email"
                        name="email"
                        ref={emailRef}
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>학번</label>
                    <input
                        type="text"
                        name="studentId"
                        ref={studentIdRef}
                        className="form-control"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>전화번호</label>
                    <input
                        type="text"
                        name="phone"
                        ref={phoneRef}
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                {!isEditMode && (
                    <button type="submit" className="btn btn-primary me-3">
                        학생 추가
                    </button>
                )}
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/list")}>
                    목록으로
                </button>
            </form>
        </PageLayout>
    );
}

export default UpdatePage;