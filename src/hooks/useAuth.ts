
// HERE we are going to handle the register and login logic 
// Should return auth token?

import { useMutation, useQueryClient } from "@tanstack/react-query"
import authService from "../services/authService"
import { IAuth } from "../interfaces";

// type: login - register - reset
type authrequest = "login" | "register" | "reset"

interface ReturnResponse {
    login: 
}
// FIX: return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = (type: authrequest) => {
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: authService.loginUser,
        onSuccess: (data) => {

        },
        onError: (error) => {

        },
    })

    const registerMutation = useMutation({
        mutationFn: authService.loginUser,
        onSuccess: (data) => {

        },
        onError: (error) => {

        },
    })

    const resetMutation = useMutation({
        mutationFn: () => {},
        onSuccess: (data) => {

        },
        onError: (error) => {

        },
    })

    return {
        login: (userObject: IAuth): void => {loginMutation.mutate(userObject)},
        register: (userObject: IAuth): void => {registerMutation.mutate(userObject)},
        reset: (email: string): void => {resetMutation.mutate()}
    }
}