import { ActionModelExtended } from "../action/actionInterface";
import { MissionModelExtended } from "../mission/missionInterface";

export interface LocationModel {
  id?: number;
  latitude: number;
  longitude: number;
  locationOrder: number;
  idMission: number;
}

export interface LocationModelExtended {
  id?: number;
  latitude: number;
  longitude: number;
  locationOrder: number;
  actions?: ActionModelExtended[];
}

export interface LocationType {
  /**
   * Insert a new location in the database.
   * @param location location to insert.
   * @param forceRollBack Force the insertion to suffer rollback.
   * @return Id of the inserted location.
   */
  insert: (location: LocationModel, forceRollBack?: boolean) => Promise<number>;

  /**
   * Remove a location from the database.
   * @param id location id.
   * @param forceRollBack Force the remotion to suffer rollback.
   * @return Number of removed elements.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<number>;

  /**
   * Return all locations.
   * @return All locations.
   */
  find: () => Promise<LocationModelExtended[]>;

  /**
   * Return a location.
   * @param id location id.
   * @return location.
   */
  findOne: (id: number) => Promise<LocationModelExtended>;

  /**
   * Return all location by mission.
   * @param id location id.
   * @return location by mission.
   */
  findByMission: (id: number) => Promise<LocationModelExtended[]>;

  /**
   * Update a location in the database.
   * @param id Id of the location.
   * @param location New value to set the location.
   * @param forceRollBack Force the update to suffer rollback.
   * @return Number of updated elements.
   */
  update: (
    id: number,
    location: LocationModel,
    forceRollBack?: boolean
  ) => Promise<number>;
}
