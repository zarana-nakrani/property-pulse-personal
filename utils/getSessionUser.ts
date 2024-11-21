import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import type { UserSession } from "@/utils/authOptions";


export const getSessionUser = async () => {
    const session: UserSession | null = await getServerSession(authOptions);
    try {
        if(!session || !session.user) {
        return null;
    }

    return {
        user: session.user,
        userId: (session as UserSession).user.id
    }
    } catch (error) {
        console.error(error);
        return null
    }
}