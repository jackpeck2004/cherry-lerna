export const nextIronSessionOptions = {
    password: process.env.SESSION_SECRET,
    cookieName: "cherry-challenge",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}
