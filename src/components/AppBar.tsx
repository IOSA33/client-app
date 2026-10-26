import { View, StyleSheet, ScrollView } from 'react-native';
import { ReactElement } from 'react';

import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.AppBarBackground,
        flexDirection: 'row',
    },
});

const AppBar = (): ReactElement => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab LinkTo="/"> Home </AppBarTab>
            </ScrollView>
        </View>
    );
};

export default AppBar;