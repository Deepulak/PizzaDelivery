import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const { method, query: {id}, cookies } = req;

    const token = cookies.token;

    dbConnect();

    if(method === "GET") {
        try{
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if(method === "PUT") {
        if(!token || token !== process.env.token) {
            return res.status(401).json("Not Authorised!")
        }
        try {
             await Product.findByIdAndUpdate(id);
            res.status(201).json("The prodduct has been updated!");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if(method === "DELETE") {
        if(!token || token !== process.env.token) {
            return res.status(401).json("Not Authorised!")
        }
        try {
            const product = await Product.findByIdAndDelete(id);
            res.status(201).json("The prodduct has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}