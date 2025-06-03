import { Recipe } from "./Recipe";

export interface User {
  _id: string;
  username: string;
  email: string;
  recipes?: Recipe[];
}