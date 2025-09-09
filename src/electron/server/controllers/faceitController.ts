import { Request, Response } from "express";

// Controllers do know they are working with express.

export const getFaceitMatchRoomController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const options: RequestInit = {
      method: "GET",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    };
    let data: any = await fetch(`https://www.faceit.com/api/match/v2/match/${id}`, options).then((res) => {
      let data = res;
      return res.json().catch((_e) => data && data.status < 300);
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json("Faceit matchroom fetch failed");
  }
};

export const getFaceitCdnImage = async (req: Request, res: Response) => {
  const url = decodeURIComponent(req.query.url as string);
  console.log(url);
  try {
    const options: RequestInit = {
      method: "GET",
      headers: { Accept: "image/*" },
    };
    let data: any = await fetch(url, options).then((res) => {
      let data = res;
      return res.blob().catch((_e) => data && data.status < 300);
    });
    res.status(200).contentType("image/*").send(Buffer.from(await data.arrayBuffer()));
  } catch (error) {
    console.log(error);
    res.status(400).json("Faceit image fetch failed");
  }
};
