import { ReactElement } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "../Tools/Text";
import { Link, useLocation, useNavigate } from "react-router-native";
import { Controller, useForm } from "react-hook-form";
import useDatabase from "../../hooks/useDatabase";
import theme from "../../theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { IChangeValue } from "../../schema/validationSchemas";
import * as z from "zod";

interface ChangeSetting {
    change: string,
    currentValue: string,
    execute: string
}

type FormInput = z.input<typeof IChangeValue>;
type FormOutput = z.output<typeof IChangeValue>;


// TODO: Paramets of chanding dome fucntion for db 
// and props for some info
const OneSetting = (): ReactElement => {
    const {control, handleSubmit, formState: {errors}} = useForm<FormInput, unknown, FormOutput>({
        defaultValues: {
            newValue: ""
        },
        resolver: zodResolver(IChangeValue)
    })
    const navigate = useNavigate();
    const location = useLocation();

    // const { db } = useDatabase();

    const stateFromSettings = location.state as ChangeSetting | null
    if (stateFromSettings === null) {
        return <Text>Change settings from setting page :)</Text>
    }

    const onSubmit = (): void => {
        navigate("/profile");
        // stateFromSettings.execute
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Link to={"/settings"} style={[styles.button, {backgroundColor: "#ed3277"}]} underlayColor={"#db5888"}>
                    <Text color="white">Cancel</Text>
                </Link>

            </View>

            <View style={styles.form}>
                <View>
                    <Text>You are Changing: <Text fontWeight="bold">{stateFromSettings.change}</Text></Text>
                    <Text>Current Value: <Text fontWeight="bold">{stateFromSettings.currentValue}</Text></Text>
                </View>

                {errors.newValue && <Text style={styles.error}>{errors.newValue.message}</Text>}
                <Controller 
                    control={control}
                    name="newValue"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Set new value"
                        onBlur={onBlur}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="decimal-pad"
                    />
                    )}
                />
                <Pressable onPress={() => {void handleSubmit(onSubmit)();}} style={[styles.button, { backgroundColor: "#5a78f2" }]}>
                    <Text color="white">Save</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius,
        padding: 15,
        marginTop: 8,
    },
    error: {
        color: "red"
    },
    buttons: {
        flexDirection: "row"
    },
    form: {
        flex: 1,
        justifyContent: "center"
    },
    button: {
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
});

export default OneSetting;