import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../PageLayout";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    const fetchStudentDetails = useCallback(async () => {
        try {
            const { id } = useParams();
            console.log("id:", id); // id 값 확인  
            // const response = await fetch(`https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students/${id}`);
            const response = await fetch("/api/students/students/${id}");
            // const response = await fetch("https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students");
            if (!response.ok) {
                throw new Error("학생 데이터를 가져오는 데 실패했습니다.");
            }
            const data = await response.json();
            setStudent(data);
        } catch (error) {
            console.error("데이터 로드 실패:", error.message);
        }
    }, /*[id]*/ []);

    useEffect(() => {
        fetchStudentDetails();
    }, [fetchStudentDetails]);

    if (!student) return <PageLayout title="학생 상세 정보">로딩 중...</PageLayout>;

    return (
        <PageLayout title="학생 상세 정보">
            <div>
                <p><strong>이름:</strong> {student.name}</p>
                <p><strong>이메일:</strong> {student.email}</p>
                <p><strong>학번:</strong> {student.studentId}</p>
                <p><strong>전화번호:</strong> {student.phone}</p>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate(`/update/${id}`)}
                >
                    수정
                </button>
            </div>
        </PageLayout>
    );
}

export default DetailPage;