import {makeAutoObservable} from "mobx";

export default class FavoriteStore {
    constructor() {
        this._favorites = [
            {id:1, info: "о политике", userId: 1234134},
            {id:2, info: "о погоде", userId: 1234134},
        ]
        makeAutoObservable(this)
    }

    setFavorites(favorites){
        this._favorites = favorites
    }

    get favorites(){
        return this._favorites
    }

}
