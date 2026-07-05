/** biome-ignore-all lint/suspicious/noExplicitAny: paginación genérica sobre modelos Prisma */

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { paginate } from "@/lib/pagination/paginate";
import type { PaginateInfo, PaginateOptions } from "@/lib/pagination/types";
import { PrismaClient } from "../prisma/generated/client";
import { MODELS } from "./paginations";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const basePrisma = new PrismaClient({ adapter });

type ModelNames = (typeof MODELS)[number];

type Paginator = {
	paginate(args?: { where?: any; orderBy?: any }): {
		withPages(
			opts?: PaginateOptions,
		): Promise<{ docs: any[]; info: PaginateInfo }>;
	};
};

const paginationFeature = Object.fromEntries(
	MODELS.map((name) => [
		name,
		{
			paginate(args?: any) {
				return {
					withPages: (opts?: PaginateOptions) =>
						paginate((basePrisma as any)[name], args, opts),
				};
			},
		} satisfies Paginator,
	]),
) as Record<ModelNames, Paginator>;

export const prisma = basePrisma.$extends({
	model: paginationFeature,
});
