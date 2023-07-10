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
    default: false,
});

export const loginDataRecoil = atom({
    key: "loginDataRecoil",
    default: false,
});
