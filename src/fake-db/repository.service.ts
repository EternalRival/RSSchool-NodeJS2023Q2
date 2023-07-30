export class Repository<T extends { id: string }> {
  private table: T[] = [];

  public remove(entity: T): T;
  public remove(entities: T[]): T[];
  public remove(arg: T | T[]): T | T[] {
    this.table = this.table.filter((ent) => {
      return (Array.isArray(arg) ? arg : [arg]).every((item) => item !== ent);
    });

    return arg;
  }

  public findOneBy(prop: Partial<T>): T | null {
    const entity = this.table.find((ent: T) => {
      return Object.entries(prop).every(([key, value]) => ent[key] === value);
    });
    if (!entity) {
      return null;
    }

    return entity;
  }

  public find(prop?: Partial<T>): T[] {
    if (!prop) {
      return this.table;
    }

    return this.table.filter((ent) => {
      return Object.entries(prop).every(([key, value]) => ent[key] === value);
    });
  }

  public save(entity: T): T;
  public save(entities: T[]): T[];
  public save(arg: T | T[]): T | T[] {
    (Array.isArray(arg) ? arg : [arg]).forEach((ent) => this.saveOne(ent));
    return arg;
  }

  private saveOne(entity: T): T {
    const ent = this.table.find(({ id }: T) => entity.id === id);
    if (ent) {
      Object.assign(ent, entity);
    } else {
      this.table.push(entity);
    }
    return entity;
  }
}
