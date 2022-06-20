import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("User").del();

  // Inserts seed entries
  await knex("User").insert([
    {
      idUser: 1,
      userName: "Caio Cezar das Neves Moreira",
      email: "caioslppuo@gmail.com",
    },
    {
      idUser: 2,
      userName: "Lucas Garavaglia",
      email: "lucasgrafimar@gmail.com",
    },
    {
      idUser: 3,
      userName: "Leví Cícero Arcanjo",
      email: "arcanjolevi@gmail.com",
    },
    {
      idUser: 4,
      userName: "Guilherme Bachega Gomes",
      email: "guizobachegagomes@gmail.com",
    },
    {
      idUser: 5,
      userName: "Milena Santos",
      email: "mii.santos342@gmail.com",
    },
    {
      idUser: 6,
      userName: "Eduardo da Silva",
      email: "eduardodasilva@gmail.com",
    },
    {
      idUser: 7,
      userName: "José Alves",
      email: "josealves@gmail.com",
    },
    {
      idUser: 8,
      userName: "Mariana Pereira",
      email: "marianapereira@gmail.com",
    },
    {
      idUser: 9,
      userName: "Larissa Lewartoski Wong",
      email: "larilw@gmail.com",
    },
    {
      idUser: 10,
      userName: "Pedro José",
      email: "pedrojose@gmail.com",
    },
  ]);
}
