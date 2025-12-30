"use client"

import Login from "../../src/views/Auth/Login";
import ProtectedRoute from "../../src/components/common/ProtectedRoute";

export function ClientOnly() {
    return (
        <ProtectedRoute>
            <Login />
        </ProtectedRoute>
    );
}