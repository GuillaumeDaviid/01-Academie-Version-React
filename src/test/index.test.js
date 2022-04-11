import React, {} from 'react';
import Exercices from "../components/Exercices";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { ModulesProvider } from '../contexts/ModulesContext.jsx';
import MyContextProvider from '../contexts/MyContext';
import ReactRouter from 'react-router';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.get('http://localhost/01-academie/src/server/ex_req_ajax.php', (req, res, ctx) => {
      return res(ctx.json({ exoMock: exoMockData }))
    })
)
 
// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
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

    test('should show 3 hearts', async () => {
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
    
})