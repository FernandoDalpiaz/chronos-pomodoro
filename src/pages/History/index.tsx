import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { useEffect, useState } from 'react';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../Contexts/TaskContext/taskActions';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;
    setConfirmClearHistory(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  useEffect(() => {
    document.title = 'Histórico - Focus Pomodoro';
  });

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm(
      'Tem certeza que deseja apagar o histórico?',
      confirmation => {
        setConfirmClearHistory(confirmation);
      },
    );
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <span>Histórico</span>
            {hasTasks && (
              <span className={styles.buttonContainer}>
                <DefaultButton
                  icon={<TrashIcon />}
                  color='red'
                  aria-label='Apagar histórico'
                  title='Apagar histórico'
                  onClick={handleResetHistory}
                />
              </span>
            )}
          </Heading>
        </Container>

        <Container>
          {hasTasks && (
            <div className={styles.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th
                      className={styles.thSort}
                      onClick={() => handleSortTasks({ field: 'name' })}
                    >
                      Tarefa ↕
                    </th>
                    <th
                      className={styles.thSort}
                      onClick={() => handleSortTasks({ field: 'duration' })}
                    >
                      Duração ↕
                    </th>
                    <th
                      className={styles.thSort}
                      onClick={() => handleSortTasks({ field: 'startDate' })}
                    >
                      Data ↕
                    </th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTasksOptions.tasks.map(task => {
                    const taskTypeDictionary = {
                      workTime: 'Foco',
                      shortBreakTime: 'Descanso Curto',
                      longBreakTime: 'Descanso Longo',
                    };

                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration}</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskTypeDictionary[task.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!hasTasks && (
            <p className={styles.noTextP}>Ainda não existem tarefas criadas.</p>
          )}
        </Container>
      </MainTemplate>
    </>
  );
}
