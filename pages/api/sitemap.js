import axios from "axios";

export default async function handler(req, res) {
  try {
    const sitemap = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/sitemap.xml`
    );

    res.send(sitemap?.data); // Send your `robots.txt content here
  } catch (error) {
    //// console.log(error);
    res.send(""); // Send your `robots.txt content here
  }
}
