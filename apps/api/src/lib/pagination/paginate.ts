/** biome-ignore-all lint/suspicious/noExplicitAny: extensión dinámica de $extends desde array */
import type { PaginateInfo, PaginateOptions } from "./types";

type AnyModel = Record<"findMany" | "count", (...args: any[]) => any>;

export async function paginate(
	model: AnyModel,
	query?: { where?: any; orderBy?: any },
	opts?: PaginateOptions,
) {
	const { page = 1, limit = 10 } = opts ?? {};
	const skip = (page - 1) * limit;

	const [docs, totalDocs] = await Promise.all([
		model.findMany({ ...query, skip, take: limit }),
		model.count({ where: query?.where }),
	]);

	const totalPages = Math.ceil(totalDocs / limit);

	return {
		docs,
		info: {
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
			limit,
			nextPage: page < totalPages ? page + 1 : undefined,
			page,
			prevPage: page > 1 ? page - 1 : undefined,
			totalDocs: Number(totalDocs),
			totalPages,
		} satisfies PaginateInfo,
	};
}
