import { LocationModelExtended } from "../location/locationInterface";

export interface MissionModel {
  id?: number;
  missionOrder: number;
  missionName: string;
  idProject: number;
}

export interface MissionModelExtended {
  id?: number;
  missionOrder: number;
  missionName: string;
  idProject?: number;
  locations?: LocationModelExtended[];
}

export interface MissionType {
  /**
   * Insert a new mission in the database.
   * @param mission Mission to insert.
   * @param forceRollBack Force the insertion to suffer rollback.
   * @return Id of the inserted mission.
   */
  insert: (mission: MissionModel, forceRollBack?: boolean) => Promise<number>;

  /**
   * Remove a mission from the database.
   * @param id Mission id.
   * @param forceRollBack Force the remotion to suffer rollback.
   * @return Number of removed elements.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<number>;

  /**
   * Return all missions.
   * @return All missions.
   */
  find: () => Promise<MissionModelExtended[]>;

  /**
   * Return a mission.
   * @param id Mission id.
   * @return Mission.
   */
  findOne: (id: number) => Promise<MissionModelExtended>;

  /**
   * Return all mission by project.
   * @param id Mission id.
   * @return Mission by project.
   */
  findByProject: (id: number) => Promise<MissionModelExtended[]>;

  /**
   * Update a mission in the database.
   * @param id Id of the mission.
   * @param mission New value to set the mission.
   * @param forceRollBack Force the update to suffer rollback.
   * @return Number of removed elements.
   */
  update: (
    id: number,
    mission: MissionModel,
    forceRollBack?: boolean
  ) => Promise<number>;
}
