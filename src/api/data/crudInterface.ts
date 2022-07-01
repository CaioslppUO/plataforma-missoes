export type CrudType<ObjectModel> = {
  /**
   * Insert into the database.
   * @param table Table to insert.
   * @param data Data to insert.
   * @param forceRollBack Force a database rollback after the insert.
   * @returns Id of the inserted data.
   */
  insert: (
    table: string,
    data: ObjectModel,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Remove from the database.
   * @param table Table to remove from.
   * @param Id to remove.
   * @param forceRollBack Force a database rollback after the remove.
   * @return Amount of removed elements.
   */
  remove: (
    table: string,
    id: number,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Return the object from the database.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns An object from the database.
   */
  findOne: (table: string, id: number) => Promise<ObjectModel>;

  /**
   * Return all object in a table where id.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns An object from the database.
   */
  findBy: (
    table: string,
    id: number,
    targetCol: string
  ) => Promise<ObjectModel[]>;

  /**
   * Return all objects in a table.
   * @param table Table to ge objects from.
   * @return List with found objects.
   */
  find: (table: string) => Promise<ObjectModel[]>;

  /**
   * Update an object in the database.
   * @param table Table to update the object.
   * @param Id of the object to update.
   * @param data New value to the object.
   * @param forceRollBack Force a database rollback after the update.
   * @return Amount of updated elements.
   */
  update: (
    table: string,
    id: number,
    data: ObjectModel,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Get an user Id by its firebaseId.
   * @param firebaseId Id from firebase auth.
   * @return User id.
   */
  findIdByFirebaseId: (firebaseId: string) => Promise<number>;
};
