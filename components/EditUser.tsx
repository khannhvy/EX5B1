import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { updateUser } from '../api/userApi';
import { useUserContext } from '../api/UserContext';

interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

interface EditUserProps {
    route: RouteProp<{ params: { userId: string; userData: User; refreshUsers: () => void; updateUsers: (user: User) => void } }, 'params'>;
    navigation: any;
}

const EditUser: React.FC<EditUserProps> = ({ route, navigation }) => {
    const { userId, userData } = route.params; 
    const { refreshUsers, updateUsers } = useUserContext();
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [age, setAge] = useState(userData.age.toString()); 

    const handleUpdate = async () => {
        if (!name || !email || !age) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const updatedUserData = { name, email, age: Number(age) };
        try {
            await updateUser(userId, updatedUserData);
            updateUsers({ ...userData, ...updatedUserData }); 
            refreshUsers(); 
            Alert.alert('Thành công', 'Người dùng đã được cập nhật thành công!');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to update user:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật người dùng.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput 
                placeholder="Tên" 
                value={name} 
                onChangeText={setName} 
                style={styles.input} 
            />
            <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                style={styles.input} 
            />
            <TextInput 
                placeholder="Tuổi" 
                value={age} 
                onChangeText={text => setAge(text)} 
                keyboardType="numeric" 
                style={styles.input} 
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Cập nhật người dùng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        paddingTop: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EditUser;
