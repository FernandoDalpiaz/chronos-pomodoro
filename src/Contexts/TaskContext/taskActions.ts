import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
} as const;

export type TaskActionsWithPayload = {
  type: typeof TaskActionTypes.START_TASK;
  payload: TaskModel;
};

export type TaskActionsWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    };

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
