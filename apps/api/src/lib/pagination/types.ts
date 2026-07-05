export type PaginateOptions = {
	page?: number;
	limit?: number;
};

export type PaginateInfo = {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	limit: number;
	nextPage?: number;
	page: number;
	prevPage?: number;
	totalDocs: number;
	totalPages: number;
};
