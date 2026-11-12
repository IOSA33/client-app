import { ReactElement, useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Link } from "react-router-native";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IAuth } from "../../interfaces";
import { IAuthZod } from "../../schema/validationSchemas";
import { useAuth } from "../../hooks/useAuth";
import theme from "../../theme";
import Text from "../Tools/Text";

type FormValues = {
    username: string,
    password: string
}

const SignIn = (): ReactElement => {
    const { login, loginError, loginIsError, loginReset } = useAuth();

    const { control, handleSubmit, formState: { errors }} = useForm<FormValues>({
        defaultValues: { 
            username: "",
            password: ""
        },
        resolver: zodResolver(IAuthZod)
    });
    const [isHidden, setIsHidden] = useState(true);
    const [loginButtonPressed, setLoginButtonPressed] = useState(false);

    useEffect(() => {
        if(!loginIsError) return;

        const timer = setTimeout(() => {
            loginReset();
        }, 4000);

        return () : void => { clearTimeout(timer) };
    }, [loginIsError, loginReset])

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const object: IAuth = {
            username: data.username,
            password: data.password
        }
        
        login(object);
    }

    return (
        <View style={styles.container}>
            <Text fontWeight="bold" fontSize="subheading" style={styles.subheadingText}>Log in to your account</Text>

            {loginIsError && <Text style={{color: "red" }}>{loginError?.message}</Text>}
            <Controller 
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    placeholder="username"
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value} 
                />
                )}
            />
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
            
            <Controller 
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.passwordContainer]}>
                    <TextInput
                        placeholder="password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={isHidden}
                        textContentType="password" // IOS
                        autoComplete="password"
                        style={styles.passwordInput}
                    />
                    <Text style={styles.showPassword} onPress={() => {setIsHidden(!isHidden)}}>{isHidden ? "Show": "Hide"}</Text>
                </View>
                )}
            />
            {errors.password && <Text style={styles.error}>Password is required</Text>}
            
            <Pressable
                style={[styles.button, loginButtonPressed && styles.pressedButton, !loginButtonPressed && styles.unPressedButton]} 
                onPress={() => {void handleSubmit(onSubmit)();}}
                onPressIn={() => {setLoginButtonPressed(true)}}
                onPressOut={() => {setLoginButtonPressed(false)}}
                >
                
                <Text color="white" fontWeight="bold">Login</Text>
            </Pressable>
            
            <Link to={"/signup"} underlayColor="white" style={styles.linkContainer}><Text style={styles.linkText}>Create a new account</Text></Link>
            <Link to={"/reset"} underlayColor="white" style={styles.linkContainer}><Text style={styles.linkText}>Forgot Password?</Text></Link>
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
        backgroundColor: "#ffe863",
    },
    unPressedButton: {
        backgroundColor: "orange",
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

export default SignIn;