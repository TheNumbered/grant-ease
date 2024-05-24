import { CenteredLayout } from "@/layouts"
import { SignUp } from "@clerk/clerk-react"

export const SignUpPage = () => {
    return (
        <CenteredLayout extras={{ "data-testid": "sign-up" }}>
            <SignUp path="/sign-up" signInUrl="/sign-in" redirectUrl={"/onboarding"} />
        </CenteredLayout>
    )
}