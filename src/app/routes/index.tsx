import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/lib/auth';

import { AppRoot } from './app/root';
import { countriesLoader } from './app/countries/fetchCountries';
import { exampleLoader } from './app/example/fetchExample';
// import { usersLoader } from "./app/users";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LoginRoute } = await import('@/app/routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('@/app/routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'countries',
          lazy: async () => {
            const { CountriesRoute } = await import(
              './app/countries/Countries'
            );
            return { Component: CountriesRoute };
          },
          loader: countriesLoader(queryClient),
        },
        {
          path: 'example',
          lazy: async () => {
            const { ExampleRoute } = await import('./app/example/example');
            return { Component: ExampleRoute };
          },
          loader: exampleLoader(),
        },
      ],
    },
    // {
    //   path: "*",
    //   lazy: async () => {
    //     const { NotFoundRoute } = await import("./not-found");
    //     return { Component: NotFoundRoute };
    //   },
    // },
  ]);
