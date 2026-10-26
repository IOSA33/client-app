import { ReactElement } from "react";
import { View } from "react-native";
import { Route, Routes, Navigate } from 'react-router-native';
import MainPage from "./MainPage";
import AppBar from "./AppBar";

const Main = (): ReactElement => {
    return (
        <View>
        <AppBar />

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
            </Routes>
        </View>
    )
};

export default Main;