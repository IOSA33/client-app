import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from 'react-router-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query'
import MainPage from "./MainPage";
import AppBar from "./AppBar";
import LogInfo from "./LogInfo";
import Profile from "./Profile";
import SignIn from "./SignIn";
import Text from "./Text";
import requestUserService from "../services/request"


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        margin: 15
    }
})

const Main = (): ReactElement => {
    const result = useQuery({
        queryKey: ["userData"],
        queryFn: requestUserService.getUserData
    })
    const insets = useSafeAreaInsets();

    console.log(JSON.parse(JSON.stringify(result)))
 
    if (result.isPending) {
        return <Text>loading...</Text>
    }

    return (
        <View style={styles.container}>
        <View style={styles.content}>
            <SafeAreaView>
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
                <Route path="/" element={<MainPage />}/>
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/loginfo" element={<LogInfo />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
            </SafeAreaView>
        </View>

        <View style={{ paddingBottom: insets.bottom }}>
            <AppBar />
        </View>
        </View>
    )
};
export default Main;