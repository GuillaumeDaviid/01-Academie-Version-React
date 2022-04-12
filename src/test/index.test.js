import React, {} from 'react';
import Exercices from "../components/Exercices";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, act } from '@testing-library/react';
import { ModulesProvider } from '../contexts/ModulesContext.jsx';
import MyContextProvider from '../contexts/MyContext';
import ReactRouter from 'react-router';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const exercices = [
    {
        id: 1,
        questions: "le HTML est un langage de: ",
        answer_one: "balisage",
        answer_tow: "script",
        answer_three: "communication",
        good_answer: "balisage"
    },
    {
        id: 2,
        questions: "la balise <p> représente :",
        answer_one: "un paragraphe",
        answer_two: "un titre",
        anwer_three: "une section",
        good_answer: "un paragraphe"
    }
]

const server = setupServer(
    rest.get('http://localhost/01-academie/src/server/ex_req_ajax.php', (req, res, ctx) => {
        return res(ctx.json({ exercicesList: exercices }))
    })
)

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
        expect(btn).toHaveLength(1)
    })
    
})