import {
  Animation,
  GameObject,
  Sprite,
  SpriteAlignment,
  SpritePainter,
  Subject,
} from './../core';
import { GameUpdateArgs } from '../game';
import * as config from '../config';

export class Explosion extends GameObject {
  public zIndex = config.LARGE_EXPLOSION_Z_INDEX;
  public readonly painter = new SpritePainter();
  public readonly completed = new Subject();
  private animation: Animation<Sprite>;

  constructor() {
    super(136, 136);

    this.painter.alignment = SpriteAlignment.MiddleCenter;
  }

  protected setup({ spriteLoader }: GameUpdateArgs): void {
    this.animation = new Animation(
      spriteLoader.loadList(['explosion.large.1', 'explosion.large.2']),
      { delay: 0.066, loop: false },
    );
  }

  protected update(updateArgs: GameUpdateArgs): void {
    if (this.animation.isComplete()) {
      this.dirtyPaintBox();
      this.removeSelf();
      this.completed.notify(null);
      return;
    }
    this.animation.update(updateArgs.deltaTime);
    this.painter.sprite = this.animation.getCurrentFrame();
    this.setNeedsPaint();
  }
}
