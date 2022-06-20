export interface UserType {
  /**
   * Insert a user.
   * @param userName User name.
   * @param email User email.
   * @param forceRollBack Force a database rollback after the insert.
   * @returns Id of the inserted user.
   */
  insert: (
    userName: string,
    email: string,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Remove a user.
   * @param idUser id of the user.
   * @param forceRollBack Force a database rollback after the insert.
   * @returns True if could remove the user.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<boolean>;

  /**
   * Find and return an user.
   * @param id User id
   * @returns User.
   */
  findOne: (id: number) => Promise<Object>;
}

export interface UserModel {
  userName: string;
  email: string;
}
