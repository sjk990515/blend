import { atom, selector } from "recoil";

export const loginSignUp = atom({
    key: "loginSignUp",
    default: false,
});

export const loginMenuRecoil = atom({
    key: "loginMenuRecoil",
    default: true,
});
