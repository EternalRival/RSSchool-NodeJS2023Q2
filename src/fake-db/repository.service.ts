export class Repository<T extends { id: string }> {
  private table: T[] = [];

  remove({ id }: Pick<T, 'id'>) {
    const entity = this.table.find((ent: T) => ent.id === id);
    if (!entity) return null;

    this.table = this.table.filter((ent) => ent !== entity);
    return entity;
  }

  findOneBy({ id }: Pick<T, 'id'>) {
    const entity = this.table.find((ent: T) => ent.id === id);
    if (!entity) return null;

    return entity;
  }

  find() {
    return this.table;
  }

  save(entity: T) {
    const ent = this.table.find(({ id }: T) => entity.id === id);
    if (ent) {
      Object.assign(ent, entity);
    } else {
      this.table.push(entity);
    }
    return entity;
  }
}
