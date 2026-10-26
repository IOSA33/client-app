import { ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import sampleData from '../sampleData/data';
import Text from "./Text";
import { Idata } from "../interfaces";
import { useNavigate } from "react-router-native";
import theme from "../theme";

const Profile = (): ReactElement => {
    const navigate = useNavigate()
    // Move to props later with backend
    const userData: Idata = sampleData; 

    return (
        <View>
            <Text style={styles.title}>Profile</Text>
            <Text fontSize="subheading">username: {userData.username}</Text>

            <Pressable style={styles.signInButton} onPress={() => { navigate("/signin") }}>
                <Text style={{color: "white"}}>REGISTER OR SIGNIN</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    signInButton: {
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius,
        backgroundColor: theme.colors.MainBackground,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        alignSelf: 'flex-start',
    }
});

export default Profile;