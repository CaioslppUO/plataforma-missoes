import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("User").del();

  // Inserts seed entries
  await knex("User").insert([
    {
      id: 1,
      userName: "Caio Cezar das Neves Moreira",
      email: "caioslppuo@gmail.com",
    },
    {
      id: 2,
      userName: "Lucas Garavaglia",
      email: "lucasgrafimar@gmail.com",
    },
    {
      id: 3,
      userName: "Leví Cícero Arcanjo",
      email: "arcanjolevi@gmail.com",
    },
    {
      id: 4,
      userName: "Guilherme Bachega Gomes",
      email: "guizobachegagomes@gmail.com",
    },
    {
      id: 5,
      userName: "Milena Santos",
      email: "mii.santos342@gmail.com",
    },
    {
      id: 6,
      userName: "Eduardo da Silva",
      email: "eduardodasilva@gmail.com",
    },
    {
      id: 7,
      userName: "José Alves",
      email: "josealves@gmail.com",
    },
    {
      id: 8,
      userName: "Mariana Pereira",
      email: "marianapereira@gmail.com",
    },
    {
      id: 9,
      userName: "Larissa Lewartoski Wong",
      email: "larilw@gmail.com",
    },
    {
      id: 10,
      userName: "Pedro José",
      email: "pedrojose@gmail.com",
    },
  ]);
}
