import { autorun, makeAutoObservable } from "mobx";

const theme = {
    themeView: "Dark",

    get getTheme() {
        return this.themeView;
    }, 

    get getNext() {
        return this.themeView === 'Dark' ? 'Light' : 'Dark';
    },

    set changeTheme(val){
        if (val !== 'Dark' && val !== 'Light')
            this.themeView = this.themeView === 'Light' ? 'Dark' : 'Light';

        switch (val) {
            case 'Dark':
                this.themeView = 'Light';
                break;
            case 'Light':
                this.themeView = 'Dark';
                break;
            default:
                break;
        }
    }
}
makeAutoObservable(theme);

autorun(() => {
    console.log("Current theme: " + theme.getNext);
})
export default theme;

