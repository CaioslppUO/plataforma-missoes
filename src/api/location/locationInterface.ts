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
  mission: {
    id?: number;
    missionOrder: number;
    missionName: string;
    project: {
      id?: number;
      projectName: string;
      projectDate: string;
      user?: {
        id?: number;
        userName: string;
        email: string;
      };
    };
  };
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
   * @return True if could remove the location.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<boolean>;

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
   * Update a location in the database.
   * @param id Id of the location.
   * @param location New value to set the location.
   * @param forceRollBack Force the update to suffer rollback.
   * @return True if could update.
   */
  update: (
    id: number,
    location: LocationModel,
    forceRollBack?: boolean
  ) => Promise<boolean>;
}
