import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import authService from "../services/authService"
import { IAuth } from "../interfaces";
import {    saveToken } from "../services/token";
import { useNavigate } from "react-router-native";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const result = useQuery({
        queryKey: ['me'],
        queryFn: authService.getMe,
        retry: false
    })

    const loginMutation = useMutation({
        mutationFn: authService.loginUser,
        onSuccess: async (data) => {
            await saveToken(data.token);
            console.log(data.token)
            await queryClient.invalidateQueries({ queryKey: ["me"] });
            navigate("/profile");
        },
        onError: (error) => {
            console.log("Login failed:", error.message);
        },
    })

    // const registerMutation = useMutation({
    //     mutationFn: authService.loginUser,
    //     onSuccess: (data) => {

    //     },
    //     onError: (error) => {

    //     },
    // })

    // const resetMutation = useMutation({
    //     mutationFn: () => {},
    //     onSuccess: (data) => {

    //     },
    //     onError: (error) => {

    //     },
    // })

    return {
        login: (userObject: IAuth): void => { loginMutation.mutate(userObject) },
        result: result
        // register: (userObject: IAuth): void => { registerMutation.mutate(userObject) },
        //reset: (email: string): void => {resetMutation.mutate()}
    }
}