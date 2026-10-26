import { ReactElement } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Text from "./Text";
import sampleData from "../sampleData/data";
import { Idata } from "../interfaces";
import theme from "../theme";


const LogInfo = (): ReactElement => {

    const data: Idata = sampleData; 

    return (
        <View>
            <Text style={styles.title}>Log Info</Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                {/* TODO: map somehow, no hardcoded blocks */}
                <View style={styles.boxInfo}>
                    <Text>{data.bbmiMetric}</Text>
                </View>
                    <View style={styles.boxInfo}>
                    <Text>{data.height}</Text>
                </View>
                <View style={styles.boxInfo}>
                    <Text>{data.currentWeight}</Text>
                </View>
                <View style={styles.boxInfo}>
                    <Text>{data.currentWeight}</Text>
                </View>
                <View style={styles.boxInfo}>
                    <Text>{data.currentWeight}</Text>
                </View>
                <View style={styles.boxInfo}>
                    <Text>{data.currentWeight}</Text>
                </View>
                <View style={styles.boxInfo}>
                    <Text>{data.currentWeight} long text data</Text>
                </View>
                <View style={styles.boxInfo}>
                    <Text>{data.currentWeight}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    boxInfo: {
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: 'flex-start',
        justifyContent: "center",
        margin: 10,
        padding: 60,
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius
    }

})

export default LogInfo;