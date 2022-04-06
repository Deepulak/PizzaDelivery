import cookie from "cookie";

const Handler = (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            })
        );
        res.status(200).json("Successfull");
    } else {
        res.status(400).json("Wrong Credentials!");
    }
};

export default Handler;