import { Text, View } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Main = () => {
    return (
        <View>
            {/* TODO: here is coming navigation bar */}


            {/* TODO: pages, for now only four
                    main page with general info
                    account info
                    register and login
                    and settings fro theme change
            */}
            <SafeAreaProvider>
                <SafeAreaView>

                    {/*TODO: Main Page should render info about users days info
                        also his basic info...
                    */}
                    <Text> Main </Text>
                </SafeAreaView>
            </SafeAreaProvider>

        </View>
    )
};

export default Main;