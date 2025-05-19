import React from 'react';
import {useUser} from "../context/UserContext";
import { Navigate } from "react-router-dom";
import CreateProject from "../components/CreateProjects";
import ManageProjects from "../components/ManageProjects";

const Admin = () => {

    const { user, loading } = useUser();


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
    return <Navigate to="/login" />;
    }

    return (
        <>
            <CreateProject />
            <ManageProjects />
        </>
    )
}

export default Admin;