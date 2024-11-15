import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();

  const { query, page = 1 } = req.query;
  const productsPerPage = 8;

  const filter = query ? { title: { $regex: query, $options: "i" } } : {};
  const products = await Product.find(filter, null, {
    skip: (page - 1) * productsPerPage,
    limit: productsPerPage,
  });

  res.json({ products });
}
