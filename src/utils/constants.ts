// if this is the url new url https://englishapp-skmti0r1.b4a.run/ change variable acc to it 

const baseURL = 'http://10.214.225.24:8080';
const wsURL = 'ws://10.214.225.24:8080/ws';
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

export const settingsMenus = [
    {
        id: 0,
        name: "Change Language",
        image: require("../../assets/images/x.png"),
        screen: "ChangeLanguage"
    },
    {
        id: 1,
        name: "Delete your account",
        image: require("../../assets/images/caution.png"),
        screen: "DeleteAccount"
    },
    {
        id: 2,
        name:"Notifications",
        image: require("../../assets/images/bell.png"),
    }

]

export const grokvoice = [
  "en-gb-x-gba-local",
  "hi-in-x-hia-local",
  "nl-be-x-bec-local",
  "ur-pk-x-cfn-local",
  "en-us-x-tpf-local",
  "yue-hk-x-yud-local",
  "nl-NL-language",
  "ru-ru-x-ruf-local",
  "en-au-x-auc-local",
  "es-US-language",
  "en-us-x-sfg-local",
  "en-gb-x-gbg-local",
  "hi-in-x-hid-local",
  "uk-ua-x-hfd-local",
  "es-es-x-eee-local",
  "hi-IN-language",
  "en-gb-x-rjs-local",
  "en-gb-x-gbd-local",
  "en-gb-x-gbb-local",
  "es-es-x-eea-local",
  "en-us-x-iob-local",
  "it-it-x-itb-local",
  "en-au-x-aub-local",
  "ru-ru-x-rue-local",
  "yue-hk-x-yuf-local",
  "en-gb-x-gbc-local",
  "ur-in-x-urb-local",
  "yue-HK-language",
  "ur-PK-language",
  "en-US-language",
  "cy-gb-x-cyf-local",
  "en-AU-language",
  "ja-JP-language",
  "en-in-x-enc-local",
  "nl-nl-x-lfc-local",
  "es-es-x-eef-local",
  "en-au-x-aua-local",
  "nl-nl-x-dma-local",
  "ru-ru-x-rud-local",
  "nl-nl-x-bmh-local",
  "it-it-x-itc-local",
  "yue-hk-x-yue-local",
  "it-IT-language",
  "es-us-x-sfb-local",
  "es-us-x-esf-local",
  "es-us-x-esc-local",
  "en-us-x-iom-local",
  "hi-in-x-hic-local",
  "es-es-x-eed-local",
  "en-in-x-ene-local",
  "en-in-x-ena-local",
  "th-th-x-thc-local",
  "ja-jp-x-jac-local",
  "lv-lv-x-imr-local",
  "en-IN-language",
  "ru-ru-x-ruc-local",
  "ja-jp-x-htm-local",
  "it-it-x-kda-local",
  "en-us-x-iol-local",
  "as-in-x-end-local",
  "ja-jp-x-jab-local",
  "en-us-x-tpd-local",
  "lv-LV-language",
  "nl-nl-x-tfb-local",
  "en-us-x-tpc-local",
  "es-es-x-eec-local",
  "yue-hk-x-yuc-local",
  "yue-hk-x-jar-local",
  "as-IN-language",
  "th-TH-language",
  "ur-in-x-urc-local",
  "en-au-x-aud-local",
  "it-it-x-itd-local",
  "cy-GB-language",
  "en-us-x-iog-local",
  "ru-ru-x-dfc-local",
  "nl-BE-language",
  "nl-be-x-bed-local"
]




// hi-in-x-hia-local
// hi-in-x-hid-local  good for indian voices