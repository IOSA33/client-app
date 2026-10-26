import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import { Idata } from "../interfaces";
import sampleData from "../sampleData/data";

const ProgressBar = (): ReactElement => {
    const data: Idata = sampleData;
    
    const showProgressList: number[] = [0, 0, 0, 0, 0, 0, 0];
    data.weekData.forEach((day) => {
        showProgressList[day] = 1;
    });

    return (
        <View>
            <View style={styles.progressBarContainer}>
                <Text fontWeight="bold">Your Activity this week</Text>
                <View style={styles.progressBar}>
                    {showProgressList.map((day, index) => (
                        <Square key={index} done={day === 1} />
                    ))}
                </View>
            </View>

        </View>
    )
}

const Square = ({ done }: { done: boolean }): ReactElement => {
    if (done) return <View style={[styles.square, styles.squareGreen]} />
    return <View style={[styles.square, styles.squareGrey]} />
};


const styles = StyleSheet.create({
    square: {
        width: 20,
        height: 20,
        margin: 5,
        borderWidth: 1.2,
        borderRadius: 6
    },
    squareGrey: {
        backgroundColor: 'lightgrey',
    },
    squareGreen: {
        backgroundColor: 'green',
    },
    progressBar: {
        flexDirection: "row",
    },
    progressBarContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
});

export default ProgressBar;