import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../PageLayout";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetchStudentDetails();
    }, [fetchStudentDetails]);

    const fetchStudentDetails = async () => {
        try {
            const response = await fetch(`https://672e1dd5229a881691ef09f0.mockapi.io/api/students/students/${id}`);
            const data = await response.json();
            setStudent(data);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };

    return (
        <PageLayout title="학생 세부 정보">
            {student ? (
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
            ) : (
                <p>로딩 중...</p>
            )}
        </PageLayout>
    );
}

export default DetailPage;