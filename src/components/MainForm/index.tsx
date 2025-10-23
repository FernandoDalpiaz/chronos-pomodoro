import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon } from 'lucide-react';

export function MainForm() {
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Deu certo');
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          id='input'
          type='text'
          labelText='task'
          placeholder='Ex: estudar para a prova'
        ></DefaultInput>
      </div>

      <div className='formRow'>
        <p>Nesse ciclo foque por 25 min.</p>
      </div>

      <div className='formRow'>
        <Cycles></Cycles>
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} color='green' />
      </div>
    </form>
  );
}
