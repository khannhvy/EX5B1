import axios from 'axios';

const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/ex51-f4da3/databases/(default)/documents/users';

export const addUser = async (userData) => {
    try {
        const response = await axios.post(FIREBASE_URL, {
            fields: {
                name: { stringValue: userData.name },
                email: { stringValue: userData.email },
                age: { integerValue: userData.age },
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(FIREBASE_URL);
        if (!response.data.documents || response.data.documents.length === 0) {
            throw new Error('No users found');
        }

        const usersArray = response.data.documents.map((doc) => ({
            id: doc.name.split('/').pop(),
            name: doc.fields.name.stringValue,
            email: doc.fields.email.stringValue,
            age: doc.fields.age.integerValue,
        }));

        return usersArray;
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; // Trả về một mảng rỗng trong trường hợp có lỗi
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.patch(`${FIREBASE_URL}/${userId}`, {
            fields: {
                name: { stringValue: userData.name },
                email: { stringValue: userData.email },
                age: { integerValue: userData.age },
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUsers = async (userId: string) => {
    try {
        const response = await axios.delete(`${FIREBASE_URL}/${userId}`); // Gọi API xóa
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error); // In lỗi ra console
        throw error;
    }
};




