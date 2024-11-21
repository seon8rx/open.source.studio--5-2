import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeButton}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body // 모달을 body에 렌더링하여 다른 컴포넌트 위에 표시
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 흐리게
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // 최상단 표시
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "transparent",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
    },
};

export default Modal;