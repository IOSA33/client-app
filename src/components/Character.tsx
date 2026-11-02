import { ReactElement } from "react";
import { View, Image, StyleSheet } from "react-native";
import character from "../../assets/character.png"

const Character = (): ReactElement => {
    return (
        <View>
           <Image
            source={character}
            style={styles.image}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
    }
})

export default Character;