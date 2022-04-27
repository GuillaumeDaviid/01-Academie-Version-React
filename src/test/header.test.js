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
})