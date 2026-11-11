import { ReactElement } from "react";
import { Keyboard, Platform, Pressable, StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from 'react-router-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useQuery } from '@tanstack/react-query'
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import Animated, { FadeIn } from "react-native-reanimated";


import MainPage from "./MainPage";
import AppBar from "../AppBar/AppBar";
import LogInfo from "../LogInfo";
import Profile from "../Profile";
import SignIn from "../Auth/SignIn";
import Text from "../Tools/Text";
// import requestUserService from "../services/request"
import AddActivity from "../Activity/AddActivity";
import SignUp from "../Auth/SignUp";
import ForgotPassword from "../Auth/ForgotPassword";
import AddProfileSettings from "../Activity/AddProfileSettings";

const Main = (): ReactElement => {
    // const result = useQuery({
    //     queryKey: ["userData"],
    //     queryFn: requestUserService.getUserData
    // })
    const insets = useSafeAreaInsets();

    // console.log(JSON.parse(JSON.stringify(result)))
 
    // if (result.isPending) {
    //     return <Text>loading...</Text>
    // }

    return (
        <View style={styles.container}>
        <View style={styles.content}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>

            <Text fontSize="subheading" fontWeight="bold">Gym Db.</Text>

            <SQLiteProvider databaseName="test.db" onInit={migrateDb}>
                <Routes>
                {/* TODO: pages, for now only:
                        2. main page with general info
                        3. account info
                        4. register and login
                        5. and settings fro theme change
                */}
                
                {/*TODO: Main Page should render info about users days info
                    also his basic info...
                */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/loginfo" element={<LogInfo />} />
                    
                    <Route path="/profile" element={
                        <Animated.View entering={FadeIn.duration(130)} style={{flex: 1}}>
                            <Profile />
                        </Animated.View>
                    } />
 
                    <Route path="/signin" element={
                        <Pressable style={{ flex: 1 }} onPress={() => {if (Platform.OS !== 'web') Keyboard.dismiss();}} accessible={false}>
                            <SignIn />
                        </Pressable>} />

                    <Route path="/signup" element={
                        <Pressable style={{ flex: 1 }} onPress={() => {if (Platform.OS !== 'web') Keyboard.dismiss();}} accessible={false}>
                            <SignUp />
                        </Pressable>
                        } />
                    <Route path="/reset" element={
                        <Pressable style={{ flex: 1 }} onPress={() => {if (Platform.OS !== 'web') Keyboard.dismiss();}} accessible={false}>
                            <ForgotPassword />
                        </Pressable>
                        } />
                    
                    <Route path="/addactivity" element={<AddActivity />} />
                    <Route path="/settings" element={<AddProfileSettings />} />
                    {/* TODO: FEEDBACK page */}
                    {/* <Route path="/feedback" element={<Feedback />} /> */}

                </Routes>
            </SQLiteProvider>

            </SafeAreaView>
        </View>

        <View style={{ paddingBottom: insets.bottom }}>
            <AppBar />
        </View>
        </View>
    )
};

const migrateDb = async (db: SQLiteDatabase): Promise<void> => {
    console.log("Database: Created or opened successfully.")
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS userStats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            height INTEGER DEFAULT 1,
            weight INTEGER DEFAULT 1
        );
    `);
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        margin: 15,
    },
    safeArea: {
        flex: 1,
    }
})

export default Main;