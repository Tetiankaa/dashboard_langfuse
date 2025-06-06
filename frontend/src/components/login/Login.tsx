import {
    Alert,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

import styles from "./login.module.css";
import { authService } from "../../services";
import { loginSchema } from "../../validators/user.validator.ts";
import type { ILoginData } from "../../interfaces";

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>('');

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

    const {register, handleSubmit, formState: { errors }} = useForm<ILoginData>({mode: 'onBlur', resolver: joiResolver(loginSchema)});

    const handleLoginSubmit = async ({email, password}: ILoginData) => {
        setPending(true);

        try {
            await authService.login({email, password});

            navigate("/dashboard");
        } catch (e: any) {
            setApiError(e?.response?.data?.message ||
                e?.response?.data ||
                e?.message ||
                'Unexpected error')
        }

        setPending(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h2>LOGIN</h2>
                    <p>Please enter your details to sign in</p>
                </div>
                <form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <TextField id="outlined-basic" label="Email" {...register("email")} variant="outlined" required/>
                    <FormControl fullWidth variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{mr: 0.5}}
                                    >
                                        {showPassword ? <FiEyeOff/> : <FiEye/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button type={pending ? 'button' : 'submit'} variant="contained"
                            className={pending ? styles.disable : styles.button}>{pending ? 'Submitting...' : 'Submit'}</Button>

                    {
                        errors?.email &&
                        (
                            <Alert variant="filled" severity="error" sx={{mt: 1}}>
                                {errors.email.message}
                            </Alert>
                        )
                    }
                    {
                        errors?.password &&
                        (
                            <Alert variant="filled" severity="error" sx={{mt: 1}}>
                                {errors.password.message}
                            </Alert>
                        )
                    }
                    {
                        apiError &&
                        (
                            <Alert variant="filled" severity="error" sx={{mt: 1}}>
                                {apiError}
                            </Alert>
                        )
                    }
                </form>
            </div>

        </div>
    );
};

export {Login};
