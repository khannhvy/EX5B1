import React, { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import UserList from '../../components/UserList';
import AddUserScreen from '../../screens/AddUserScreen';
import EditUser from '../../components/EditUser';
import { getUsers } from '../../api/userApi';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { UserProvider } from '../../api/UserContext';
import UserDetail from '@/components/UserDetail';

interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

type RootStackParamList = {
    UserList: undefined;
    AddUser: undefined; 
    EditUser: { userId: string; userData: User };
    UserDetail: { userId: string; userData: User }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getUsers();
            setUsers(usersData);
        };

        fetchUsers();
    }, []);

    const updateUsers = (updatedUser: User) => {
        setUsers((prevUsers) => 
            prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
        );
    };

    return (
        <UserProvider>
            <ActionSheetProvider>
                <NavigationContainer independent={true}>
                    <Stack.Navigator initialRouteName="UserList">
                        <Stack.Screen name="UserList">
                            {(props) => (
                                <SafeAreaView style={{ flex: 1 }}>
                                    <UserList {...props} users={users} setUsers={setUsers} />
                                </SafeAreaView>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="AddUser">
                            {(props) => (
                                <AddUserScreen {...props} setUsers={setUsers} />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="EditUser">
                            {(props) => (
                                <EditUser {...props} updateUser={updateUsers} />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="UserDetail" component={UserDetail} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ActionSheetProvider>
        </UserProvider>
    );
};

export default App;
