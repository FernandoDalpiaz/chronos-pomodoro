import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Hora de focar.</span>,
    shortBreakTime: <span>Hora de descansar.</span>,
    longBreakTime: <span>Hora de descansar.</span>,
  };

  const tipsForNoActiveTask = {
    workTime: (
      <span>No próximo ciclo foque por {state.config.workTime} minutos.</span>
    ),
    shortBreakTime: (
      <span>
        No próximo ciclo descanse por {state.config.shortBreakTime} minutos.
      </span>
    ),
    longBreakTime: (
      <span>
        No próximo ciclo descanse por {state.config.longBreakTime} minutos.
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
