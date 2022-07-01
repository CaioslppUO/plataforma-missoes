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
      firebaseId: "1212kjasnfajkslnfaslkjfkljas",
    },
    {
      id: 2,
      userName: "Lucas Garavaglia",
      email: "lucasgrafimar@gmail.com",
      firebaseId: "asdglkjnaslkgfna1212s",
    },
    {
      id: 3,
      userName: "Leví Cícero Arcanjo",
      email: "arcanjolevi@gmail.com",
      firebaseId: "129812981298asif@@",
    },
    {
      id: 4,
      userName: "Guilherme Bachega Gomes",
      email: "guizobachegagomes@gmail.com",
      firebaseId: "asgaskln@)!__@ASLKJN",
    },
    {
      id: 5,
      userName: "Milena Santos",
      email: "mii.santos342@gmail.com",
      firebaseId: "asflkasnflk12@@!LNKLK",
    },
    {
      id: 6,
      userName: "Eduardo da Silva",
      email: "eduardodasilva@gmail.com",
      firebaseId: "aslfknaslkfnakjbn@:KLJBJKABsgfkas",
    },
    {
      id: 7,
      userName: "José Alves",
      email: "josealves@gmail.com",
      firebaseId: "askfjabsfjkabsS@Q",
    },
    {
      id: 8,
      userName: "Mariana Pereira",
      email: "marianapereira@gmail.com",
      firebaseId: "sakjfbnas;kln:K@JB:KJ",
    },
    {
      id: 9,
      userName: "Larissa Lewartoski Wong",
      email: "larilw@gmail.com",
      firebaseId: "AKSJBgakjsbg312k;ajsnf",
    },
    {
      id: 10,
      userName: "Pedro José",
      email: "pedrojose@gmail.com",
      firebaseId: "askjfbk129iSAFISB",
    },
  ]);
}
