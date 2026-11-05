import { ReactElement } from "react";
import Text from "../Text";
import { View } from "react-native";
import { Link } from "react-router-native";

const SignUp = () : ReactElement => {
    return (
        <View>
            <Text>SignUp</Text>

            <Link to={"/signin"}><Text>Login to an account</Text></Link>
        </View>
    )
}

export default SignUp;