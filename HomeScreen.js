import React from 'react';
import {
    SafeAreaView,
} from 'react-native';
import {
    // Divider,
    Layout,
    Text,
    // TopNavigation,
} from '@ui-kitten/components';

export const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <TopNavigation title='MyApp' alignment='center' /> */}
            {/* <Divider /> */}
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h1'>MeetPet</Text>
            </Layout>
        </SafeAreaView>
    );
};
