import { GameObject, Input, Subject, Timer } from '../core';
import { GameObjectUpdateArgs } from '../game';
import { InputControl } from '../input';

import { LevelTitle } from './LevelTitle';

const SLOW_HOLD_DELAY = 0.12;
const FAST_HOLD_DELAY = 0.016;

export class LevelSelector extends GameObject {
  public selected = new Subject<number>();
  private currentLevel = 1;
  private minLevel = 1;
  private maxLevel: number;
  private title = new LevelTitle();
  private holdThrottle = new Timer();

  constructor(maxLevel = 1) {
    super();

    this.maxLevel = maxLevel;
  }

  protected setup(): void {
    this.title.origin.set(0.5, 0.5);
    this.add(this.title);
    this.updateText();
  }

  protected update({ deltaTime, input }: GameObjectUpdateArgs): void {
    if (input.isDown(InputControl.Start)) {
      this.selected.notify(this.currentLevel);
      return;
    }

    this.throttleInput(
      input,
      deltaTime,
      InputControl.A,
      this.selectNext,
      SLOW_HOLD_DELAY,
    );
    this.throttleInput(
      input,
      deltaTime,
      InputControl.B,
      this.selectPrev,
      SLOW_HOLD_DELAY,
    );
    this.throttleInput(
      input,
      deltaTime,
      InputControl.TurboA,
      this.selectNext,
      FAST_HOLD_DELAY,
    );
    this.throttleInput(
      input,
      deltaTime,
      InputControl.TurboB,
      this.selectPrev,
      FAST_HOLD_DELAY,
    );
  }

  private throttleInput(
    input: Input,
    deltaTime: number,
    control: InputControl,
    selectCallback: () => void,
    delay: number,
  ): void {
    if (input.isDown(control) || input.isUp(control)) {
      this.holdThrottle.stop();
    }

    if (input.isHoldFirst(control)) {
      if (this.holdThrottle.isDone()) {
        selectCallback();
        this.holdThrottle.reset(delay);
      }
      this.holdThrottle.update(deltaTime);
    }
  }

  private selectNext = (): void => {
    const nextLevel = this.currentLevel + 1;
    if (nextLevel > this.maxLevel) {
      return;
    }
    this.currentLevel = nextLevel;
    this.updateText();
  };

  private selectPrev = (): void => {
    const nextLevel = this.currentLevel - 1;
    if (nextLevel < this.minLevel) {
      return;
    }
    this.currentLevel = nextLevel;
    this.updateText();
  };

  private updateText(): void {
    this.title.setLevelNumber(this.currentLevel);
  }
}
