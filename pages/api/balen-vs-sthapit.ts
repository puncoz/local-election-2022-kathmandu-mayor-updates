import cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";
import { dataUrl } from "../../utils/helpers";

type PositionTitle = "Mayor" | "Deputy Mayor";

interface Result {
	balen: number;
	sthapit: number;
}

const BalenVsSthapit = async (
	req: NextApiRequest,
	res: NextApiResponse<Result>
) => {
	const response = await fetch(dataUrl());
	const htmlText = await response.text();
	const $ = cheerio.load(htmlText);

	const voteCountsGroup = $(".nominee-list-group .card");

	const result: Result = {
		balen: 0,
		sthapit: 0,
	};

	voteCountsGroup.each((index, el) => {
		const title = $(el).find(".card-title").text().trim() as PositionTitle;
		if (title !== "Mayor") {
			return;
		}

		const items = $(el).find(".list-group .list-group-item");

		items.each((index, itemEl) => {
			const name = $(itemEl).find(".candidate-name").text().trim();
			const votes = $(itemEl).find(".vote-numbers").text().trim() || "0";

			if (name === "Balendra Shah") {
				result.balen = parseInt(votes);
			} else if (name === "Keshav Sthapit") {
				result.sthapit = parseInt(votes);
			}
		});
	});

	res.status(200).json(result);
};

export default BalenVsSthapit;
