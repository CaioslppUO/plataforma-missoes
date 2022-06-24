import { UserModel } from "../user/userInterface";

export interface ProjectModel {
  id?: number;
  projectName: string;
  projectDate: string;
  idUser: number;
}

export interface ProjectModelExtended {
  id?: number;
  projectName: string;
  projectDate: string;
  user: UserModel;
}

export interface ProjectType {
  /**
   * Insert a new project to the database.
   * @param project Project to insert
   * @param forceRollBack Force the insert to suffer rollback.
   * @return Id of the inserted project.
   */
  insert: (project: ProjectModel, forceRollBack?: boolean) => Promise<number>;

  /**
   * Remove a project from the database.
   * @param id Id of the project to be deleted.
   * @param forceRollBack Force the remove to suffer rollback.
   * @return Number of removed elements.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<number>;

  /**
   * Return a project from the database.
   * @param id Id of the project to return.
   * @return Project.
   */
  findOne: (id: number) => Promise<ProjectModelExtended>;

  /**
   * Return all projects.
   * @return All Projects.
   */
  find: () => Promise<ProjectModelExtended[]>;

  /**
   * Update an project in the database.
   * @param id Id of the project to be updated.
   * @param project Project to be updated.
   * @return Number of updated elements.
   */
  update: (
    id: number,
    project: ProjectModel,
    forceRollBack?: boolean
  ) => Promise<number>;
}
