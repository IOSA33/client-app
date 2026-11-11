import { ReactElement, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Link } from "react-router-native";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { IAuthResetZod } from "../../schema/validationSchemas";
import Text from "../Tools/Text";
import theme from "../../theme";


type FormValues = {
    email: string,
}

const ForgotPassword = (): ReactElement => {
    const { control, handleSubmit, formState: { errors }} = useForm<FormValues>({
        defaultValues: { 
            email: ""
        },
        resolver: zodResolver(IAuthResetZod)
    });
    const [loginButtonPressed, setLoginButtonPressed] = useState(false);


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    }

    return (
        <View style={styles.container}>
            <Text fontWeight="bold" fontSize="subheading" style={styles.subheadingText}>Enter your Email</Text>
            <Text>(if it exists we will sent you a link)</Text>

            <Controller 
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value} 
                />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
           
            <Pressable
                style={[styles.button, loginButtonPressed && styles.pressedButton, !loginButtonPressed && styles.unPressedButton]} 
                onPress={() => {void handleSubmit(onSubmit)();}}
                onPressIn={() => {setLoginButtonPressed(true)}}
                onPressOut={() => {setLoginButtonPressed(false)}}
                >
                
                <Text color="white" fontWeight="bold">Sent</Text>
            </Pressable>
            
            <Link to={"/signin"} underlayColor="white" style={styles.linkContainer}><Text style={styles.linkText}>Back to login</Text></Link>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"      
    },
    subheadingText: {
        marginBottom: 7
    },
    error: {
        color: "red"
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius,
        padding: 15,
        marginTop: 8,
    },
    passwordInput: {
        borderRadius: theme.borders.borderRadius,
        flex: 1,
        padding: 15,
    },
    pressedButton: {
        backgroundColor: "#ff33b6",
    },
    unPressedButton: {
        backgroundColor: "#c26ba3",
    },
    button: {
        padding: 15,
        borderRadius: theme.borders.borderRadius,
        alignItems: "center",
        marginTop: 12,
        marginBottom: 5
    },
    linkText: {
        color: "blue",
    },
    linkContainer: {
        alignSelf: 'flex-start',
        marginBottom: 4
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: theme.borders.borderRadius,
        marginTop: 8,
    },
    showPassword: {
        paddingHorizontal: 15,
    }
});

export default ForgotPassword;
