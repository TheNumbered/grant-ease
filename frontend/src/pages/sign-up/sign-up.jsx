import { SignUp } from "@clerk/clerk-react"
import { CenteredLayout } from "../../layouts"

export const SignUpPage = () => {
    return (
        <CenteredLayout extras={{ "data-testid": "sign-up" }}>
            <SignUp path="/sign-up" signInUrl="/sign-in" redirectUrl={"/onboarding"} />
        </CenteredLayout>
    )
}