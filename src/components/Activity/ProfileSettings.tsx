import { ReactElement, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../Tools/Text";
import { Link } from "react-router-native";
import theme from "../../theme";
import useDatabase from "../../hooks/useDatabase";
import { Idata } from "../../interfaces";

const ProfileSettings = (): ReactElement => {
    const { getAllData } = useDatabase();
    const [info, setInfo] = useState<Idata[]>([]);
    const [refresh] = useState(false);

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
    
    return (
        <View>
            {/* Header */}
            <View style={styles.header}>
                <Link to="/profile" style={styles.back} underlayColor={"#77e0a5"}>
                    <Text color="white">Back</Text>
                </Link>
                
                <View>
                    <Text style={{fontSize: 25, fontWeight: "bold"}}>Settings</Text>
                </View>
            </View>

            <Text style={styles.betweenText}>Change basic informain (Click to edit)</Text>

            <View style={styles.containerBasicInfo}>
                <Link to="/onesetting" state={{change: "Weight", currentValue: info[0]?.weight ? info[0].weight : 0, execute: "weight"}} style={styles.boxInfo} underlayColor={"#6b9bed"}>
                    <View>
                        <Text> Weight </Text>
                        <Text> {info[0]?.weight ? info[0].weight : 0} kg </Text>
                    </View>
                </Link>
                <Link to="/onesetting" state={{change: "Height", currentValue: info[0]?.height ? info[0].height : 0, execute: "height"}} style={styles.boxInfo} underlayColor={"#6b9bed"}>
                    <View>
                        <Text> Height </Text>
                        <Text> {info[0]?.height ? info[0].height : 0} cm </Text>
                    </View>
                </Link>
                <Link to="/onesetting"  state={{change: "Water", currentValue: info[0]?.water ? info[0].water : 0, execute: "water"}} style={styles.boxInfo} underlayColor={"#6b9bed"}>
                    <View>
                        <Text> Water </Text>
                        <Text> {info[0]?.water ? info[0].water : 0} L </Text>
                    </View>
                </Link>
            </View>


            <Text style={styles.betweenText} >Change App Theme</Text>

            <View>

                <Pressable style={styles.boxInfo}>
                    <Text> Theme </Text>
                    <Text> Some Info </Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius,
        padding: 5
    },
    back: {
        position: "absolute",
        left: 5,
        padding: 8,
        borderRadius: theme.borders.borderRadius,
        backgroundColor: "#9aaed9"
    },
    containerBasicInfo: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    boxInfo: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: 'flex-start',
        justifyContent: "center",
        margin: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius
    },
    betweenText: {
        marginTop: 10,
        marginBottom: 10
    }
});

export default ProfileSettings;