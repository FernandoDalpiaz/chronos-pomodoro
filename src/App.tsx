import './styles/theme.css';
import './styles/global.css';

import { TaskContextProvider } from './Contexts/TaskContext/taskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouter';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
