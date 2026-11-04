import { ReactElement } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity } from "../schema/validationSchemas";

import Text from "./Text";
import theme from "../theme";

type FormValues = {
  activity: string
}

const AddActivity = (): ReactElement => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(Activity),
        defaultValues: { activity: "" },
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    }

    return (
    <View>
      <Text>Add todays Activity</Text>

      <Controller
        control={control}
        name="activity"
        rules={{ required: "activity is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Activity"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.activity && <Text>{errors.activity.message}</Text>}

      <Pressable
      style={styles.button}
        onPress={() => {
          void handleSubmit(onSubmit)();
        }}
      >
        <Text>Submit</Text>
      </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: theme.borders.borderRadius,
    padding: 10,
  },
  button: {
    backgroundColor: "purple",
    padding: 12,
    borderRadius: theme.borders.borderRadius,
    alignItems: "center",
    marginTop: 12,
  },
});

export default AddActivity;