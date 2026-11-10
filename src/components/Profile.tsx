import { ReactElement, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Tools/Text";
import { Link, useNavigate } from "react-router-native";
import theme from "../theme";
import { useAuth } from "../hooks/useAuth";
import { clearToken } from "../services/token";
import { useQueryClient } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { Idata } from "../interfaces";

const Profile = (): ReactElement => {
    const navigate = useNavigate()
    const { getAllData, addDataHeight, addDataWeight } = useDatabase();
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

    const calculateBmi = useMemo((): number => {
        const { height, weight } = info[0] ?? {};
        if (!height || !weight) return 0;
        const num: number = weight / ((height / 100) * (height / 100));
        const roundedNum: number = Number(num.toFixed(2));
        return roundedNum;
    }, [info])
    
    if (result.isPending) return <View><Text>loading...</Text></View>

    return (
        <View style={styles.seperateViews}>
            {/* SignIn or Register */}
            {!result.data &&
                <View style={styles.buttonBoxNotMargin}>
                    <Text fontWeight="bold" fontSize="subheading" style={{marginBottom: 10}} >Want to save the data or get access on other device? </Text>
                
                    <Link to="/signin" style={styles.signInButton} underlayColor="#63f77c">
                        <Text style={{color: "white"}} fontWeight="bold">REGISTER OR SIGN IN</Text>
                    </Link>
                </View>
            }

            {result.data && 
                <View style={[styles.buttonBoxNotMargin, { marginTop: 10 }]}>
                    <Text fontSize="subheading">Welcome back: <Text fontWeight="bold" fontSize="subheading">{result.data.username}</Text></Text>
                </View>
            }

            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <Link to="/settings" style={styles.settingsButton} underlayColor="#ff8080"><Text color="white">Settings</Text></Link>
                </View>

                <Text fontWeight="bold">Basic Informatin</Text>
                <Text>Height: {info[0]?.height} cm</Text>
                <Text>Weight: {info[0]?.weight} kg</Text>
                <Text>BMI: {calculateBmi}</Text>

                <Text fontWeight="bold">Look Activity</Text>
                <Text>10101010101001010101010011</Text>
                <Text>10101010101001010101010011</Text>
                <Text>10101010101001010101010011</Text>
                <Text>10101010101001010101010011</Text>

                {result.data && <Pressable style={styles.syncButton}>
                    <Text color="white">
                        Sync your data
                    </Text>
                </Pressable>}
            </View>
            
            {/* Logout */}
            {result.data &&
                <View style={styles.buttonBox}>
                    <Text fontWeight="bold" fontSize="subheading" style={{marginBottom: 10}} >Want to Logout?</Text>

                    <Pressable style={styles.signInButton} onPress={ async () => { 
                    await clearToken();
                    queryClient.removeQueries({ queryKey: ["me"] });
                    navigate("/profile");
                    }}>
                    <Text color="white">Logout</Text>
                    </Pressable>
                </View>
            }
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
        backgroundColor: theme.colors.MainBackground,
        borderRadius: theme.borders.borderRadius,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        alignSelf: 'flex-start',
    },
    buttonBoxNotMargin: {
        borderWidth: 1.5,
        borderRadius: theme.borders.borderRadius,
        padding: 10,
    },
    buttonBox: {
        borderWidth: 1.5,
        borderRadius: theme.borders.borderRadius,
        padding: 10,
        marginTop: 'auto'
    },
    seperateViews: {
        flex: 1,        
    },
    settingsButton: {
        borderWidth: 1,
        backgroundColor: "#a7d19d",
        borderRadius: theme.borders.borderRadius,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginLeft: "auto"
    },
    syncButton: {
        borderWidth: 1,
        backgroundColor: "#f39e69",
        borderRadius: theme.borders.borderRadius,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        alignSelf: 'flex-start',
        marginTop: 20
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
    }
});

export default Profile;