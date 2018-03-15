export interface User {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    telephone: string;
    email: string;
    profileImage: string;
    profileCover: string;
    Posts: [{
        createdAt:{
            type: Date
        },
        postText: String,
        likes: Number,
        likedFrom: [String]
    }];  
}