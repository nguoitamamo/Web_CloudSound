


export const checkRole = (role: string[]) => {
    return role.some(
        id =>
            id === process.env.NEXT_PUBLIC_VIP1ID ||
            id === process.env.NEXT_PUBLIC_VIP2ID ||
            id === process.env.NEXT_PUBLIC_VIP3ID // nếu có 3 loại role
    );
};

interface IProps {
    user: [
        {
            "_id": string,
            "name": string
        }
    ],
    propUserID: string;
}
export const checkActor = (props: IProps) => {
    return props.user.some(item =>
        item._id === props.propUserID
    )
}
interface ISongID {
    songID: string;
    shared: string[]
}


export const checkShared = ({ songID, shared }: ISongID) => {
    return shared?.some(id => id === songID)
}




interface Iinfo extends IProps {
    role: string[];
    songID: string;
    shared: string[];
}
export const isListen = ({ user, role, propUserID, songID, shared }: Iinfo) => {


    const isAuthor = checkActor({ user: user, propUserID: propUserID });
    const isVIP = checkRole(role);
    const isShared = checkShared({ songID: songID, shared: shared })

    if (!(isAuthor || isVIP || isShared)) {
        return false;
    }
    else {
        return true;
    }
}



