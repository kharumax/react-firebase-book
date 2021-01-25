
export const getTitle = (url: string): string => {
    switch (url) {
        case "/home":
            return "Home / Twitter";
        case "/explore":
            return "Explore / Twitter";
        case "/messages":
            return "Messages / Twitter";
        case "/profile":
            return "Profile / Twitter";
        default:
            return "Twitter"
    }
};


