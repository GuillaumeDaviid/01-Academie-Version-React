import React, {} from 'react';
import Header from "../components/Header";
import { render, screen } from '@testing-library/react';
import MyContextProvider from '../contexts/MyContext';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from "react-router-dom";

describe('Header', () => {
    test('Should render without crashing', async () => {
        render(
            <Router>
            <MyContextProvider>
                <Header />
            </MyContextProvider>
            </Router>
        )
    })

    test('Should have a logo', async () => {
        render(
            <Router>
            <MyContextProvider>
                <Header />
            </MyContextProvider>
            </Router>
        )
        const logo = screen.getByTestId('logo')
        expect(logo).toBeTruthy();
    })

    test('Should have success link', async () => {
        render(
            <Router>
            <MyContextProvider>
                <Header />
            </MyContextProvider>
            </Router>
        )
        const success = screen.getByTestId('success')
        expect(success).toBeTruthy();
    })

    test('Should have cours link', async () => {
        render(
            <Router>
            <MyContextProvider>
                <Header />
            </MyContextProvider>
            </Router>
        )
        const cours = screen.getByTestId('cours')
        expect(cours).toBeTruthy();
    })

    test('Should have a log in button', async () => {
        render(
            <Router>
            <MyContextProvider>
                <Header />
            </MyContextProvider>
            </Router>
        )
        const logIn = screen.getByTestId('logIn')
        expect(logIn).toBeTruthy();
    })

    test('Should have a sign up button', async () => {
        render(
            <Router>
            <MyContextProvider>
                <Header />
            </MyContextProvider>
            </Router>
        )
        const signUp = screen.getByTestId('signUp')
        expect(signUp).toBeTruthy();
    })
})