import AxiosClient from "@/api/axios-client";
import {useState} from "react";

type UseVoteProps = {
    onVoted?: () => void;
    id: string;
}

type VoteType = 'up' | 'down' | 'retract';

const useVote = ({onVoted, id}: UseVoteProps) => {
    const [voting, setVoting] = useState(false);
    const handleVote = async (type: VoteType) => {
        setVoting(true);
        try {
            await AxiosClient.post(`/api/threads/${id}/votes`, {
                type
            });
            await onVoted?.();
        }finally {
            setVoting(false);
        }
    }

    return {
        voting,
        handleVote
    }
}

export default useVote;