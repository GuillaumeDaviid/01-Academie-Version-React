import React, {} from 'react';
import Exercices from "../components/Exercices";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, act } from '@testing-library/react';
import { ModulesProvider } from '../contexts/ModulesContext.jsx';
import MyContextProvider from '../contexts/MyContext';
import ReactRouter from 'react-router';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const questionsResponse = rest.get("http://localhost/01-academie/src/server/ex_req_ajax.php", (req, res, ctx) => {
    return(res(ctx.json([{id:1, questions:"le HTML est un langage de: ", answer_one:"balisage", anszwer_two:"script", answer_three:"communication entre humain", good_answer:"balisage" }])))
})

const handlers = [questionsResponse];

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


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

    test('should have 3 hearts', async () => {
        jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1' });
        render(
            <MyContextProvider>
            <ModulesProvider>
                <Exercices />
            </ModulesProvider>
            </MyContextProvider>
        )
        const hearts = screen.getAllByTestId('heart-element')
        expect(hearts).toHaveLength(3);
    })

    test('should display questions', async () => {
        jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1' });
        jest.spyOn(React, 'useState').mockReturnValue({ heart: '3' });
        render(
            <MyContextProvider>
            <ModulesProvider>
                <Exercices />
            </ModulesProvider>
            </MyContextProvider>
        )
        const btn = screen.getAllByTestId('click-element')
        const question = screen.findByText('balisage')
        expect(question).toBeVisible();
    })
    
})