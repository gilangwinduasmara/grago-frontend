import Timestamp from "@/types/timestamp";
import Fileable from "@/types/fileable";
import User from "@/types/user";

type Threadable = {
    id: string;
    content: string;
    user: User;
    attachment?: Fileable;
    parent_id?: string;
    up_votes_count: number;
    down_votes_count: number;
    product_id?: string;
    tags?: string;
} & Timestamp;

type Thread = Threadable & {
    replies: Threadable[];
    replies_count: number;
}

export type { Threadable, Thread };