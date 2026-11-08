import { ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Tools/Text";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import { useAuth } from "../hooks/useAuth";
import { clearToken } from "../services/token";
import { useQueryClient } from "@tanstack/react-query";

const Profile = (): ReactElement => {
    const navigate = useNavigate()
    const { result } = useAuth();
    const queryClient = useQueryClient();

    if (result.isPending) return <View><Text>loading...</Text></View>

    return (
        <View>
            <Text style={styles.title}>Profile</Text>
            <Text fontSize="subheading">username: {result.data?.username}</Text>

            {/* Here is going the whole activity by years*/}
            <Text>Look Activity</Text>

            {/* Beta version: Optional id user wants to sync with server */}
            <View>
                <Text fontWeight="bold" fontSize="subheading" > Want to save the logs? </Text>
                {!result.data && <Pressable style={styles.signInButton} onPress={() => { navigate("/signin") }}>
                    <Text style={{color: "white"}}>REGISTER OR SIGNIN</Text>
                </Pressable>}
                
                {result.data && <Pressable style={styles.signInButton} onPress={ async () => { 
                    await clearToken();
                    queryClient.removeQueries({ queryKey: ["me"] });
                    navigate("/profile");
                }}>
                    <Text style={{color: "white"}}>Logout</Text>
                </Pressable>}
            </View>
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