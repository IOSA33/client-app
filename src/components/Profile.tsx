import { ReactElement, useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Tools/Text";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import { useAuth } from "../hooks/useAuth";
import { clearToken } from "../services/token";
import { useQueryClient } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { Idata } from "../interfaces";

const Profile = (): ReactElement => {
    const navigate = useNavigate()
    const { getAllData, addDataHeight, addDataWeight, deleteDB } = useDatabase();
    const { result } = useAuth();
    const queryClient = useQueryClient();
    const [info, setInfo] = useState<Idata[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            try {
                const data = await getAllData();
                setInfo(data);
            } catch (e) {
                console.error(e);
            }
        };

        void getData();
    }, [getAllData, refresh])

    if (result.isPending) return <View><Text>loading...</Text></View>

    return (
        <View>
            <Text style={styles.title}>Profile</Text>
            <Text fontSize="subheading">username: {result.data?.username}</Text>

            <Text>Basic Informatin</Text>
            <Text>Height: {info[0]?.height}</Text>
            <Pressable onPress={() => addDataHeight(178)}><Text>Add height</Text></Pressable>
            <Text>Weight: {info[0]?.weight}</Text>
            <Pressable onPress={async () : Promise<void> => { 
                await addDataWeight(75)
                setRefresh(!refresh)
            }}><Text>Add Weight</Text></Pressable>
            
            {/* <Pressable onPress={() => deleteDB()}><Text>Delete db</Text></Pressable> */}
            <Pressable onPress={async (): Promise<void> => 
            {
                await getAllData()
                setRefresh(!refresh)
            }
            }><Text>Get all data</Text></Pressable>

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