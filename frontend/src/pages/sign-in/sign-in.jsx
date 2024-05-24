import { CenteredLayout } from "@/layouts";
import { SignIn } from "@clerk/clerk-react";

export const SignInPage = () => {
    return (
        <CenteredLayout extras={{ "data-testid": "sign-in" }}>
            <SignIn path="/sign-in" signUpUrl="/sign-up" redirectUrl={"/home"}/>
        </CenteredLayout>
    )
}