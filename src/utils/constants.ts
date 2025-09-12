// if this is the url new url https://englishapp-skmti0r1.b4a.run/ change variable acc to it 

const baseURL = 'http://10.20.108.24:8080';
const wsURL = 'ws://10.20.108.24:8080/ws';
export { baseURL, wsURL };

// const baseURL = 'https://englishapp-skmti0r1.b4a.run';
// const wsURL = 'wss://englishapp-skmti0r1.b4a.run/ws';
// export {baseURL, wsURL};


export const menus = [
    {
        id: 0,
        name: "Home",
        image: require('../../assets/images/home.png'),
        imagefilled: require('../../assets/images/home-filled.png')

    },
    {
        id: 1,
        name: "LeaderBoard",
        image: require('../../assets/images/ranking.png'),
        imagefilled: require('../../assets/images/ranking-filled.png')
    },
    {
        id: 2,
        name: "Chats",
        image: require('../../assets/images/chats.png'),
        imagefilled: require('../../assets/images/chats-filled.png')
    },

    {
        id: 3,
        name: "Profile",
        image: require('../../assets/images/user.png'),
        imagefilled: require('../../assets/images/user-filled.png')
    }

]