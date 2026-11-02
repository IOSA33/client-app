import { ReactElement } from "react";
import { StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { Link } from "react-router-native";

const AddButton = (): ReactElement => {
    return (
        <Link to="/addactivity" style={styles.addButton}>
            <Text>Add activity</Text>
        </Link>
    )
}

const styles = StyleSheet.create({
    addButton: {
        marginTop: "auto",
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 1,
        padding: 30,
        borderRadius: theme.borders.borderRadius
    },
})

export default AddButton;