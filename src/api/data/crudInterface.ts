export type CrudType = {
  /**
   * Insert into the database.
   * @param table Table to insert.
   * @param data Data to insert.
   * @param forceRollBack Force a database rollback after the insert.
   * @returns Id of the inserted data.
   */
  insert: <type>(
    table: string,
    data: type,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Remove from the database.
   * @param table Table to remove from.
   * @param Id to remove.
   * @param forceRollBack Force a database rollback after the remove.
   * @retuns True if could remove.
   */
  remove: (
    table: string,
    id: number,
    forceRollBack?: boolean
  ) => Promise<boolean>;

  /**
   * Return the object from the database.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns An object from the database.
   */
  findOne: (table: string, id: number) => Promise<Object>;

  /**
   * Return all objects in a table.
   * @param table Table to ge objects from.
   * @return List with found objects.
   */
  find: (table: string) => Promise<Object[]>;

  /**
   * Update an object in the database.
   * @param table Table to update the object.
   * @param Id of the object to update.
   * @param data New value to the object.
   * @param forceRollBack Force a database rollback after the update.
   */
  update: <type>(
    table: string,
    id: number,
    data: type,
    forceRollBack?: boolean
  ) => Promise<boolean>;
};
