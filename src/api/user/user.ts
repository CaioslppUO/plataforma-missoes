import { Crud } from "../data/crud";
import { UserType, UserModel } from "./userInterface";
import { Project } from "../project/project";

export const User = (): UserType => {
  const crud = Crud<UserModel>();

  const insert = (
    userName: string,
    email: string,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(email)) rejects("invalid user email");
      if (userName.length <= 0) rejects("invalid user name");
      await crud
        .insert("User", { userName, email }, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const remove = (
    id: number,
    forceRollBack: boolean = false
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      let proj = Project();
      await proj.find().then(async (projects) => {
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].user.id == id && projects[i].id != undefined) {
            await proj.remove(Number(projects[i].id), forceRollBack);
          }
        }
      });
      await await crud
        .remove("User", id, forceRollBack)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<UserModel> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("User", id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const find = (): Promise<UserModel[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("User")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const update = (
    id: number,
    user: UserModel,
    forceRollBack: boolean = false
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("User", id)
        .then((res) => {
          if (res == undefined) rejects("invalid user id");
        })
        .catch((err) => {
          rejects(err);
        });
      const re = /\S+@\S+\.\S+/;
      if (!re.test(user.email)) rejects("invalid user email");
      if (user.userName.length <= 0) rejects("invalid user name");
      await crud
        .update("User", id, user, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  return {
    insert,
    remove,
    findOne,
    find,
    update,
  };
};
