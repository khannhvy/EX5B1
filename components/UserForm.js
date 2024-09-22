import React, { useState } from 'react';
import { View, TextInput, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addUser } from '../api/userApi';

const UserForm = ({ setUsers, navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return regex.test(email);
    };

    const handleSubmit = async () => {
        if (!name || !email || !age) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }

        const userData = { 
            name, 
            email, 
            age: Number(age) 
        };
    
        try {
            const newUser = await addUser(userData);
            setUsers((prevUsers) => [...prevUsers, newUser]);
            Alert.alert('Thành công', 'Người dùng đã được thêm thành công!');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding user:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm người dùng.');
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
                onChangeText={setAge} 
                keyboardType="numeric" 
                style={styles.input} 
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Thêm người dùng</Text>
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

export default UserForm;
