export interface UserModel {
  id?: number;
  userName: string;
  email: string;
}

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
   * @param forceRollBack Force a database rollback after the remove.
   * @returns True if could remove the user.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<boolean>;

  /**
   * Find and return an user.
   * @param id User id
   * @returns User.
   */
  findOne: (id: number) => Promise<UserModel>;

  /**
   * Return all users.
   * @return Users.
   */
  find: () => Promise<UserModel[]>;

  /**
   * Update an user.
   * @param id Id of the user.
   * @param user New value to substitute.
   * @param forceRollBack Force a database rollback after the update.
   * @returns True if could update.
   */
  update: (
    id: number,
    user: UserModel,
    forceRollBack?: boolean
  ) => Promise<boolean>;
}
