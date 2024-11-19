import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShowList() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadStudentList();
    }, []);

    // const loadStudentList = async () => {
    //     try {
    //         // const response = await fetch("https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students");
    //         const response = await fetch("/api/students/students");
    //         const data = await response.json();
    //         setStudents(data);
    //     } catch (error) {
    //         console.error("데이터 로드 실패:", error);
    //     }
    // };

    const loadStudentList = async () => {
        try {
            const response = await fetch("/api/students/students"); // Netlify 프록시 사용
            if (!response.ok) throw new Error("API 요청 실패");
            
            const data = await response.json();
    
            // 데이터가 배열인지 확인
            if (!Array.isArray(data)) {
                throw new Error("API에서 반환된 데이터가 배열이 아닙니다.");
            }
    
            setStudents(data);
        } catch (error) {
            console.error("데이터 로드 실패:", error.message);
            setStudents([]); // 데이터 초기화
        }
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await fetch(`https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students/${id}`, {
                method: "DELETE",
            });
            alert("삭제가 완료되었습니다!");
            loadStudentList();
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };

    return (
        <div className="container text-center">
            <h1>학생 목록</h1>
            <button className="btn btn-primary my-3" onClick={() => navigate("/create")}>
                학생 추가
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>학생명</th>
                        <th>이메일 주소</th>
                        <th>학번</th>
                        <th>전화번호</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.studentId}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() => navigate(`/detail/${student.id}`)}
                                >
                                    상세 보기
                                </button>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => navigate(`/update/${student.id}`)}
                                >
                                    수정
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteClick(student.id)}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowList;