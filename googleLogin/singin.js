import * as Google from "expo-google-app-auth";

export async function signInWithGoogleAsync() {
    try {
        const result = await Google.logInAsync({
        androidClientId:
            "1011125952941-sn36odhinio6knb15n3q8v78k9e2gk43.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        });
        console.log(result);
        if (result.type === "success") {
        return result.accessToken;
        } else {
        return { cancelled: true };
        }
    } catch (e) {
        return { error: true };
    }
}
