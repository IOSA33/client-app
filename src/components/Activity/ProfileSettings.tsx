import { ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../Tools/Text";
import { Link } from "react-router-native";
import theme from "../../theme";

const ProfileSettings = (): ReactElement => {
    return (
        <View>
            {/* Header */}
            <View style={styles.header}>
                <Link to={"/profile"} style={styles.back} underlayColor={"purple"}>
                    <Text>Back</Text>
                </Link>
                
                <View>
                    <Text style={{fontSize: 25, fontWeight: "bold"}}>Settings</Text>
                </View>
            </View>

            <Text style={styles.betweenText}>Change basic informain (Click to edit)</Text>

            <View style={styles.containerBasicInfo}>
                <Pressable style={styles.boxInfo}>
                    <Text> Weight </Text>
                    <Text> Some Info </Text>
                </Pressable>
                <Pressable style={styles.boxInfo}>
                    <Text> Height </Text>
                    <Text> Some Info </Text>
                </Pressable>
                <Pressable style={styles.boxInfo}>
                    <Text> Water </Text>
                    <Text> Some Info </Text>
                </Pressable>
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
        padding: 5,
        borderRadius: theme.borders.borderRadius
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