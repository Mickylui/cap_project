import React from 'react';

import LogInCard from "../Components/LogIn"
import SignUpCard from "../Components/SignUp"
// if click logIn button -> login component
export function LogIn(){
    
    return (
        <LogInCard/>
    );
}

export function SignUp(){
    return (
        <SignUpCard/>
    );
}

// if click signUp button -> signUp component