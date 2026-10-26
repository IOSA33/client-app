import { GestureResponderEvent, Pressable, StyleSheet, TextStyle } from "react-native";
import { Link } from "react-router-native";
import { PropsWithChildren, ReactElement } from 'react';

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  text: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  } as TextStyle,
});

type IProps = PropsWithChildren<{
    LinkTo: string,
    onPress?: (event: GestureResponderEvent) => void,
}>;

const AppBarTab = ({ children, LinkTo, onPress }: IProps): ReactElement => {
  if (LinkTo) {
    return (
      <Link to={LinkTo} onPress={onPress} style={styles.tab}>
        <Text style={styles.text}>{children}</Text>
      </Link>
    );
  }

  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default AppBarTab;