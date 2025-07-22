export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript





declare global {




    interface ISong {
        "_id": string,
        "name": string,
        "users": [
            {
                "_id": string,
                "name": string
            }
        ],
        "audio": string,
        "cover": string,
        "genres": string[],
        "totalListen": [
            {
                "_id": string,
                "date": Date
            }
        ],
        "like": string[],
        "dislike": string[],
        "isDeleted": boolean,
        "deletedAt": Date | null,
        "createBy": {
            "_id": string,
            "name": string,
            "avatar": string;
            "following": string[];
            "followers": string[];
        },
        "createdAt": Date,
        "updatedAt": Date,
        "state": string,
        "isVip": boolean

    }


    interface IGroup {
        "IsActive": boolean,
        "avatar": string,
        "_id": string,
        "name": string,
        "adminGroup": string[],
        "isDeleted": boolean,
        "deletedAt": Date | null,
        "createdAt": Date,
        "updatedAt": Date,
        "members": [
            {
                "_id": string,
                "name": string,
                "avatar": string,
                "following": string[],
                "followers": string[]
            }
        ]
    }

    interface ISongPlaylist {
        "_id": string,
        "userID": string
        "songID": ISong[],
        "isDeleted": boolean,
        "deletedAt": Date | null,
        "createdAt": Date,
        "updatedAt": Date,
    }

    interface ISongHistory {
        "_id": string,
        "userID": string
        "songID": ISong[],
        "start": number,
        "isDeleted": boolean,
        "deletedAt": Date | null,
        "createdAt": Date,
        "updatedAt": Date,
    }



    interface ISongContextCurrent extends ISong {
        isPlayCurrent: boolean,
        duration: number;
        current: number;

    }



    interface IHistory {
        "_id": string,
        "userID": string,
        "songID": [
            {
                "_id": string,
                "name": string,
                "users": [
                    {
                        "_id": string,
                        "name": string,
                    }
                ],
                "audio": string,
                "cover": string,
                "like": string[],
                "dislike": string[],
                "totalListen": string[],
            }
        ],
        "start": number,
        "isDeleted": boolean,
        "deletedAt": Date | null,
        "createdAt": Date,
        "updatedAt": Date,
    }



    interface Session {
        "access_token": string,
        "_id": string,
        "name": string,
        "email": string,
        "avatar": string,
        "countFollowers": number,
        "typeLogin": string,
        "followers": string[],
        "following": string[]
    }

    interface IComment {
        "_id": string,
        "userID": {
            "_id": string,
            "name": string,
            "avatar": string,
            "countFollower": number
        },
        "songID": string,
        "IsAction": boolean,
        "content": string,
        "ghimSecond": number,
        "isDeleted": boolean,
        "deletedAt": Date | null,
        "createdAt": Date,
        "updatedAt": Date,
    }


    interface IUser {
        "typeLogin": string,
        "_id": string,
        "name": string,
        "email": string,
        "avatar": string,
        "isDeleted": boolean,
        "deletedAt": Date | null,
        "following": [
            {
                "_id": string,
                "name": string,
                "email": string,
                "avatar": string,
                "followers": string[]
            }
        ],
        "followers": [
            {
                "_id": string,
                "name": string,
                "email": string,
                "avatar": string,
                "followers": string[]
            }
        ],
        "createdAt": Date,
        "updatedAt": Date,
        "shared": string[],
    }


    interface IBasicUser {
        "_id": string,
        "name": string
    }

    interface IWaveSurferContextValue {
        current: IWaveSurferContext;
        setCurrent: React.Dispatch<React.SetStateAction<IWaveSurferContext>>;
    }

    interface IWaveSurferContext {
        currentTime: number;
    }




    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

}
