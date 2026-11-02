import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import ProgressBar from "./ProgressBar";
import Character from "./Character";
import AddButton from "./AddButton";

const MainPage = (): ReactElement => {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text fontWeight="bold">Progress</Text>
            </View>

            {/* a line*/}
            <Line />
            
            {/* progress bar*/}
            <ProgressBar />

            {/* Some animation */}
            <Character />

            <View style={styles.addButton}>
                {/* Add button */}
                <AddButton />
            </View>
        </View>
    )
}

const Line = (): ReactElement => <View style={styles.line} />;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    line: {
        height: 1.5,
        backgroundColor: 'lightgrey',
        alignSelf: 'stretch',
    },
    addButton: {
        marginTop: "auto",
        marginBottom: 20,
        alignItems: "center"
    },
})

export default MainPage;