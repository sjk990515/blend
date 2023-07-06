import { atom, selector } from "recoil";

export const loginSignUp = atom({
    key: "loginSignUp",
    default: false,
});

export const loginMenuRecoil = atom({
    key: "loginMenuRecoil",
    default: true,
});

export const menuAble = atom({
    key: "menuAble",
    default: true,
});

export const displayNoneRecoil = atom({
    key: "displayNoneRecoil",
    default: true,
});
