import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminComponent = () => {
    const [roles, setRoles] = useState([]);

    const fetchUserRoles = async () => {
        try {
            const response = await axios.get('https://localhost:7058/api/user/roles', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });
            console.log('User Roles:', response.data);
            setRoles(response.data);  // Set the roles state with the data received from the API
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
    };

    useEffect(() => {
        fetchUserRoles();
    }, []);

    if (roles.includes('Admin')) {
        return <div>Welcome, Admin!</div>;
    } else {
        return <div>You do not have access to this section.</div>;
    }
};

export default AdminComponent;