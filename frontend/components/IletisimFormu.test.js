import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';
import App from "../App";


test('hata olmadan render ediliyor', () => {
    render(<App/>);
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu/>);
    const thingtotest=screen.getByText(/İletişim Formu/i);
    expect(thingtotest).toBeInTheDocument();

});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu/>);
    const kullaniciadi=screen.getByPlaceholderText(/İlhan/i);
    userEvent.type(kullaniciadi,"gob");
    const hataisim = screen.getByTestId("error");
    expect(hataisim).toBeInTheDocument();

});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const kullaniciadialani=screen.getByPlaceholderText(/İlhan/i);
    const kullanicisoyadi=screen.getByPlaceholderText(/Mansız/i);
    const kullanicimail=screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    userEvent.type(kullaniciadialani, "a");
    userEvent.type(kullanicisoyadi, "a");
    userEvent.clear(kullanicisoyadi);
    userEvent.type(kullanicimail, "d");

    const hataListesi = await screen.getAllByTestId("error");
    expect(hataListesi.length).toEqual(3);
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const kullaniciadialani=screen.getByPlaceholderText(/İlhan/i);
    const kullanicisoyadi=screen.getByPlaceholderText(/Mansız/i);
    const kullanicimail=screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    const submitBtn=await screen.getByRole("button");
    userEvent.type(kullaniciadialani, "abcde");
    userEvent.type(kullanicisoyadi, "a");
    userEvent.click(submitBtn);
    const hataListesi = await screen.getAllByTestId("error");
    expect(hataListesi.length).toEqual(1);


});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);
    const kullanicimail=screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    userEvent.type(kullanicimail, "d");

    const hataListesi = await screen.getByTestId("error");
    expect(hataListesi).toHaveTextContent( "email geçerli bir email adresi olmalıdır." );

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

});
