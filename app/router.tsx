
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { WorkflowPage } from '../features/workflow/pages/WorkflowPage';
import { WorkflowListPage } from '../features/workflow/pages/WorkflowListPage';

export const AppRouter: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/workflows" replace />,
    },
    {
      path: '/workflows',
      element: <WorkflowListPage />,
    },
    {
      path: '/workflows/:id',
      element: <WorkflowPage />,
    },
  ]);

  return routes;
};
