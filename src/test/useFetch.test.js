import React, {} from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {useFetch} from '../hooks/useFetch';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import fetchMock from "fetch-mock";
import "whatwg-fetch";

const stubbedQuestions = [
    { id: 1, questions: "le HTML est un langage de: " },
    { id: 2, questions: "La balise <p> représente :" },
  ];

const questionsUrl = "http://localhost/01-academie/src/server/ex_req_ajax.php";

describe('useFetch', () => {
    beforeAll(() => {
        global.fetch = fetch;
      });
      afterAll(() => {
        fetchMock.restore();
      });

    test('useFetch to be undefined default', async () => {
        const { result } = renderHook(() => useFetch())
        expect(result.dt).toBe(undefined)
    })

    test("should return data after fetch", async () => {
        // Mock API
        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(stubbedQuestions),
          })
        );
    
        // Execute
        const { result, waitForNextUpdate } = renderHook(() =>
          useFetch(questionsUrl, { current: true }, [])
        );
        await waitForNextUpdate();
    
        // Assert
        expect(result.current).toStrictEqual({
          dt: stubbedQuestions,
          error: false,
          isLoading: false
        });
      });

      test("should return an error", async () => {
        // Mock API
        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.reject(stubbedQuestions),
          })
        );
    
        // Execute
        const { result, waitForNextUpdate } = renderHook(() =>
          useFetch(questionsUrl, { current: true }, [])
        );
        await waitForNextUpdate();
    
        // Assert
        expect(result.current).toStrictEqual({
          dt: [],
          error: true,
          isLoading: false
        });
      });

      test("should return isLoading true", async () => {
        // Execute
        const { result } = renderHook(() =>
          useFetch(stubbedQuestions, { current: false }, [])
        );

        //expect(global.fetch).not.toHaveBeenCalled();
        expect(result.current).toStrictEqual({
          dt: [],
          error: false,
          isLoading: true
        });
      });
})