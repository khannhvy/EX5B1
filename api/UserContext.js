import React, { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
    };

    const refreshUsers = useCallback(async () => {
        await fetchUsers();
    }, []);

    const updateUsers = (user) => {
    };

    return (
        <UserContext.Provider value={{ users, refreshUsers, updateUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
