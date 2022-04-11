import React, {} from 'react';
import Exercices from "../components/Exercices";
import { render, screen } from '@testing-library/react';
import { ModulesProvider } from '../contexts/ModulesContext.jsx';
import MyContextProvider from '../contexts/MyContext';
import ReactRouter from 'react-router'

describe('Exercices', () => {
    test('Should render without crashing', async () => {
        jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1' });
        render(
            <MyContextProvider>
            <ModulesProvider>
                <Exercices />
            </ModulesProvider>
            </MyContextProvider>
        )
    })
})