export interface ActionTypeModel {
  id?: number;
  actionName: string;
  actionDescription: string;
}

export interface ActionTypeType {
  /**
   * Insert a new actionType in the database.
   * @param actionType actionType to insert.
   * @param forceRollBack Force the insertion to suffer rollback.
   * @return Id of the inserted actionType.
   */
  insert: (
    actionType: ActionTypeModel,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Remove a actionType from the database.
   * @param id actionType id.
   * @param forceRollBack Force the remotion to suffer rollback.
   * @return Number of removed elements.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<number>;

  /**
   * Return all actionTypes.
   * @return All actionTypes.
   */
  find: () => Promise<ActionTypeModel[]>;

  /**
   * Return a actionType.
   * @param id actionType id.
   * @return actionType.
   */
  findOne: (id: number) => Promise<ActionTypeModel>;

  /**
   * Update a actionType in the database.
   * @param id Id of the actionType.
   * @param actionType New value to set the actionType.
   * @param forceRollBack Force the update to suffer rollback.
   * @return Number of updated elements.
   */
  update: (
    id: number,
    actionType: ActionTypeModel,
    forceRollBack?: boolean
  ) => Promise<number>;
}
