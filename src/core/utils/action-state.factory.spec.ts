import { PunchLight } from '../store/models';
import { createScriptAction, defaultAction } from './action-state.factory';

describe('ActionStateFactory', () => {
  it('should calculate the default Input on invalit input', () => {
    let action = createScriptAction('idle');
    expect(action).toEqual({ ...defaultAction });

    action = createScriptAction(null!);
    expect(action).toEqual({ ...defaultAction });
  });

  it('should calculate right Action', () => {
    const action = createScriptAction('PUNCH_LIGHT');
    expect(action).toEqual({ ...new PunchLight() });
  });

  it('should calculate right Action also with lower case', () => {
    const action = createScriptAction('punch_light');
    expect(action).toEqual({ ...new PunchLight() });
  });

  it('should calculate right Action also when there are spaces', () => {
    const action = createScriptAction('   punch_light  ');
    expect(action).toEqual({ ...new PunchLight() });
  });
});
