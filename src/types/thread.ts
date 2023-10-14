import Timestamp from "@/types/timestamp";
import Fileable from "@/types/fileable";
import User from "@/types/user";

type Threadable = {
    id: string;
    content: string;
    user: User;
    attachment?: Fileable;
    parent_id?: string;
} & Timestamp;

type Thread = Threadable & {
    replies: Threadable[];
    replies_count: number;
}

export type { Threadable, Thread };