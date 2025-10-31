import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../Contexts/TaskContext/taskActions';
import { getNextCycle } from '../../utils/getNextCycle';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();
    console.log(taskNameInput.current);
    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa');
      return;
    }
    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    showMessage.success('Tarefa iniciada');
  }

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          id='input'
          type='text'
          labelText='task'
          placeholder='Ex: estudar para a prova'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
          autoComplete='off'
        ></DefaultInput>
      </div>

      <div className='formRow'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles></Cycles>
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            icon={<PlayCircleIcon />}
            color='green'
            type='submit'
            key='Submit'
          />
        ) : (
          <DefaultButton
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            icon={<StopCircleIcon />}
            color='red'
            type='button'
            onClick={handleInterruptTask}
            key='Interrupt'
          />
        )}
      </div>
    </form>
  );
}
