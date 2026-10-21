import { ReactElement } from "react";
import { Text, View } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Main = (): ReactElement => {
    return (
        <View>
            {/* TODO: here is coming navigation bar */}


            {/* TODO: pages, for now only:
                    2. main page with general info
                    3. account info
                    4. register and login
                    5. and settings fro theme change
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