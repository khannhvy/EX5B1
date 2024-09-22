import React from 'react';
import { SafeAreaView } from 'react-native';
import UserForm from '../components/UserForm';

const AddUserScreen = ({ navigation, setUsers }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <UserForm navigation={navigation} setUsers={setUsers} />
        </SafeAreaView>
    );
};

export default AddUserScreen;
