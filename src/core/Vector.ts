export class Vector {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;

    return this;
  }

  public setX(x: number): this {
    this.x = x;

    return this;
  }

  public setY(y: number): this {
    this.y = y;

    return this;
  }

  public add(v: Vector): this {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  public sub(v: Vector): this {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  public divideScalar(s: number): this {
    this.x /= s;
    this.y /= s;

    return this;
  }

  public copy(v: Vector): this {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }
}