import { ReactElement, useState } from "react";
import Text from "../Tools/Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Link } from "react-router-native";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import theme from "../../theme";
import { IAuthRegister } from "../../interfaces";
import { useAuth } from "../../hooks/useAuth";

type FormValues = {
    username: string,
    email: string,
    password: string,
    passwordAgain: string
}

const SignUp = (): ReactElement => {
    const { register } = useAuth();

    const { control, handleSubmit, formState: { errors }} = useForm<FormValues>({
        defaultValues: { 
            username: "",
            email: "",
            password: "",
            passwordAgain: ""
         }
    });
    const [isHidden, setIsHidden] = useState(true);
    const [loginButtonPressed, setLoginButtonPressed] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const object: IAuthRegister = {
            username: data.username,
            password: data.password,
            email: data.email
        };

        register(object);
    }

    return (
        <View style={styles.container}>
            <Text fontWeight="bold" fontSize="subheading" style={styles.subheadingText}>Create your new Account</Text>

            {/* username */}
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
            {errors.username && <Text style={styles.error}>Username is required</Text>}
            
            {/* email */}
            <Controller 
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    placeholder="email@email.com"
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value} 
                />
                )}
            />
            {errors.email && <Text style={styles.error}>Email is required</Text>}
            
            {/* password */}
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

            {/* password again */}
            <Controller 
                control={control}
                name="passwordAgain"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.passwordContainer]}>
                    <TextInput
                        placeholder="password again"
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
            {errors.passwordAgain && <Text style={styles.error}>PasswordAgain is required</Text>}
            
            <Pressable
                style={[styles.button, loginButtonPressed && styles.pressedButton, !loginButtonPressed && styles.unPressedButton]} 
                onPress={() => {void handleSubmit(onSubmit)();}}
                onPressIn={() => {setLoginButtonPressed(true)}}
                onPressOut={() => {setLoginButtonPressed(false)}}
                >
                
                <Text color="white" fontWeight="bold">Register</Text>
            </Pressable>
            <Link to={"/signin"} underlayColor="white" style={styles.linkContainer}><Text style={styles.linkText}>Login to your account</Text></Link>
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
        backgroundColor: "#2f65bd",
    },
    unPressedButton: {
        backgroundColor: "#6397eb",
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

export default SignUp;