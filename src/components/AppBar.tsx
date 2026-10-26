import { View, StyleSheet, ScrollView } from 'react-native';
import { ReactElement } from 'react';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.AppBarBackground,
        flexDirection: 'row',
    },
});

const AppBar = (): ReactElement => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab LinkTo="/"> Home </AppBarTab>
                <AppBarTab LinkTo="/"> LogInfo </AppBarTab>
                <AppBarTab LinkTo="/"> Profile </AppBarTab>

            </ScrollView>
        </View>
    );
};

export default AppBar;