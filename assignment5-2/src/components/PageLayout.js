import React from "react";

function PageLayout({ title, children }) {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{title}</h1>
            <div className="card p-4 shadow-sm">
                {children}
            </div>
        </div>
    );
}

export default PageLayout;