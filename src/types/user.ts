import Fileable from "@/types/fileable";

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: Fileable;
};