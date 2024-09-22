import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, useColorScheme } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getUsers } from '../api/userApi';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteUsers as apiDeleteUser } from '../api/userApi';

interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

interface UserListProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    navigation: any;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers, navigation }) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const colorScheme = useColorScheme();
    const [loading, setLoading] = useState(true); 

    const fetchUsers = async () => {
        setLoading(true); 
        try {
            const usersData = await getUsers();
            if (usersData && Array.isArray(usersData)) {
                setUsers(usersData);
            } else {
                Alert.alert('Error', 'Invalid data format');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            Alert.alert('Error', 'Could not fetch users. Please try again later.');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchUsers();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchUsers(); 
        });

        return unsubscribe; 
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Loading users...</Text>
            </View>
        );
    }

    const handleAddUser = () => {
        navigation.navigate('AddUser');
    };

    const handleUserPress = (user: User) => {
        navigation.navigate('EditUser', { userId: user.id, userData: user });
    };

    const showActionSheet = (user: User) => {
        const options = ['Edit', 'Delete', 'Cancel'];
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    handleUserPress(user);
                } else if (buttonIndex === 1) {
                    confirmDelete(user.id);
                }
            },
        );
    };

    const confirmDelete = (userId: string) => {
        Alert.alert(
            'Xác nhận xóa',
            'Xóa người dùng này?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => deleteUser(userId) },
            ],
            { cancelable: false },
        );
    };

    const deleteUser = async (userId: string) => {
        try {
            await apiDeleteUser(userId); 
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId)); 
        } catch (error) {
            console.error('Error deleting user:', error); 
            Alert.alert('Error', 'Failed to delete user. Please try again.');
        }
    };

    return (
        <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddUser} style={styles.iconButton}>
                    <Icon name="person-add-sharp" size={34} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>User List:</Text>
            {users.length === 0 ? (
                <Text style={styles.noUsersText}>No users available</Text>
            ) : (
                <FlatList
                    data={users}
                    //keyExtractor={user => user.id}
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[styles.userItem, colorScheme === 'dark' ? styles.darkUserItem : styles.lightUserItem]} 
                            onPress={() => navigation.navigate('UserDetail', { userId: item.id, userData: item })}
                            onLongPress={() => showActionSheet(item)}
                        >
                            <Text style={[styles.userText, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>
                                {item.name} 
                            </Text>
                        </TouchableOpacity>
                    )}
                />

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    iconButton: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    noUsersText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
    },
    userItem: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    lightContainer: {
        backgroundColor: '#f5f5f5',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    lightUserItem: {
        backgroundColor: '#fff',
    },
    darkUserItem: {
        backgroundColor: '#444',
    },
    userText: {
        fontSize: 18,
    },
    lightText: {
        color: '#000',
    },
    darkText: {
        color: '#fff',
    },
});

export default UserList;
