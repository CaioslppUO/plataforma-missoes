import { ActionTypeModel } from "../actionType/actionTypeInterface";
import { LocationModelExtended } from "../location/locationInterface";

export interface ActionModel {
  id?: number;
  idLocation: number;
  idActionType: number;
}

export interface ActionModelExtended {
  id?: number;
  actionType: ActionTypeModel;
  location: LocationModelExtended;
}

export interface ActionType {
  /**
   * Insert a new action to the database.
   * @param action action to insert
   * @param forceRollBack Force the insert to suffer rollback.
   * @return Id of the inserted action.
   */
  insert: (action: ActionModel, forceRollBack?: boolean) => Promise<number>;

  /**
   * Remove a action from the database.
   * @param id Id of the action to be deleted.
   * @param forceRollBack Force the remove to suffer rollback.
   * @return True if could remove.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<boolean>;

  /**
   * Return a action from the database.
   * @param id Id of the action to return.
   * @return action.
   */
  findOne: (id: number) => Promise<ActionModelExtended>;

  /**
   * Return all actions.
   * @return All actions.
   */
  find: () => Promise<ActionModelExtended[]>;

  /**
   * Update an action in the database.
   * @param id Id of the action to be updated.
   * @param action action to be updated.
   * @return True if could update.
   */
  update: (
    id: number,
    action: ActionModel,
    forceRollBack?: boolean
  ) => Promise<boolean>;
}
