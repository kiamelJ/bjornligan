import cookie from "cookie";


export default async (req, res) => {


    res.setHeader("Set-Cookie", cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: new Date(0),
        sameSite: "strict",
        path: '/',
    }));

    

    res.statusCode = 200;
    res.json({success: true});
}
