import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface UserDetailProps {
    route: RouteProp<{ params: { userId: string; userData: { name: string; email: string; age: number } } }, 'params'>;
}

const UserDetail: React.FC<UserDetailProps> = ({ route }) => {
    const { userData } = route.params;
    const colorScheme = useColorScheme(); 

    return (
        <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.name, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>{userData.name}</Text>
            
            <View style={[styles.detailContainer, colorScheme === 'dark' ? styles.darkDetail : styles.lightDetail]}>
                <Icon name="mail" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                <Text style={[styles.detailText, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>
                    {userData.email}
                </Text>
            </View>
            
            <View style={[styles.detailContainer, colorScheme === 'dark' ? styles.darkDetail : styles.lightDetail]}>
                <Icon name="calendar" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                <Text style={[styles.detailText, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>
                    {userData.age}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        justifyContent: 'center',
        paddingBottom:450,
    },
    lightContainer: {
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc', 
    },
    lightDetail: {
        backgroundColor: '#fff',
    },
    darkDetail: {
        backgroundColor: '#444',
        borderColor: '#666',
    },
    detailText: {
        fontSize: 18,
        marginLeft: 10,
    },
    lightText: {
        color: '#000',
    },
    darkText: {
        color: '#fff',
    },
});

export default UserDetail;
