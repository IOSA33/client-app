import { ReactElement } from "react";
import { Pressable } from "react-native";
import Text from "./Text";

const AddButton = (): ReactElement => {
    return (
        <Pressable>
            <Text>Add activity</Text>
        </Pressable>
    )
}

export default AddButton;