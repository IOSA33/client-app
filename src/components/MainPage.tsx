import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import ProgressBar from "./ProgressBar";

const MainPage = (): ReactElement => {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text fontWeight="bold">Progress</Text>
            </View>

            {/*  a line*/}
            <Line />
            
            {/* progress bar*/}
            <ProgressBar />

            {/*  */}
        </View>
    )
}

const Line = (): ReactElement => <View style={styles.line} />;

const styles = StyleSheet.create({
    container: {

    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    line: {
        height: 1.5,
        backgroundColor: 'lightgrey',
        alignSelf: 'stretch',
    },
})

export default MainPage;